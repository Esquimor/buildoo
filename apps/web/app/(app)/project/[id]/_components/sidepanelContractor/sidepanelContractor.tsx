import { Sidebar } from "@shared-ui";

interface SidepanelAddContractorProps {
  open: boolean;
  onClose: () => void;
  contractorId: string;
}

export function SidepanelAddContractor({
  open,
  onClose,
  contractorId
}: SidepanelAddContractorProps) {

  return (
    <Sidebar
      open={open}
      onClickOutside={onClose}
      width="1200px"
    >
      {contractorId}
    </Sidebar>
  )
}