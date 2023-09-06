import {ajax} from "./ajax";
import {BASE_URL, WEATHER_URL} from "../utils/constant";

// request login in
export const reqLogin = (username, password) => ajax(BASE_URL + '/login', {username, password}, 'post')

// request category
export const reqCategory = (parentId) => ajax(BASE_URL + '/manage/category/list', {parentId})

// request add category
export const reqAddCategory = (parentId, categoryName) => ajax(BASE_URL + '/manage/category/add', {
    parentId,
    categoryName
}, 'POST')

// request update category name
export const reqUpdateCateName = (categoryId, categoryName) => ajax(BASE_URL + '/manage/category/update', {
    categoryId,
    categoryName
}, 'POST')

// request product list
export const reqProductList = (pageNum, pageSize) => ajax(BASE_URL + '/manage/product/list', {pageNum, pageSize})

// request search product
export const reqSearchProduct = (pageNum, pageSize, searchType='productName', keyword) => ajax(BASE_URL + '/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: keyword
})

// request change product status
export const reqChangeProductStatus = (productId, status) => ajax(BASE_URL + '/manage/product/updateStatus', {productId, status}, 'POST')

// request weather information
export const reqWeather = () => ajax(WEATHER_URL)