import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

type InputPropsInterface = InputHTMLAttributes<HTMLInputElement>
type TextAreaPropsInterface = TextareaHTMLAttributes<HTMLInputElement>

export function Input({...props}: InputPropsInterface) {
  return (
    <input {...props} />
  );
}

export function TextArea({...props}: TextAreaPropsInterface) {
  return (
    <TextArea {...props} />
  );
}