import { Label, Sidebar, Tabs } from "@shared-ui";
import useParamsQuery from "../../../../_hooks/useParamsQuery";
import { Contractor } from "@server/contractors/contractors.entity";
import { SidepanelContractorPayments } from "./sidepanelContractorPayments";
import { SidepanelContractorGeneral } from "./sidepanelContractorGeneral";

interface SidepanelContractorProps {
  open: boolean;
  onClose: () => void;
  contractor: Contractor;
}

export function SidepanelContractor({
  open,
  onClose,
  contractor
}: SidepanelContractorProps) {

  const {
    setParamsQuery,
    getParamByName
  } = useParamsQuery();

  const handleChangeTab = (indexTab: number) => {
    setParamsQuery("tabContractor", `${indexTab}`)
  }

  const tabs = [
    {
      id: "general",
      name: "Général",
      component: (
        <SidepanelContractorGeneral
          contractor={contractor}
        />
      )
    },
    {
      id: "payment",
      name: "Payment",
      component: <SidepanelContractorPayments
          payments={contractor.contractorPayments}
          contractorId={contractor.id}
        />
    }
  ]

  const tab = +getParamByName("tabContractor") || 0;

  return (
    <Sidebar
      open={open}
      onClickOutside={onClose}
      width="1200px"
    >
      <div> 
        <header
          className="bg-blue-800 text-white p-4"
        >
          <Label label={contractor.name} size="text-2xl" color="text-white" />
        </header>
        <main
          className="p-4"
        >
          <Tabs
            tabs={tabs.map((tab, index) => ({label: tab.name, id: index}))}
            currentTab={tab}
            onClickTab={(idCurrentTab) => {
              handleChangeTab(+idCurrentTab)
            }}            
          />
          <div
            className="my-4 w-full"
          >
            {tabs[tab].component}
          </div>
        </main>
      </div>
    </Sidebar>
  )
}