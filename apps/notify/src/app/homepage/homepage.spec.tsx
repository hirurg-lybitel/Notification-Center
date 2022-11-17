import { render } from '@testing-library/react';

import HomePage from './homepage';

describe('Homepage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomePage />);
    expect(baseElement).toBeTruthy();
  });
});
