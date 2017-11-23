import axios from 'axios';

function mapApiMessagesToNotif(msg) {
  switch (msg) {
    case 0:
      return "Email not found";
    case 1:
      return "Invalid Password";
    case 2:
      return "Error with database";
    case 3:
      return "The famous not found";
    case 4:
      return "Email already exists!";
    case 5:
      return "Can't create user";
    case 6:
      return "Password reset expired :-(";
    case 7:
      return "Password reset failed";
    case 8:
      return "Password rest email incorrect";
    case 9:
      return "Can't reset password";
    case 10:
      return "Please enter the same password to confirm";
    case 11:
      return "Invoice with same number already exists";
    case 12:
      return "Can't create invoice";
    case 13:
      return "Can't create invoice for user";
    default:
      return "";
  }
}

const signUp = (resSuccess, resData) => ({
  type: 'SIGNUP',
  isLoggedIn: resSuccess,
  notif: resSuccess ? '' : mapApiMessagesToNotif(resData.msg),
  extras: resData
})

const logIn = (resSuccess, resData) => ({
  type: 'LOGIN',
  isLoggedIn: resSuccess,
  notif: resSuccess ? '' : mapApiMessagesToNotif(resData.msg),
  extras: resData
})

const logout = () => ({
  type: 'LOGOUT'
})

export const resetNotif = () => ({
  type: 'RESET_NOTIF'
})

export function userLogin(value) {
  return (dispatch, getState) => {
    const data = {
      email: value.email,
      password: value.pass,
    }
    axios.post('/api/account/login', data)
      .then((response) => {//use arrow function to avoid binding 'this' manually, see https://www.reddit.com/r/javascript/comments/4t6pd9/clean_way_to_setstate_within_axios_promise_in/
        return dispatch(logIn(response.data.success, response.data.extras))
      })
      .catch((error) => {
        console.log("login error!", error);
      });
  }
}

export function userSignup(value) {
  return (dispatch, getState) => {
    const data = {
      username: value.name,
      email: value.email,
      password: value.pass,
      //normally should make user confirm again, but don't bother for now
      passwordConfirm: value.pass
    }

    axios.post('/api/account/signup', data)
      .then((response) => {//use arrow function to avoid binding 'this' manually, see https://www.reddit.com/r/javascript/comments/4t6pd9/clean_way_to_setstate_within_axios_promise_in/
        //the response.data is what we defined at controllers/serverRoutes.js as callback function
        //in the case of signup,
        //if data.success === false, the data.extras will have a msg to identify the problem
        //if data.success === true, data.extras will contain a userProfileModel with email and username
        return dispatch(signUp(response.data.success, response.data.extras));
      })
      .catch((error) => {
        console.log("signup error!", error);
      });
  }
}

export function userLogOut() {
  return (dispatch, getState) => {
    axios.get('/api/account/logout', {})
      .then((response) => {
        console.debug("user logout success ", response);
        dispatch(logout());
        dispatch(removeInfo());
      })
      .catch((error) => {
        console.log("logout error!", error);
      });
  }
}

const getInfo = (resData) => ({
  type: 'GET_INFO',
  name: resData.userInfoModel.name,
  address: resData.userInfoModel.address,
  siret: resData.userInfoModel.siret,
  phone: resData.userInfoModel.phone,
  invoices: resData.invoices,
})

const updateInfo = (resData) => ({
  type: 'UPDATE_INFO',
  name: resData.name,
  address: resData.address,
  siret: resData.siret,
  phone: resData.phone
})

const removeInfo = () => ({
  type: 'REMOVE_INFO',
})

const isFetchingUser = () => ({
  type: "FETCHING_USER_INFO"
})

export function getUserInfo() {
  return (dispatch, getState) => {
    dispatch(isFetchingUser());
    const isLoggedIn = getState().login.isLoggedIn;
    if (isLoggedIn) {
      return axios.get('/api/user/info')
        .then((res) => {
          dispatch(getInfo(res.data.extras));
        })
        .catch((error) => {
          console.log("get user info error!", error);
        })
    }
  }
}

export function updateUserInfo(value) {
  return (dispatch, getState) => {
    const userInfo = {
      name: value.name,
      address: value.address,
      siret: value.siret,
      phone: value.phone
    }
    axios.post('/api/user/info', userInfo)
      .then((res) => {
        console.debug("update user info success ", res);
        dispatch(updateInfo(res.data.extras.userInfoModel))
      })
      .catch((error) => {
        console.log("update user info error!", error);
      });
  }
}

const addNewInvoice = (resData) => ({
  type: 'ADD_NEW_INVOICE',
  number: resData.number,
  date: resData.date,
  sum: resData.sum,
  taxRate: resData.taxRate,
  currency: resData.currency,
  description: resData.description,
})

export function addNewInvoiceForUser(value) {
  return (dispatch, getState) => {
    axios.post('/api/user/invoice', value)
      .then((res) => {
        console.debug("add new invoice success ", res);
        dispatch(addNewInvoice(res.data.extras.invoiceInfoModel));
        //every time a new invoice is added, should also dispatch getUserInvoices
        dispatch(getUserInvoices());
      })
      .catch((error) => {
        console.log("add new invoice error!", error);
      });
  }
}

const getInvoices = (resData) => ({
  type: 'GET_USER_INVOICES',
  invoices: resData
})

export function getUserInvoices() {
  return (dispatch, getState) => {
    if (getState().login.isLoggedIn) {
      axios.get('/api/user/invoices', {})
        .then((res) => {
          console.debug("get user invoices success ", res);
          dispatch(getInvoices(res.data.extras.invoices))
        })
        .catch((error) => {
          console.log("get user invoices error!", error);
        });
    }
  }
}
