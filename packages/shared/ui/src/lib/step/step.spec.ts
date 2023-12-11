import { render } from '@testing-library/react';

import { Step } from './step';

describe('Step', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Step index={1} title="Foo" selected={false} onClick={() => {}}/>);
    expect(baseElement).toBeTruthy();
  });
});
