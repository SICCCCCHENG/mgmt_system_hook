import Login from '../pages/Login'
import Admin from '../pages/Admin'
import Home from '../pages/Admin/Home'
import Category from "../pages/Admin/Category";
import Product from '../pages/Admin/Product'
import User from '../pages/Admin/User'
import Role from '../pages/Admin/Role'
import Bar from '../pages/Admin/Charts/Bar'
import Line from '../pages/Admin/Charts/Line'
import Pie from '../pages/Admin/Charts/Pie'
import AddModifyForm from "../pages/Admin/Product/AddModifyForm";
import Detail from '../pages/Admin/Product/Detail'

export const route = [
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/',
        element: <Admin/>,
        children: [
            {
                path: 'home',
                element: <Home/>
            },
            {
                path: 'category',
                element: <Category/>
            },
            {
                path: 'product',
                element: <Product/>,
            },
            {
                path: 'product',
                children: [
                    {
                        path: 'detail',
                        element: <Detail/>
                    },
                    {
                        path: 'addmodify',
                        element: <AddModifyForm/>
                    }
                ]
            },
            {
                path: 'user',
                element: <User/>
            },
            {
                path: 'role',
                element: <Role/>
            },
            {
                path: 'Charts',
                // element: <Role/>,
                children: [
                    {
                        path: 'bar',
                        element: <Bar/>
                    },
                    {
                        path: 'Line',
                        element: <Line/>
                    },
                    {
                        path: 'Pie',
                        element: <Pie/>
                    },
                ]
            },
        ]
    },


]