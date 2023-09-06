import React from 'react';
import {Button, Card, Table} from "antd";
import {PAGE_SIZE} from "../../../../utils/constant";
import {PlusOutlined, ArrowLeftOutlined} from '@ant-design/icons';

function AddModifyForm(props) {
    return (
        <Card
            title={<ArrowLeftOutlined />}

            style={{
                width: "100%",
                position: 'unset'
            }}
        >
        </Card>
    );
}

export default AddModifyForm;