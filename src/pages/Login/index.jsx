import React from 'react';
import {Form, Input, Button} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";

import './index.css'
import logo from './images/tom_jerry.jpg'
import {userLogin} from "../../redux/actions/user";


function Login(props) {

    const navigate = useNavigate()


    if (props.userInfo._id){
        // <Navigate to='/admin' replace/>
        navigate('/',{
            replace:true
        })
    }

    function onFinish(values){
        const {username, password} = values
        props.userLogin(username, password)
    }


    return (
        <div className='login'>
            <div className='header'>
                <img src={logo} alt=""/>
                <span>Product Management System</span>
            </div>
            <div className='login-window'>
                <div className='login-title'>
                    {/*<div className={props.userInfo.id ? 'error-msg' : 'error-msg show'}>*/}
                    <div className='error-msg'>
                        {props.userInfo.errMsg}
                    </div>
                    Sign in
                </div>
                <div className='login-content'>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default connect(
    state => ({
        userInfo: state.userInfo
    }), {
        userLogin
    })
(Login)
