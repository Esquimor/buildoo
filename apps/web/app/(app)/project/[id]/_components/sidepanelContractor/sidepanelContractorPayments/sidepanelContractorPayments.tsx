"use client";

import { ContractorPayment } from '@server/contractors/contractors_payment.entity';
import DataGrid, { Column, RenderCellProps, RenderEditCellProps, RowsChangeData } from 'react-data-grid';
import dayjs from 'dayjs';
import "./sidepanelContractorPayment.style.css"
import { ContractorPaymentStatus, ContractorPaymentStatusData } from '@shared-type';
import { Accordion, Badge, Button, Label } from '@shared-ui';
import { trpc } from 'apps/web/app/trpc';
import { Menu } from './menu/menu';
import { useMemo, useState } from 'react';
import { ModalAddPayment } from './modalAddPayment';
import { CellExpanderFormatter } from 'apps/web/app/_components/datagrid/cellExpanderFormatter';
import { ContractorPaymentCondition } from '@server/contractors/contractors_payment_condition.entity';
import { AccordionConditions } from './accordionConditions';

interface Master extends ContractorPayment {
  type: "MASTER";
  expanded: boolean;
}

interface Detail {
  type: "DETAIL";
  id: string;
  parentId: string;
  conditions: ContractorPaymentCondition[];
}

type ContractorPaymentRow =
  | Master
  | Detail;

interface SidepanelContractorPayments {
  payments: ContractorPayment[]
  contractorId: string;
}

