import React, {useEffect} from 'react';
import {Card, List} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import LinkButton from "../../../../components/LinkButton";
import {useLocation, useNavigate} from "react-router-dom";

function Detail(props) {

    const navigate = useNavigate()
    const {state} = useLocation()

    useEffect(() => {
        if (!state){
            // const {currentPage} = state
            navigate('/product', {state: {currentPage: 1}})
        }
    },[])

    const {name,price,imgs,detail,desc} = state
    console.log('state: ',state)

    function backToProduct(){
        const {currentPage} = state
        navigate('/product', {state: {currentPage}})
    }

    return (
        <Card
            title={<><LinkButton onClick={backToProduct}><ArrowLeftOutlined/></LinkButton> <span>Product Detail</span></>}
            style={{
                width: "100%",
                // position: 'unset'
            }}
        >
            <List
                itemLayout="horizontal"
                style={{textAlign:'left'}}
                // dataSource={data}
                renderItem={(item, index) => (
                    <List.Item>
                        {item}
                    </List.Item>
                )}
            >
                <List.Item
                >
                    <>
                        <span>Product Name:</span>
                        <span>{name}</span>
                    </>
                </List.Item>
                <List.Item>
                    <>
                        <span>Product Description:</span>
                        <span>{desc}</span>
                    </>
                </List.Item>
                <List.Item>
                    <>
                        <span>Product Price:</span>
                        <span>{price}</span>
                    </>
                </List.Item>
                <List.Item>
                    <>
                        <span>Product Name:</span>
                        <span>{}</span>
                    </>
                </List.Item>
                <List.Item>
                    <>
                        <span>Product Images:</span>
                        <span>{}</span>
                    </>
                </List.Item>
                <List.Item>
                    <>
                        <span>Product Detail:</span>
                        <span>{}</span>
                    </>
                </List.Item>
            </List>


        </Card>
    );
}

export default Detail;