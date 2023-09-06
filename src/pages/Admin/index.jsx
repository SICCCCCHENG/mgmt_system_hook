import React from 'react';
import {Layout} from 'antd'
import {connect} from "react-redux";
import {useNavigate, Outlet} from "react-router-dom";

import './index.css'
import HeaderInfo from '../../components/HeaderInfo'
import LeftNav from '../../components/LeftNav'

const {
    Footer,
    Content
} = Layout;

function Admin(props) {

    const navigate = useNavigate()

    // if user did not log in, redirect to login page
    if (!props.user._id) {
        navigate('/login', {
            replace: true
        })
    }


    return (
        <Layout style={{height: '100%', overflow:'hidden'}}>
            <LeftNav/>
            <Layout>
                <HeaderInfo/>
                <Content className='contentStyle' style={{minHeight:550}}>
                    {/*{element}*/}
                    <Outlet/>
                </Content>
                <Footer className='footerStyle'>Recommend using Chrome browser for better experience</Footer>
            </Layout>
        </Layout>
    );
}

export default connect(
    state => ({
        user: state.userInfo
    }),
    {}
)(Admin)