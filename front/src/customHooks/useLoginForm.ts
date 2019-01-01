import { useEffect } from 'react';
import { LoginActionProps } from '../store/types'
import { useFormField } from './useFormField'
import isEmail from '../helpers/isEmail'

export function useLoginForm(resetNotif: LoginActionProps['resetNotif']) {
  const [name, changeName, nameValid] = useFormField('')
  const [email, changeMail, emailValid] = useFormField('', isEmail)
  const [pass, changePass, passValid] = useFormField('')

  const loginValid = emailValid && passValid
  const signUpValid = loginValid && nameValid

  useEffect(() => {
    resetNotif();
    return () => {
      resetNotif();
    }
  },[])

  return {
    name,
    email,
    pass,
    changeName,
    changeMail,
    changePass,
    loginValid,
    signUpValid,
  }
}