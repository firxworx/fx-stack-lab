import { useMachine } from '@xstate/react'
import { formMachine } from '../machines/stepFormMachine'
import { Formik, Form } from 'formik'
import { TextInput } from '@firx/react-formik'

export interface StateMachineFormProps {}

export function StateMachineForm(props: StateMachineFormProps): JSX.Element {
  const [current, send] = useMachine(formMachine)

  const handleNameChange = (value: string) => {
    send({ type: 'NAME_CHANGED', value })
  }

  const handleAgeChange = (value: number) => {
    send({ type: 'AGE_CHANGED', value })
  }

  const handleSubmit = () => {
    send({ type: 'SUBMIT_FORM' })
  }

  const isNameStep = current.matches('name')
  const isAgeStep = current.matches('age')
  const isConfirmationStep = current.matches('confirmation')

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      // validate={(values) => {
      //   try {
      //     schema.validateSync(values)
      //   } catch (error) {
      //     return error.formErrors.fieldErrors
      //   }
      // }}
    >
      <Form>
        {isNameStep && <TextInput label="Name" value={current.context.formData.name} onChange={handleNameChange} />}
        {isAgeStep && (
          <TextInput label="Age" type="number" value={current.context.formData.age} onChange={handleAgeChange} />
        )}
        {isConfirmationStep && <p>Thank you for submitting the form!</p>}
        {isAgeStep && (
          <button type="button" onClick={(): void => send('PREVIOUS')}>
            Previous
          </button>
        )}
        {!isConfirmationStep && <button type="submit">Next</button>}
      </Form>
    </Formik>
  )
}
