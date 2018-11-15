import { useEffect, useState } from 'react';
import { useFormField } from './useFormField'
import { UserInfo } from '../store/types'
import { isEmpty } from 'ramda'

export function useUserInfoForm(userInfo: UserInfo) {
  const [nameField, changeName, nameValid] = useFormField(userInfo.name, isEmpty)
  const [addressField, changeAddress, addressValid] = useFormField(userInfo.address, isEmpty)
  const [siretField, changeSiret, siretValid] = useFormField(userInfo.siret, isEmpty)
  const [phoneField, changePhone, phoneValid] = useFormField(userInfo.phone, isEmpty)
  const formValid = nameValid && addressValid && siretValid && phoneValid

  const [showSubmitError, setVisibility] = useState(!formValid)

  useEffect(() => {
    setVisibility(!formValid)
  }, [formValid])

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