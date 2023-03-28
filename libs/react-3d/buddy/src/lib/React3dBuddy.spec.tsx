import { render } from '@testing-library/react'

import React3dBuddy from './React3dBuddy'

describe('React3dBuddy', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<React3dBuddy />)
    expect(baseElement).toBeTruthy()
  })
})
