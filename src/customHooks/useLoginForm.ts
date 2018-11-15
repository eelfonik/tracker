import { useEffect } from 'react';
import { LoginActionProps } from '../store/types'
import { useFormField } from './useFormField'
import isEmail from '../helpers/isEmail'

export function useLoginForm(resetNotif: LoginActionProps['resetNotif']) {
  const [name, changeName] = useFormField('')
  const [email, changeMail, emailValid] = useFormField('', isEmail)
  const [pass, changePass] = useFormField('')

  useEffect(() => {
    resetNotif();
    return () => {
      resetNotif();
    }
  },[])

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