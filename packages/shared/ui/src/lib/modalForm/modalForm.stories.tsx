import type { Meta } from '@storybook/react';
import { ModalForm } from './modalForm';

const meta: Meta<typeof ModalForm> = {
  component: ModalForm,
  title: 'modalForm',
};
export default meta;

export const Default = {
  args: {
    children: <div>ModalForm</div>,
    open: true,
    onClickOutside: () => console.log("outside")
  },
};
