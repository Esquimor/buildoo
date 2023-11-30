"use client";

import { ContractorPayment } from '@server/contractors/contractors_payment.entity';
import DataGrid, { RenderCellProps, RenderEditCellProps, RowsChangeData } from 'react-data-grid';
import dayjs from 'dayjs';
import "./sidepanelContractorPayment.style.css"
import { ContractorPaymentStatus, ContractorPaymentStatusData } from '@shared-type';
import { Badge, Button, Label } from '@shared-ui';
import { trpc } from 'apps/web/app/trpc';
import { Menu } from './menu/menu';
import { useState } from 'react';
import { ModalAddPayment } from './modalAddPayment';

interface SidepanelContractorPayments {
  payments: ContractorPayment[]
  contractorId: string;
}

export function SidepanelContractorPayments({
  payments,
  contractorId,
}: SidepanelContractorPayments) {

  const deletePayment = trpc.contractor.deletePayment.useMutation();

  const handleDeletePayment = (id: string) => {
    deletePayment.mutate({id})
  }

  const updatePayment =  trpc.contractor.editPayment.useMutation();

  const onRowsChange = (rows: ContractorPayment[], data: RowsChangeData<ContractorPayment>) => {
    const findRowChanged = rows[data.indexes[0]];

    if (!findRowChanged) return;

    updatePayment.mutate(findRowChanged);
  }

  const columns = [ 
    { 
      key: 'date_payment',
      name: 'Date de Paiement',
      renderCell(props: RenderCellProps<ContractorPayment>) {
        const value = props.row.date_payment;
        const valueFormatted = dayjs(value).format("DD/MM/YYYY")
        return (
          <div>
            {valueFormatted}
          </div>
        );
      },
      renderEditCell({ row, onRowChange }: RenderEditCellProps<ContractorPayment>) {
        return (
          <input type="date" value={row.date_payment} className="text-sm w-full" 
          onChange={(e) => onRowChange({ ...row, date_payment: e.target.value })}
          />
        );
      },
    },
    {
      key: 'amount_ht',
      name: 'Somme HT',
      renderCell({ row }: RenderCellProps<ContractorPayment>) {
        return row.amount_ht?.toLocaleString()
      },
      renderEditCell({ row, onRowChange}: RenderEditCellProps<ContractorPayment>) {
        return (
          <input
            type="number"
            value={row.amount_ht}
            className="text-sm w-full"
            onChange={(e) => onRowChange({ ...row, amount_ht: e.target.valueAsNumber })}
          />
        )
      }
    },
    {
      key: 'amount_ttc',
      name: 'Somme TTC',
      renderCell({ row }: RenderCellProps<ContractorPayment>) {
        return row.amount_ttc?.toLocaleString()
      },
      renderEditCell({ row, onRowChange}: RenderEditCellProps<ContractorPayment>) {
        return (
          <input
            type="number"
            value={row.amount_ttc}
            className="text-sm w-full"
            onChange={(e) => onRowChange({ ...row, amount_ttc: e.target.valueAsNumber })}
          />
        )
      }
    },
    {
      key: 'status',
      name: 'Status',
      renderCell(props: RenderCellProps<ContractorPayment>) {
        return (
          <Badge
            label={props.row.status}
            color={ContractorPaymentStatusData[props.row.status].color}
            className="w-full cursor-pointer"
            size="lg"
          />
        )
      },
      renderEditCell({ row, onRowChange}: RenderEditCellProps<ContractorPayment>) {
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
      renderCell({ row }: RenderCellProps<ContractorPayment>) {
        return (
          <Menu
            onDelete={() => handleDeletePayment(row.id)}
          />
        )
      }
    }
  ];

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
        rows={payments}
        style={{
          maxHeight: "100%"
        }}
        rowHeight={40}
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