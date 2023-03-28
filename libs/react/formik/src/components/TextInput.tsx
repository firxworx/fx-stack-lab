import React, { useEffect, useId } from 'react'
import { useField, useFormikContext } from 'formik'
import clsx from 'clsx'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
}

/**
 * TextInput component for use with formik that renders with a label. Defaults to type 'text'.
 */
export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ name, label, type, className, ...props }, ref) => {
    const ssrId = useId()
    const formik = useFormikContext()

    const id = props.id ?? ssrId

    // field: checked, multiple, name, onblur, onchanged, value
    // helpers: setError, setTouched, setValue
    const [field, meta, helpers] = useField<string>(name)

    const { value } = field
    const { setValue } = helpers

    // set initial value on first render if none is defined via initialValues to support dynamic forms
    useEffect(() => {
      if (value === undefined) {
        setValue('', false)
      }
    }, [value, setValue])

    // re-render if the fields do not have an initial value (@see above useEffect)
    if (value === undefined) {
      console.warn(`Input '${name}' missing initialValues`)
      return null
    }

    return (
      <div
        className={clsx(className, {
          'animate-pulse': formik.isValidating || formik.isSubmitting,
        })}
      >
        <label htmlFor={id} className={'block text-sm font-medium text-gray-700'}>
          {label}
        </label>
        <div className="mt-1">
          <input
            ref={ref}
            id={id}
            type={type ?? 'text'}
            {...props}
            {...field}
            disabled={formik.isSubmitting}
            className={clsx(
              'block w-full placeholder-gray-400 border-gray-300',
              'rounded-md shadow-sm appearance-none sm:text-sm',
              'focus:outline-none focus:ring-secondary focus:border-secondary disabled:opacity-50',
            )}
          />
        </div>
        {meta.error && meta.touched && <div className="mt-1 text-red-700 sm:text-sm">{meta.error}</div>}
      </div>
    )
  },
)