export function SidepanelContractorPayments({
  payments,
  contractorId,
}: SidepanelContractorPayments) {
  
  const [rows, setRows] = useState([...payments].map(payment => ({
    ...payment,
    type: "MASTER",
    expanded: false
  })) as unknown as ContractorPaymentRow[]);

  const deletePayment = trpc.contractor.deletePayment.useMutation();

  const handleDeletePayment = (id: string) => {
    deletePayment.mutate({id})
  }

  const updatePayment =  trpc.contractor.editPayment.useMutation();

  const onRowsChange = (rows: ContractorPaymentRow[], { indexes, column }: RowsChangeData<ContractorPaymentRow>) => {
    const findRowChanged = rows[indexes[0]];

    if (!findRowChanged) return;
    
    if (findRowChanged.type === 'MASTER') {
      if (column.key === "expanded") {
        if (findRowChanged.expanded) {
          rows.splice(indexes[0] + 1, 0, {
            type: 'DETAIL',
            id: `${findRowChanged.id}-conditions`,
            parentId: findRowChanged.id,
            conditions: findRowChanged.contractorPaymentConditions,
          });
        } else {
          rows.splice(indexes[0] + 1, 1);
        }
        setRows(rows);
      } else {
        updatePayment.mutate(findRowChanged);
      }
    }
  }

  const updateCondition =  trpc.contractor.editCondition.useMutation();

  const handleConditionChange = (
    values: {
      condition?: string;
      completed?: boolean;
    },
    idCondtion: string | number
  ) => {
    updateCondition.mutate({id: `${idCondtion}`, ...values})
  }

  const columns = useMemo((): readonly Column<ContractorPaymentRow>[] => [
    {
      key: 'expanded',
      name: '',
      minWidth: 30,
      width: 30,
      colSpan(args) {
        // 6 =>number of columns
        return args.type === 'ROW' && args.row.type === 'DETAIL' ? 6 : undefined;
      },
      renderCell({ row, tabIndex, onRowChange }) {
        if (row.type === 'DETAIL') {
          return (
            <div
              className="h-full w-full p-2"
            >
              <AccordionConditions
                items={row.conditions.map(condition => ({
                  id: condition.id,
                  title: condition.condition.slice(0, 20),
                  children: condition.condition,
                  checked: condition.completed
                }))}
                className="rounded-xl bg-white h-min"
                onChange={handleConditionChange}
              />
            </div>
          );
        }

        return (
          <CellExpanderFormatter
            expanded={row.expanded}
            tabIndex={tabIndex}
            onCellExpand={() => {
              onRowChange({ ...row, expanded: !row.expanded });
            }}
          />
        );
      }
    },
    { 
      key: 'date_payment',
      name: 'Date de Paiement',
      renderCell(props: RenderCellProps<ContractorPaymentRow>) {
        if (props.row.type === "DETAIL") return null;

        const value = props.row.date_payment;
        const valueFormatted = dayjs(value).format("DD/MM/YYYY")
        return (
          <div>
            {valueFormatted}
          </div>
        );
      },
      renderEditCell({ row, onRowChange }: RenderEditCellProps<ContractorPaymentRow>) {
        if (row.type === "DETAIL") return null;
        return (
          <input
            type="date"
            value={row.date_payment}
            className="text-sm w-full h-full px-2" 
            onChange={(e) => onRowChange({ ...row, date_payment: e.target.value })}
          />
        );
      },
    },
    {
      key: 'amount_ht',
      name: 'Somme HT',
      renderCell({ row }: RenderCellProps<ContractorPaymentRow>) {
        if (row.type === "DETAIL") return null;

        return row.amount_ht?.toLocaleString()
      },
      renderEditCell({ row, onRowChange}: RenderEditCellProps<ContractorPaymentRow>) {
        if (row.type === "DETAIL") return null;
        return (
          <input
            type="number"
            value={row.amount_ht}
            className="text-sm w-full h-full px-2"
            onChange={(e) => onRowChange({ ...row, amount_ht: e.target.valueAsNumber })}
          />
        )
      }
    },
    {
      key: 'amount_ttc',
      name: 'Somme TTC',
      renderCell({ row }: RenderCellProps<ContractorPaymentRow>) {
        if (row.type === "DETAIL") return null;
        return row.amount_ttc?.toLocaleString()
      },
      renderEditCell({ row, onRowChange}: RenderEditCellProps<ContractorPaymentRow>) {
        if (row.type === "DETAIL") return null;
        return (
          <input
            type="number"
            value={row.amount_ttc}
            className="text-sm w-full h-full px-2"
            onChange={(e) => onRowChange({ ...row, amount_ttc: e.target.valueAsNumber })}
          />
        )
      }
    },
    {
      key: 'status',
      name: 'Status',
      renderCell(props: RenderCellProps<ContractorPaymentRow>) {
        if (props.row.type === "DETAIL") return null;
        return (
          <Badge
            label={props.row.status}
            color={ContractorPaymentStatusData[props.row.status].color}
            className="w-full cursor-pointer"
            size="lg"
          />
        )
      },
      renderEditCell({ row, onRowChange}: RenderEditCellProps<ContractorPaymentRow>) {
        if (row.type === "DETAIL") return null;
        return (
          <div
            className="bg-white w-64 border border-gray-200 fixed z-40 flex flex-col p-2"
          >
            {Object.entries(ContractorPaymentStatusData).map(([key, { color }]) => (
              <Badge
                key={key}
                label={key}
                color={color}
                className="w-full mb-2 last:mb-0 cursor-pointer"
                size="lg"
                onClick={() => {
                  onRowChange({ ...row, status: key as ContractorPaymentStatus }, true)
                }}
              />
            ))}
          </div>
        )
      }
    },
    {
      key: "menu",
      name: "",
      width: 50,
      renderCell({ row }: RenderCellProps<ContractorPaymentRow>) {
        if (row.type === "DETAIL") return null;
        return (
          <Menu
            onDelete={() => handleDeletePayment(row.id)}
          />
        )
      }
    }
  ], []);

  const [openAddPayment, setOpenAddPayment] = useState(false);

  return (
    <div
      className="flex flex-col"
    >
      <div
        className="flex justify-between items-center mb-4"
      >
        <Label
          label={`Payment (${payments.length})`}
          size="text-lg"
          weight="font-bold"
        />
        <Button
          label="Create"
          onClick={() => setOpenAddPayment(true)}
        />
      </div>
      <DataGrid
        columns={columns}
        rows={rows}
        // @ts-ignore: rendering error if a number is put
        rowHeight={(row) => (row.type === 'DETAIL' ? undefined : 40)}
        style={{
          maxHeight: "100%"
        }}
        onRowsChange={onRowsChange}
      />
      <ModalAddPayment
        open={openAddPayment}
        onClose={() => setOpenAddPayment(false)}
        contractorId={contractorId}
      />
    </div>
  )
}