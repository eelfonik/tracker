import styled, {css} from "styled-components"

export const InputBlock = styled.div`
  display: flex;
  box-shadow: 0px 0px 2px 1px #ddd;
  padding: 10px;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 20px;
  
  @media (max-width: 600px) {
    display: block;
  }
`

const inputStyles = css`
  padding: 5px 0;
  border:none;
  border-bottom: 1px solid rgba(0, 234, 107,1);
  outline: none;
  font-size: 1.2em;
  &::placeholder {
    /*color: rgba(0, 234, 107,1);*/
  }
`

export const Input = styled.input`
  ${inputStyles}
`

export const OneLineInput = styled(Input)`
  margin:0 10px 0 0;
`

export const Textarea = styled.textarea`
  ${inputStyles}
  width: 100%;
`

export const FormError = styled.div`
  border: 1px solid red;
  color:red;
  font-size: 0.7em;
  padding:5px 0;
  margin:0 0 0 10px;
`