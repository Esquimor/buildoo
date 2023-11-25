import type { Meta } from '@storybook/react';
import { Card } from './card';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'card',
};
export default meta;

export const Default = {
  args: {
    children: <div>Card</div>
  },
};
