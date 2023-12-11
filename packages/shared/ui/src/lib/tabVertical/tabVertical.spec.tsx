import { render } from '@testing-library/react';

import {TabVertical} from './tabVertical';

describe('TabVertical', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TabVertical label="TabVertical"/>);
    expect(baseElement).toBeTruthy();
  });
});
