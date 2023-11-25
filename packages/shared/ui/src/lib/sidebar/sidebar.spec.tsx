import { render } from '@testing-library/react';

import {Sidebar} from './sidebar';

describe('Sidebar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Sidebar 
        open={true} 
        onClickOutside={() => {}}      
    >
      <div>Sidebar</div>
    </Sidebar>);
    expect(baseElement).toBeTruthy();
  });
});
