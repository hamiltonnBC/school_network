import { Field } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Input, type InputProps } from '../atoms/Input'
import { Text } from '../atoms/Text'

export interface FormFieldProps extends Omit<InputProps, 'id'> {
  label: string
  helperText?: string
  errorText?: string
  required?: boolean
  children?: ReactNode
  id?: string
}

export function FormField({
  label,
  helperText,
  errorText,
  required = false,
  children,
  id,
  ...inputProps
}: FormFieldProps) {
  const isInvalid = Boolean(errorText)

  return (
    <Field.Root invalid={isInvalid} required={required}>
      <Field.Label htmlFor={id}>
        {label}
        {required && <Field.RequiredIndicator />}
      </Field.Label>
      
      {children || <Input id={id} {...inputProps} />}
      
      {helperText && !errorText && (
        <Field.HelperText>
          <Text textStyle="sm" color="fg.muted">
            {helperText}
          </Text>
        </Field.HelperText>
      )}
      
      {errorText && (
        <Field.ErrorText>
          <Text textStyle="sm" color="red.500">
            {errorText}
          </Text>
        </Field.ErrorText>
      )}
    </Field.Root>
  )
}