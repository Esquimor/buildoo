import { render } from '@testing-library/react';

import { Stepper } from './stepper';

describe('Stepper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Stepper values={[]} value={0} onChange={() => {}}/>);
    expect(baseElement).toBeTruthy();
  });
});
