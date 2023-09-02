import {CHANGE_TITLE} from "../constant";

const initState = 'Home'
export default function titleReducer(preState=initState, action){
    const {type, data} = action
    switch (type) {
        case CHANGE_TITLE:
            return data
        default:
            return preState
    }
}