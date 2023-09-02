import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {Layout, Menu} from "antd";
import {useLocation, useNavigate} from "react-router-dom";

import warehouse from "../../assets/images/homeIcon.png";
import {changeTitle} from "../../redux/actions/title";
import menuConfig from "../../config/menuConfig";

const {
    Sider,
} = Layout;


function manageMenu(menuConfig) {
    return menuConfig
}

function findTitle(menu, key) {
    for (let item of menu) {
        if (!item.children) {
            if (item.key === key) return item.label
        } else {
            const res = findTitle(item.children, key)
            if (res) return res
        }
    }
}

function findSubMenu(menu, key) {
    return menu.find(item => {
        if (item.children){
            for (let ele of item.children) {
                if (ele.key === key){
                    return true
                }
            }
        }
    })
}

function LeftNav(props) {
    const navigate = useNavigate()

    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/'){
            // console.log('location.pathname: ',location.pathname)
            navigate('/home', {
                replace:true
            })
        }
    },[])


    const menu = manageMenu(menuConfig)

    const title = findTitle(menuConfig, location.pathname) || ''

    props.changeTitle(title)

    const subMenu = findSubMenu(menuConfig, location.pathname) || {}

    // console.log('subMenu: ', subMenu)
    function handleSelected(MenuItem) {
        // console.log('MenuItem: ', MenuItem)
        const {key} = MenuItem
        const title = findTitle(menuConfig, key)
        props.changeTitle(title)
        navigate(key)
    }


    return (
        <Sider className='siderStyle' style={{height: '100%'}}>
            <div className='sider-header'>
                <div className='sider-header-img'><img src={warehouse} alt=""/></div>
                <span>Products <br/> Management</span>
            </div>
            <Menu
                theme='dark'
                onClick={handleSelected}
                style={{
                    width: '100%',
                    textAlign: 'left'
                }}
                selectedKeys={[location.pathname]}
                defaultOpenKeys={[subMenu.key]}
                mode="inline"
                items={menu}
            />
        </Sider>
    );
}

export default connect(
    state => ({}),
    {
        changeTitle
    }
)(LeftNav)