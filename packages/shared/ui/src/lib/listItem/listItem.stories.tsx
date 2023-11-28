import type { Meta } from '@storybook/react';
import { ListItem } from './listItem';

const meta: Meta<typeof ListItem> = {
  component: ListItem,
  title: 'ListItem',
};
export default meta;

export const Default = {
  args: {
    children: "foo"
  },
};
