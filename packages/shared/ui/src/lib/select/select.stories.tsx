import type { Meta } from '@storybook/react';
import { Select } from './select';

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'Select',
};
export default meta;

export const Default = {
  args: {
    values: [
      {
        id: "1",
        label: "Foo",
      },
      {
        id: "2",
        label: "Bar"
      }
    ],
    value: "1",
    onchange: () => { console.log("Change") }
  },
};
