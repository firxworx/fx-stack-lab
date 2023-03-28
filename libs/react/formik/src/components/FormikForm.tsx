import { Formik, Form, type FormikConfig, type FormikValues, type FormikProps } from 'formik'

interface FormikFormProps<T extends FormikValues> extends Omit<FormikConfig<T>, 'children'> {
  children: React.ReactNode
  // formProps:
  // FormComponent?: React.ComponentType<FormikProps<T>> | React.ReactNode
}

function FormikForm<T extends FormikValues>({ children, ...formikProps }: FormikFormProps<T>): JSX.Element {
  return (
    <Formik {...(formikProps as FormikConfig<T>)}>
      {(props: FormikProps<T>): JSX.Element => (
        <Form noValidate autoComplete="off" {...props}>
          {children}
        </Form>
      )}
    </Formik>
  )
}

export default FormikForm
