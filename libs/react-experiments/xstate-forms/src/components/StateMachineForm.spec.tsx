import { render } from '@testing-library/react'

import { StateMachineForm } from './StateMachineForm'

describe('ReactExperimentsXstateForms', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StateMachineForm />)
    expect(baseElement).toBeTruthy()
  })
})
