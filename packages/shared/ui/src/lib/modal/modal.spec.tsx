import { render } from '@testing-library/react';

import {Modal} from './modal';

describe('Modal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Modal 
        open={true} 
        onClickOutside={() => {}}      
    >
      <div>Modal</div>
    </Modal>);
    expect(baseElement).toBeTruthy();
  });
});
