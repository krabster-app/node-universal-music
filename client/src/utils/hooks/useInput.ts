import { ChangeEvent, useState } from 'react'
import { UseInput, UseInputProps } from '../hooks/useInput.types'
import { Validation } from '@sovok/client/types/validation.types'

const useInput = ({ defaultValue = '' }: UseInputProps = {}): UseInput => {
  const [value, setValue] = useState<string>(defaultValue)

  // const validation: ValidationRecord = useMemo(() => {
  //   if (!validator || !value.length) return { status: Validation.NotValidated }
  //   const parsed = validator?.safeParse(value)
  //   if (parsed?.success) return { status: Validation.Valid }
  //   return { status: Validation.Invalid, error: parsed.error.errors[0].message }
  // }, [value, validator])

  return {
    value,
    validation: {
      status: Validation.NotValidated,
    },
    setValue: newValue => setValue(newValue),
    reset: () => setValue(defaultValue),
    bind: {
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setValue(e.target ? e.target.value : defaultValue),
      value: value,
      validation: {
        status: Validation.NotValidated,
      },
    },
  }
}

export default useInput
