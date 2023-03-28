import { assign, createMachine } from 'xstate'

export interface FormData {
  name: string
  age: number
}

export interface Context {
  formData: FormData
}

export type FormEvent =
  | { type: 'NAME_CHANGED'; value: string }
  | { type: 'AGE_CHANGED'; value: number }
  | { type: 'SUBMIT_FORM' }
  | { type: 'NEXT' }
  | { type: 'BACK' }

export const formMachine = createMachine<Context, FormEvent>(
  {
    id: 'stepForm',
    initial: 'idle',
    context: {
      formData: {
        name: '',
        age: 0,
      },
    },
    states: {
      name: {
        on: {
          NAME_CHANGED: {
            actions: assign({
              formData: (context, event) => ({
                ...context.formData,
                name: event.value,
              }),
            }),
          },
          NEXT: 'age',
        },
      },
      age: {
        on: {
          AGE_CHANGED: {
            actions: assign({
              formData: (context, event) => ({
                ...context.formData,
                age: event.value,
              }),
            }),
          },
          BACK: 'name',
          NEXT: 'submit',
        },
      },
      submit: {
        invoke: {
          src: 'submitForm',
          onDone: 'confirmation',
        },
      },
      confirmation: {
        type: 'final',
      },
    },
  },
  {
    services: {
      submitForm: async (context: Context) => {
        console.log(context.formData) // mock submit here
      },
    },
  },
)
