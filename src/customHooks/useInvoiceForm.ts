import { useEffect, useState, useCallback } from 'react';
import { useFormField } from './useFormField'
import {isNumber} from '../helpers/isNumber'

const numericCheck = (val: string): boolean => isNumber(val) || val === ''
const rangedNumericCheck = (val: string): boolean => (isNumber(val) && parseFloat(val) >= 0 && parseFloat(val) <= 100) || val === ''

export function useInvoiceForm() {
  // focused: false,
  // userIsTyping: false
  const [number, changeNumber, invoiceNumValid] = useFormField('', numericCheck)
  const [date, changeDate, dateValid] = useFormField('')
  const [sum, changeSum, sumValid] = useFormField('', numericCheck)
  const [currency, changeCurrency] = useFormField('')
  const [taxRate, changeTaxRate, taxRateValid] = useFormField('', rangedNumericCheck)
  const [clientName, changeClientName, clientValid] = useFormField('')
  const [clientAddress, changeClientAddress] = useFormField('')
  const [clientSiret, changeClientSiret] = useFormField('')
  const [description, changeDescription] = useFormField('')

  const formValid = invoiceNumValid && dateValid && sumValid && taxRateValid && clientValid

  const [showSubmitError, setVisibility] = useState(!formValid)

  // TODO: dumb functions here, replace them with useReducer later
  function resetAll() {
    changeNumber('')
    changeDate('')
    changeSum('')
    changeCurrency('')
    changeTaxRate('')
    changeClientName('')
    changeClientAddress('')
    changeClientSiret('')
    changeDescription('')
  }

  const resetStates = useCallback(resetAll,[])

  useEffect(() => {
    setVisibility(!formValid)
  }, [])

  return {
    number,
    date,
    sum,
    currency,
    taxRate,
    clientName,
    clientAddress,
    clientSiret,
    description,
    showSubmitError,
    changeNumber,
    changeDate,
    changeSum,
    changeCurrency,
    changeTaxRate,
    changeClientName,
    changeClientAddress,
    changeClientSiret,
    changeDescription,
    formValid,
    invoiceNumValid,
    sumValid,
    resetStates
  }
}