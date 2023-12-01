import type { Meta } from '@storybook/react';
import { Accordion } from './accordion';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  title: 'Accordion',
};
export default meta;

export const Default = {
  args: {
    items: [
      {
        id: "foo",
        title: "Foo",
        children: <div>FOo</div>
      },
      {
        id: "bar",
        title: "Bar",
        children: <div>Bar</div>
      }
    ]
  },
};
