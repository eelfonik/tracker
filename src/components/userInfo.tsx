import * as React from "react";
import { connect } from "react-redux";
import { Action } from 'redux'
import { ThunkDispatch } from "redux-thunk";
import { InputBlock, FormError } from '../commonStyles/form'
import { updateUserInfo, getUserInfo } from "../store/actions";
import { UserInfo, AppState, UserActionProps } from '../store/types'
import { useUserInfoForm } from '../customHooks/useUserInfoForm'

function UserProfile(props: UserInfo & UserActionProps) {
  const {onUpdateClick, name, address, siret, phone} = props
  const {
    nameField,
    addressField,
    siretField,
    phoneField,
    changeName,
    changeAddress,
    changeSiret,
    changePhone,
    formValid,
    showSubmitError,
  } = useUserInfoForm({name, address, siret, phone})

  const submitForm = () => {
    if (formValid) {
      onUpdateClick({
        name: nameField,
        address: addressField,
        siret: siretField,
        phone: phoneField
      });
      //this.resetStates();
    }
  }

  return (
    <div>
      <InputBlock>
        <input
          type="text"
          value={name}
          placeholder="your name"
          onChange={changeName}
        />
      </InputBlock>
      <InputBlock>
        <input
          type="text"
          value={addressField}
          placeholder="your address"
          onChange={changeAddress}
        />
      </InputBlock>
      <InputBlock>
        <input
          type="text"
          value={siretField}
          placeholder="your siret"
          onChange={changeSiret}
        />
      </InputBlock>
      <InputBlock>
        <input
          type="text"
          value={phoneField}
          placeholder="your phone number"
          onChange={changePhone}
        />
      </InputBlock>
      <button onClick={submitForm}>submit</button>
      {showSubmitError && 
        <FormError>
          Please fill all required fields :-)
        </FormError>
      }
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  ...state.userInfo
})

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, Action>) => ({
  getInfo:() => dispatch(getUserInfo()),
  onUpdateClick: (value: UserInfo) => dispatch(updateUserInfo(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
