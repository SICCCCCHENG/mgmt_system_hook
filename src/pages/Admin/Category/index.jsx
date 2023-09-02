import React, {useEffect, useState} from 'react';
import {flushSync} from 'react-dom';
import {Button, Card, Table, Modal, Input, Form, message, Select} from 'antd'
import {PlusOutlined, ArrowRightOutlined} from '@ant-design/icons';

import {reqCategory, reqUpdateCateName, reqAddCategory} from "../../../api";
import {PAGE_SIZE} from "../../../redux/constant";
import LinkButton from "../../../components/LinkButton";

function Category(props) {

    let [state, setState] = useState({
        categoryLevel: 1,    // (value should be either 1 or 2) category level 1 or 2 is being displayed
        category: [],     // level one category
        subCategory: [],      // level two category
        modalOpen: 0,    // control add or modify modal open or close (1 -> modify modal open; 2 -> add modal open)
        curCateObj: {},  // current category (object) being viewed and the name potentially will be modified
        underLevelOneObj: {},  // user is viewing level 2 menu under indicated level one obj (containing level one title)
        options: [],    // when click 'add category', 'under category' select options will be updated here
        loading: false  // indicate if the table is loading
    })

    const modifyFormNode = React.useRef()
    const addFormNode = React.useRef()

    // console.log('state.categoryLevel: ',state)

    const columns = [
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
            width: '60%',
            // render: (text) => <a>{text}</a>,
        },
        {
            title: state.categoryLevel === 1 ? 'Modify / View' : 'Modify',
            // dataIndex: 'address',
            // key: 'address',
            render: (categoryObj) => (
                <>
                    <LinkButton onClick={() => modifyCategory(categoryObj)}>Modify Category</LinkButton>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    {
                        state.categoryLevel === 1 ?
                            <LinkButton onClick={() => viewSubCategory(categoryObj)}>View SubCategory</LinkButton> : ''
                    }

                </>
            ),
        },
    ];

    const data = state.categoryLevel === 1 ? state.category : state.subCategory
    // console.log('data: ',data)


    useEffect(() => {

        (async function getResult() {
            // const result = await reqCategory(0)
            setState({...state, loading: true})
            const result = await reqCategory(0)
            setState({...state, loading: false})
            // console.log('result: ', result)
            if (result.status === 0) {
                setState({...state, category: result.data})
            }else {
                message.error('Bad request, please try again later')
            }
        })()

    }, [])


    function handleClickAddCategory() {

        let options
        // if (state.categoryLevel === 1){
        const optionsArr = state.category.map((item) => {
            return {
                value: item._id,
                label: item.name
            }
        })
        options = [{value: '0', label: 'Level One Category'}, ...optionsArr]
        // }

        setState({...state, modalOpen: 2, options})
    }

    function modifyCategory(categoryObj) {
        // console.log('categoryObj: ', categoryObj)

        // updater being done right away
        flushSync(() => {
            setState({...state, modalOpen: 1, curCateObj: categoryObj})
        })


        // setTimeout(() => {
        modifyFormNode.current.setFieldsValue({categoryName: categoryObj.name})
        // }, 0)
    }

    async function viewSubCategory(categoryObj) {
        // console.log('categoryObj: ',categoryObj)

        const {_id} = categoryObj
        // console.log('_id: ',_id)
        // setState({...state, curCateObj: categoryObj})
        setState({...state, loading: true})
        const result = await reqCategory(_id)
        setState({...state, loading: false})
        if (result.status === 0) {
            setState({
                ...state,
                categoryLevel: 2,
                subCategory: result.data,
                curCateObj: categoryObj,
                underLevelOneObj: categoryObj
            })
        }
    }


    async function handleModifyOk() {
        const {categoryName} = modifyFormNode.current.getFieldsValue('categoryName')
        const {_id, parentId} = state.curCateObj

        // console.log('categoryName: ', categoryName)
        setState({...state, loading: true})
        const result = await reqUpdateCateName(_id, categoryName)
        setState({...state, loading: false})
        // console.log('result: ', result);

        if (result.status === 0) {
            // request again and update level 1 category
            setState({...state, loading: true})
            const reqCateResult = await reqCategory(parentId)
            setState({...state, loading: false})
            // console.log('result: ', result)
            if (reqCateResult.status === 0) {

                if (state.categoryLevel === 1) {
                    // flushSync(() => {
                    setState({...state, category: reqCateResult.data, modalOpen: 0})
                    // })
                } else {
                    setState({...state, subCategory: reqCateResult.data, modalOpen: 0})
                }
            }
            message.success('Update Category Name Succeed')
        } else {
            message.error('Update Category Name failed, please try again later')
        }

    }

    async function handleAddOk() {
        // console.log('addFormNode.current: ', addFormNode.current)
        // console.log('addFormNode.current.getFieldsValue(\'underCategory\'): ', addFormNode.current.getFieldsValue())

        const validateResult = addFormNode.current.validateFields()
        validateResult.then(async formResult => {
            // console.log('success: ',formResult)
            const {categoryName, underCategory} = formResult
            let parentId
            if (underCategory) {   // if under category is not default value, then it must be adding under level 2 category
                parentId = underCategory
            } else if (state.categoryLevel === 1) {
                parentId = 0
            } else {
                parentId = state.underLevelOneObj._id
            }
            const addResult = await reqAddCategory(parentId, categoryName)
            // console.log('addResult: ', addResult)
            if (addResult.status === 0) {
                message.success('add category succeed')
                setState({...state, loading: true})
                const categoryResult = await reqCategory(parentId)
                setState({...state, loading: false})
                if (addResult.data.parentId === '0') {
                    setState({...state, category: categoryResult.data, modalOpen: 0})
                } else {
                    setState({...state, subCategory: categoryResult.data, modalOpen: 0})
                }
            } else {
                message.error('add category failed, please try again later')
            }
        }, (err) => {
        })

    }

    function returnToLevelOneList() {
        setState({
            ...state,
            categoryLevel: 1,
            subCategory: [],
            underLevelOneObj: {}
        })
    }

    function handleCancel() {
        setState({...state, modalOpen: 0, curCateObj: {}})
        // modifyRefNode.current.input.value = ''
    }


    return (
        <Card
            title={state.categoryLevel === 1 ? "Level One Category List" :
                <div><LinkButton onClick={returnToLevelOneList}>Level One Category
                    List</LinkButton><ArrowRightOutlined/>&nbsp;&nbsp; {state.underLevelOneObj.name}</div>}
            extra={<Button type='primary' onClick={handleClickAddCategory}><PlusOutlined/>add category</Button>}
            style={{
                width: "100%",
            }}
        >
            <Table
                columns={columns}
                dataSource={data}
                bordered
                loading={state.loading}
                rowKey='_id'
                pagination={   // Front end pagination
                    {
                        pageSize: PAGE_SIZE,
                        // total:{state.category.length}
                        showQuickJumper: true
                    }
                }

            />
            <Modal
                title="Modify Category"
                open={state.modalOpen === 1}
                onOk={handleModifyOk}
                onCancel={handleCancel}
            >
                <Form ref={modifyFormNode}>
                    <Form.Item
                        name='categoryName'
                        rules={[
                            {
                                required: true,
                                message: 'Please input category name'
                            }
                        ]}
                    >
                        <Input></Input>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Add Category"
                destroyOnClose
                open={state.modalOpen === 2}
                onOk={handleAddOk}
                onCancel={handleCancel}
            >
                Under Category:
                <Form ref={addFormNode}>
                    <Form.Item
                        name='underCategory'
                    >
                        <Select
                            defaultValue={state.categoryLevel === 1 ? 'Level One Category' : state.underLevelOneObj.name}
                            style={{
                                width: '100%',
                            }}
                            // onChange={handleChange}
                            options={state.options}
                        />
                    </Form.Item>
                    Category Name:
                    <Form.Item
                        name='categoryName'
                        rules={[
                            {
                                required: true,
                                message: 'Please input category name'
                            }
                        ]}
                    >
                        <Input placeholder='Please input category name'></Input>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
}

export default Category;