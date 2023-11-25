import { render } from '@testing-library/react';

import { Selectfield } from './selectfield';

describe('Selectfield', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Selectfield
      selectProps={{
        values: [],
        onChange:() => {}
      }}
      />);
    expect(baseElement).toBeTruthy();
  });
});
