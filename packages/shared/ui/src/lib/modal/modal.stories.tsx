import type { Meta } from '@storybook/react';
import { Modal } from './modal';

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'sidebar',
};
export default meta;

export const Default = {
  args: {
    children: <div>Modal</div>,
    open: true,
    onClickOutside: () => console.log("outside")
  },
};
