import React, {useEffect, useState} from 'react';
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import moment from "moment/moment";
import {Layout, message, Modal} from "antd";
import {connect} from "react-redux";

import {reqWeather} from "../../api";
import {userLogout} from "../../redux/actions/user";
import LinkButton from "../LinkButton";


const {confirm} = Modal
const {
    Header
} = Layout;

function HeaderInfo(props) {
    const navigate = useNavigate()
    const [time, setTime] = useState('')
    const [weather, setWeather] = useState({})

    useEffect(() => {

        // Function executed immediately
        (async function () {
            const weatherReault = await reqWeather()
            // console.log('weatherReault: ', weatherReault)
            if (weatherReault.status === '1') {
                const {temperature, humidity, windpower} = weatherReault.lives[0]
                setWeather({temperature, humidity, windpower})
            } else {
                message.error('Failed getting weather information')
            }
        })()

        // Update time per second
        const timer = setInterval(() => {
            const now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            setTime(now)
        },1000)

        return () => {
            clearInterval(timer)
        }

    }, [])


    function handleLogout() {
        confirm({
            icon: <ExclamationCircleOutlined/>,
            content: `Confirm to sign out as ${props.user.username}?`,
            onOk() {
                // console.log('OK');
                props.userLogout()
                navigate('/login', {
                    replace: true
                })
            },
        });
    }

    return (
        <Header className='headerStyle'>
            <div className='headerStyle-top'>
                Welcome, {props.user.username}
                <LinkButton onClick={handleLogout}>Sign out</LinkButton>
            </div>
            <div className='headerStyle-bottom'>
                <div className='headerStyle-bottom-left'>
                    <div className='headerStyle-bottom-left-title'>{props.title}</div>
                    <div className='headerStyle-bottom-left-arrow'></div>
                </div>
                <div className='headerStyle-bottom-right'>
                    <div className='headerStyle-bottom-right-time'>{time}</div>
                    <div className='headerStyle-bottom-right-weather'>
                        temperature:{weather.temperature}°C &nbsp;&nbsp;
                        humidity:{weather.humidity}%rh &nbsp;&nbsp;
                        windpower:{weather.windpower}
                    </div>
                </div>
            </div>
        </Header>
    );
}

export default connect(
    state => ({
        title: state.title,
        user: state.userInfo
    }),
    {
        userLogout,
    }
)(HeaderInfo)