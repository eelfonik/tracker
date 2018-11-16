import { useEffect, useState } from 'react';
import { useFormField } from './useFormField'
import { UserInfo } from '../store/types'

export function useUserInfoForm(userInfo: UserInfo) {
  const [nameField, changeName, nameValid] = useFormField(userInfo.name)
  const [addressField, changeAddress, addressValid] = useFormField(userInfo.address)
  const [siretField, changeSiret, siretValid] = useFormField(userInfo.siret)
  const [phoneField, changePhone, phoneValid] = useFormField(userInfo.phone)
  const formValid = nameValid && addressValid && siretValid && phoneValid

  const [showSubmitError, setVisibility] = useState(!formValid)

  useEffect(() => {
    setVisibility(!formValid)
  }, [])

  return {
    showSubmitError,
    nameField,
    addressField,
    siretField,
    phoneField,
    changeName,
    changeAddress,
    changeSiret,
    changePhone,
    formValid
  }
}