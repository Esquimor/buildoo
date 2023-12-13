import { TabVertical } from "../tabVertical/tabVertical";

export interface TabsVerticalProps {
  tabs: {
    id: string | number;
    label: string;
  }[];
  currentTab: number;
  onClickTab: (idClickedTab: number) => void;
  className?: string;
}

export function TabsVertical({
  tabs,
  currentTab,
  onClickTab,
  className: classNameProps = "",
}: TabsVerticalProps) {

  const className = `${classNameProps} flex-column space-y space-y-4 text-sm font-medium text-gray-900 dark:text-gray-400 md:me-4 mb-4 md:mb-0`

  return (
    <ul
      className={className}
    >
      {tabs.map((tab,index) => (
        <TabVertical
          selected={index === currentTab}
          label={tab.label}
          onClick={() => onClickTab(index)}
        />
      ))}
    </ul>
  )
}