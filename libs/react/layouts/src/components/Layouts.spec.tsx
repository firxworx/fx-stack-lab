import { render } from '@testing-library/react'

import { SimpleGridLayout } from './simple/SimpleGridLayout'

describe('ReactLayouts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SimpleGridLayout />)
    expect(baseElement).toBeTruthy()
  })
})
