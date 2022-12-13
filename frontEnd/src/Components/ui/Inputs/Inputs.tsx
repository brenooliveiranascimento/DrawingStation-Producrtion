import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import styles from './styles.module.scss';

type InputPropsInterface = InputHTMLAttributes<HTMLInputElement>
type TextAreaPropsInterface = TextareaHTMLAttributes<HTMLTextAreaElement>

export function Input({...props}: InputPropsInterface) {
  return (
    <input className={styles.input} {...props} />
  );
}

export function TextArea({...props}: TextAreaPropsInterface) {
  return (
    <textarea {...props} />
  );
}