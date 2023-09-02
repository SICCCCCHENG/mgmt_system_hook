import {USER_LOGIN_SUCCEED, USER_LOGIN_ERROR, USER_LOGOUT} from "../constant";
import {getUser} from "../../utils/storageUtils";

const initialState = getUser()
export default function userReducer(preState = initialState, action){
    const {type, data} = action
    switch (type) {
        case USER_LOGIN_SUCCEED:
            return data
        case USER_LOGIN_ERROR:
            return {errMsg: data}
        case USER_LOGOUT:
            return data
        default:
            return preState
    }
}