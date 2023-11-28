import { render } from '@testing-library/react';

import { ListItem } from './listItem';

describe('ListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ListItem />);
    expect(baseElement).toBeTruthy();
  });
});
