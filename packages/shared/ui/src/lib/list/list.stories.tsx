import type { Meta } from '@storybook/react';
import { List } from './list';

const meta: Meta<typeof List> = {
  component: List,
  title: 'List',
};
export default meta;

export const Default = {
  args: {
    children: <li>a</li>
  },
};
