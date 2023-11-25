import { Tab } from "../tab/tab";

export interface TabsProps {
  tabs: {
    id: string | number;
    label: string;
  }[];
  currentTab: number;
  onClickTab: (idClickedTab: string | number) => void; 
}

export function Tabs({
  tabs,
  currentTab,
  onClickTab
}: TabsProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            selected={tab.id === currentTab}
            label={tab.label}
            onClick={() => onClickTab(tab.id)}
          />
        ))}
      </ul>
  </div>
  )
}