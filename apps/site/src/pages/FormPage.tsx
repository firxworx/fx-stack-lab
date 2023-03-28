import clsx from 'clsx'
import { useState } from 'react'
import { Route, Routes, useNavigate, Link, useParams, Navigate, useLocation } from 'react-router-dom'

export interface FormStep {
  title: string
  slug: string
}

export interface MultiFormProps {
  steps: FormStep[]
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function getNewIndex(currentIndex: number, length: number, n: number): number {
  const newIndex = currentIndex + (((n % length) + length) % length)

  if (newIndex < 0) {
    return length - 1
  }

  if (newIndex >= length) {
    return 0
  }

  return newIndex
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      type="button"
      className={clsx(
        'px-8 py-3 rounded-md transition-colors',
        'bg-sky-700/80 hover:bg-sky-700 text-white font-medium',
        'disabled:bg-slate-500/50 disabled:text-white/80',
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function MultiForm({ steps }: MultiFormProps): JSX.Element | null {
  // const [stepIndex, setStepIndex] = useState<number>(0)
  const navigate = useNavigate()
  const location = useLocation()

  const { step } = useParams()

  const result = steps.findIndex((s) => s.slug === step)
  const stepIndex = result === -1 ? 0 : result
  const currentStep = steps.length ? steps[stepIndex] : undefined

  if (!currentStep) {
    return null
  }

  if (!step) {
    return <Navigate to={currentStep.slug} state={{ from: location }} replace />
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-4 bg-slate-200 rounded-md">
        <h3 className="text-lg">{currentStep.title}</h3>
        <div className="flex justify-center items-center mt-2 h-12 w-full bg-slate-100 rounded-md">
          {currentStep.title}
        </div>
      </div>
      <div className="flex justify-between p-4 mt-4 bg-slate-200 rounded-md">
        <Button
          disabled={stepIndex === 0}
          onClick={(): void => {
            const backIndex = (stepIndex - 1 + steps.length) % steps.length
            navigate(`/form/${steps[backIndex]?.slug}`)
          }}
        >
          Back
        </Button>
        <Button
          onClick={(): void => {
            const nextIndex = (stepIndex + 1) % steps.length
            navigate(`/form/${steps[nextIndex]?.slug}`)
          }}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

const STEPS: FormStep[] = [
  {
    title: 'Step 1',
    slug: 'step1',
  },
  {
    title: 'Step 2',
    slug: 'step2',
  },
  {
    title: 'Step 3',
    slug: 'step3',
  },
]

export function FormPage(): JSX.Element {
  return (
    <>
      <h1 className="text-3xl mb-6">Form</h1>
      <div>
        This is the Form page. <Link to="/">Go to Home Page.</Link>
      </div>
      <div>
        <MultiForm steps={STEPS} />
      </div>
    </>
  )
}
