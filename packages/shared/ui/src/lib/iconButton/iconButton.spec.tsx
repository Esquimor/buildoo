import { render } from '@testing-library/react';

import { IconButton } from './iconButton';

describe('IconButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IconButton icon={<div>A</div>} />);
    expect(baseElement).toBeTruthy();
  });
});
