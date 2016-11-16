import axios from 'axios';

function mapApiMessagesToNotif(msg){
    switch(msg) {
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
        default:
            return "";
    }
}

export const signUp = (resSuccess,resData)=>({
    type: 'SIGNUP',
    isLoggedIn: resSuccess,
    notif: resSuccess?'':mapApiMessagesToNotif(resData.msg),
    redirectUrl: resSuccess?'/me':'/signup',
    extras: resData
})

export const logIn = (resSuccess,resData) => ({
        type: 'LOGIN',
        isLoggedIn: resSuccess,
        notif: resSuccess?'':mapApiMessagesToNotif(resData.msg),
        redirectUrl: resSuccess?'/me':'/login',
        extras: resData
})

export const logout = () => ({
        type: 'LOGOUT'
})

export const resetNotif = ()=>({
    type: 'RESET_NOTIF',
    notif:''
})

export function userLogin(value) {
    return (dispatch, getState) => {
        const data = {
            email: value.email,
            password: value.pass,
        }

        axios.post('/api/account/login', data)
            .then((response) => {//use arrow function to avoid binding 'this' manually, see https://www.reddit.com/r/javascript/comments/4t6pd9/clean_way_to_setstate_within_axios_promise_in/
                dispatch(logIn(response.data.success,response.data.extras));
            })
            .catch((error)=> {
                console.log("login error!",error);
            });
    }
}

export function userSignup(value) {
    return (dispatch, getState) => {
        const data = {
            username:value.name,
            email:value.email,
            password: value.pass,
            //normally should make user confirm again, but don't bother for instant
            passwordConfirm: value.pass
        }

        axios.post('/api/account/signup', data)
            .then((response) => {//use arrow function to avoid binding 'this' manually, see https://www.reddit.com/r/javascript/comments/4t6pd9/clean_way_to_setstate_within_axios_promise_in/
                //the response.data is what we defined at controllers/appRoutes.js as callback function
                //in the case of signup,
                //if data.success === false, the data.extras will have a msg to identify the problem
                //if data.success === true, data.extras will contain a userProfileModel with email and username
                dispatch(signUp(response.data.success,response.data.extras ));
            })
            .catch((error)=> {
                console.log("signup error!",error);
            });
    }
}

export function userLogOut() {
    return (dispatch, getState)=>{
        axios.post('/api/account/logout',{})
            .then((response) =>{
                dispatch(logout());
            })
            .catch((error)=> {
                console.log("logout error!",error);
            });
    }
}

export const getInfo = (resData)=>({
    type: 'GET_INFO',
    name: resData.name,
    address: resData.address,
    siret:resData.siret,
    phone: resData.phone
})

export const updateInfo = (resData)=>({
    type: 'UPDATE_INFO',
    name: resData.name,
    address: resData.address,
    siret:resData.siret,
    phone: resData.phone
})

export function getUserInfo() {
    return (dispatch,getState)=>{
        axios.get('/api/user/info')
            .then((res) => {
                dispatch(getInfo(res.data.extras.userInfoModel));
            })
            .catch((error)=>{
                console.log("get user info error!",error);
            })
    }
}

export function updateUserInfo(value) {
    return(dispatch,getState)=>{
        const userInfo = {
            name: value.name,
            address: value.address,
            siret:value.siret,
            phone: value.phone
        }
        axios.post('/api/user/info',userInfo)
            .then((res)=>{
                dispatch(updateInfo(res.data.extras.userInfoModel))
            })
            .catch((error)=>{
                console.log("update user info error!",error);
            });
    }
}
