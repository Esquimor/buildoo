import type { Meta } from '@storybook/react';
import { IconButton } from './iconButton';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: 'IconButton',
};
export default meta;

export const Default = {
  args: {
    icon: <div>A</div>
  },
};
