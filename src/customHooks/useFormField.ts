import { useState, useCallback } from "react";
import {isEmpty, is} from 'ramda'

const defaultValide = (val: string) => !isEmpty(val)

type Field = string | React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>

export function useFormField(
  intialValue: string = '',
  validationFunc: (val: string) => boolean = defaultValide,
  transformFunc?: (val: string) => string
) : [string, (e: Field) => void, boolean] {
  const [field, setField] = useState(intialValue);
  const [validate, setValidation] = useState(true);
  function changeField(e: Field): void {
    const val = is(String, e) ? e : e.currentTarget.value
    setField(transformFunc ? transformFunc(val) : val)
    setValidation(validationFunc(val))
  }
  let onChange = useCallback(changeField, [])
  return [field, onChange, validate];
}
