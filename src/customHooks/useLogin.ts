import { useState, useEffect } from 'react';
import { ActionProps } from '../store/types'
import isEmail from '../helpers/isEmail'

export function useLogin(resetNotif: ActionProps['resetNotif']) {
  const [name, setName] = useState('')
  const [email, setMail] = useState('')
  const [emailValid, setValidation] = useState(true)
  const [pass, setPass] = useState('')

  function changeName(e: React.FormEvent<HTMLInputElement>): void {
    setName(e.currentTarget.value)
  }

  function changeMail(e: React.FormEvent<HTMLInputElement>): void {
    setMail(e.currentTarget.value)
    setValidation(isEmail(e.currentTarget.value))
  }

  function changePass(e: React.FormEvent<HTMLInputElement>): void {
    setPass(e.currentTarget.value)
  }

  useEffect(() => {
    resetNotif();
    return () => {
      resetNotif();
    }
  })

  return {
    name,
    email,
    emailValid,
    pass,
    changeName,
    changeMail,
    changePass
  }
}