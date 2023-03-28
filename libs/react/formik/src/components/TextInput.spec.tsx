import { render } from '@testing-library/react'

import { TextInput } from './TextInput'

describe('TextInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextInput name="testName" label="testLabel" />)
    expect(baseElement).toBeTruthy()
  })
})
