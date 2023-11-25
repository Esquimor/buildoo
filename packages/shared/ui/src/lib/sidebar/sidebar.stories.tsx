import type { Meta } from '@storybook/react';
import { Sidebar } from './sidebar';

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  title: 'sidebar',
};
export default meta;

export const Default = {
  args: {
    children: <div>Sidebar</div>,
    open: true,
    onClickOutside: () => console.log("outside")
  },
};
