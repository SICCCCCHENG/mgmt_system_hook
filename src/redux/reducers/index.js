
// Combine all reducers

import {combineReducers} from "redux";

import title from './title'
import userInfo from './user'

export default combineReducers({
    title,
    userInfo
})