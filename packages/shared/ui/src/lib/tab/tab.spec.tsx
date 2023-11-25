import { render } from '@testing-library/react';

import {Tab} from './tab';

describe('Tab', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Tab label="Tab"/>);
    expect(baseElement).toBeTruthy();
  });
});
