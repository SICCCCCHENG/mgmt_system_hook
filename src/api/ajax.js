import axios from "axios";
import {message} from "antd";

// Encapsulate the axios API
export const ajax = (url, data = {}, type = 'GET') => {

    return new Promise((resolve, reject) => {

        let promise

        if (type === 'GET') {
            promise = axios.get(url, {params: data})
        } else {
            promise = axios.post(url, data)
        }

        promise.then(response => {
            // console.log('response: ', response)
            resolve(response.data)
        }).catch(reason => {
            // console.log('reason: ', reason)
            message.error(reason.message)
        })
    })


}