import { render } from '@testing-library/react';

import {SpinnerScreen} from './spinnerScreen';

describe('SpinnerScreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SpinnerScreen />);
    expect(baseElement).toBeTruthy();
  });
});
