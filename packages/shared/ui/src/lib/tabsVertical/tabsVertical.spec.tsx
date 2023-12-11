import { render } from '@testing-library/react';

import {TabsVertical} from './tabsVertical';

describe('TabsVertical', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TabsVertical
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
