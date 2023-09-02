import store from "store";

import {USER_KEY} from "./constant";


export const saveUser = user => store.set(USER_KEY, user)
export const getUser = () => (store.get(USER_KEY) || {})
export const removeUser = () => store.remove(USER_KEY)


