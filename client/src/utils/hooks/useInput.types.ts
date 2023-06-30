import { ChangeEvent } from 'react'
import { ValidationRecord } from '@sovok/client/types/validation.types'

export interface ModelControl<
  DataType extends any,
  InputType = HTMLInputElement,
> {
  defaultValue?: DataType | undefined
  onChange?: (newValue: ChangeEvent<InputType>) => unknown
  value?: DataType
  validation?: ValidationRecord
}

export interface WithClassName {
  className?: string
}

export interface UseInput {
  bind: {
    onChange: (e: ChangeEvent<HTMLInputElement>) => any
    value: string
    validation: ValidationRecord
  }
  setValue: (newValue: string) => unknown
  reset: () => void
  value: string
  validation: ValidationRecord
}

export interface UseInputProps {
  defaultValue?: string
  //validator?: ZodSchema // ZOD
}
