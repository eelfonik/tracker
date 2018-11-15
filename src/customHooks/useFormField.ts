import { useState } from "react";

export function useFormField(
  intialValue: string = '',
  validationFunc?: (val: string) => boolean,
  transformFunc?: (val: string) => string
) : [string, (e: React.FormEvent<HTMLInputElement>) => void, boolean] {
  const [field, setField] = useState(intialValue);
  const [validate, setValidation] = useState(true);
  function changeField(e: React.FormEvent<HTMLInputElement>): void {
    const val = e.currentTarget.value
    setField(transformFunc ? transformFunc(val) : val);
    setValidation(
      validationFunc ? validationFunc(val) : validate
    );
  }
  return [field, changeField, validate];
}
