import {message} from "antd";

import {USER_LOGIN_ERROR, USER_LOGIN_SUCCEED, USER_LOGOUT} from "../constant";
import {reqLogin} from "../../api";
import {saveUser, removeUser} from '../../utils/storageUtils'

export const userLoginSucceed = (msg) => ({type: USER_LOGIN_SUCCEED, data: msg})
export const userLoginErr = (msg) => ({type: USER_LOGIN_ERROR, data: msg})

export const userLogin = (username, password) => {
    return async (dispatch) => {
        const result = await reqLogin(username, password)
        if (result.status === 0){
            console.log('result.data: ', result.data)
            saveUser(result.data)
            message.success('login success')
            return dispatch(userLoginSucceed(result.data))
        } else {
            return dispatch(userLoginErr(result.msg))
        }
    }
}

export const userLogout = () => {
    removeUser()
    message.success('logout succeed')
    return {type: USER_LOGOUT, data:{}}
}

