import { render } from '@testing-library/react';

import {Tabs} from './tabs';

describe('Tabs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Tabs
        tabs={[]}
        currentTab={0}
        onClickTab={function (idClickedTab: string | number): void {
            throw new Error('Function not implemented.');
          }
        }
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
