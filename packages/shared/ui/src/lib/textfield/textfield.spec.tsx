import { render } from '@testing-library/react';

import { Textfield } from './Textfield';

describe('Textfield }', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Textfield />);
    expect(baseElement).toBeTruthy();
  });
});
