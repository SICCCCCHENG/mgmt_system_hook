import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Input, message, Select, Table} from "antd";
import {useLocation, useNavigate} from "react-router-dom";

import LinkButton from "../../../components/LinkButton";
import {PAGE_SIZE} from "../../../utils/constant";
import {reqChangeProductStatus, reqProductList, reqSearchProduct} from "../../../api";

function Product(props) {

    // specify the search option (either by name or desc)
    const [searchOptions] = useState([
        {
            value: 'productName',
            label: 'By Name',
        },
        {
            value: 'productDesc',
            label: 'By Desc',
        }])

    // store each page product information ( frontend pagination)
    const [productInfo, setProductInfo] = useState({})

    // indicate current page
    const [currentPage, setCurrentPage] = useState(1)

    // specify if the table is requesting data
    const [loading, setLoading] = useState(false)

    // indicate is displaying search items
    const [isSearch, setIsSearch] = useState(false)

    // setup search result
    const [searchResult, setSearchResult] = useState({})

    // save search type and keyword
    const [searchObj, setSearchObj] = useState({searchType: '', keyword: ''})


    const searchFormNode = React.useRef()
    const navigate = useNavigate()
    const {state} = useLocation()

    // set table columns
    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            // key: 'name',
            // width: '60%',
            // render: (text) => <a>{text}</a>,
        },
        {
            title: 'Product Description',
            dataIndex: 'desc',
            // key: 'name',
            // width: '60%',
            // render: (text) => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            // key: 'name',
            // width: '60%',
            // render: (text) => <a>{text}</a>,
        },
        {
            title: 'Status',
            // dataIndex: 'status',
            // key: 'address',
            render: (productObj) => (
                <>
                    <Button type='primary' onClick={handleProductStatus(productObj)}>{productObj.status === 1 ? 'Stop Selling' : 'Start Selling'}</Button>
                    <div>{productObj.status === 1 ? 'Available' : 'Unavailable'}</div>
                </>
            ),
        },
        {
            title: 'Detail / Modify',
            // dataIndex: 'address',
            // key: 'address',
            render: (productObj) => (
                <>
                    <LinkButton onClick={handleDetail(productObj)}>Detail</LinkButton>
                    <LinkButton>Modify</LinkButton>
                </>
            ),
        },
    ];

    useEffect(() => {
        (
            async () => {
                // console.log('state: ',state)
                let current = 1
                if (state){  // if it is from other page, check the previous page first
                    const {currentPage} = state
                    setCurrentPage(currentPage)
                    current = currentPage
                }
                setLoading(true)
                const result = await reqProductList(current, PAGE_SIZE)
                setLoading(false)
                if (result.status === 0) {
                    setProductInfo(result.data)
                } else {
                    message.error('Bad request, please try again later')
                }
            }
        )()
    }, [])


    async function handlePageChange(page) {
        // console.log('page, pageSize: ', page)
        setCurrentPage(page)
        setLoading(true)
        let result
        if (isSearch) {
            result = await reqSearchProduct(page, PAGE_SIZE, searchObj.searchType, searchObj.keyword)
        } else {
            result = await reqProductList(page, PAGE_SIZE)
        }
        setLoading(false)

        if (result.status === 0) {
            if (isSearch) {
                setSearchResult(result.data)
            } else {
                setProductInfo(result.data)
            }
        } else {
            message.error('Bad request, please try again later')
        }
    }


    function handleSearch() {
        searchFormNode.current.validateFields().then(async value => {
            setCurrentPage(1)
            setIsSearch(true)
            const {searchType, keyword} = searchFormNode.current.getFieldsValue();
            // console.log('searchType, keyword: ',searchType, keyword)
            const result = await reqSearchProduct(1, PAGE_SIZE, searchType, keyword)
            setSearchObj({
                searchType,
                keyword
            })
            console.log('result: ', result)
            if (result.status === 0) {
                setLoading(true)
                setSearchResult(result.data)
                setLoading(false)
            } else {
                message.error('Bad request, please try again later')
            }
            // console.log(searchFormNode.current);
            // searchFormNode.current.setFieldValue('keyword', '')
        }, err => {
        })
    }


    function handleReturn() {
        setIsSearch(false)
    }

    // function currying
    function handleProductStatus(productObj) {
        return async () => {
            // console.log('productObj: ',productObj)
            const {_id, status} = productObj
            const newStatus = status === 1 ? 2 : 1
            setLoading(true)
            const result = await reqChangeProductStatus(_id, newStatus)
            setLoading(false)
            // console.log('result: ',result)
            let newProductArray
            if (result.status === 0){
                message.success(`${newStatus === 1 ? 'Start ' : 'Stop '} Selling Succeed`)
                newProductArray = productInfo.list.reduce((pre, item) => {
                    if (item._id === productObj._id) {
                        item.status = newStatus
                    }
                    pre.push(item)
                    return pre
                },[])
            }
            setProductInfo({...productInfo, list: newProductArray})
        }
    }

    function handleDetail(productObj){
        // add extra info and pass it all together to detail component
        productObj.currentPage = currentPage
        return () => {
            navigate('/product/detail', {state: productObj})
            // console.log(productObj)
        }
    }

    let title =
        <Form
            ref={searchFormNode}
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Form.Item
                style={{margin: '0'}}
                name='searchType'
            >
                <Select
                    defaultValue="By Name"
                    style={{
                        width: 120,
                    }}
                    // onChange={handleChange}
                    options={searchOptions}
                />
            </Form.Item>
            <Form.Item
                style={{margin: '0'}}
                name='keyword'
                rules={[{
                    required: true,
                    message: 'search keyword required'
                }]}
            >
                <Input placeholder='keyword' style={{margin: '0 10px', width: '200px'}}></Input>
            </Form.Item>
            <Form.Item
                style={{margin: '0'}}
            >
                <Button type='primary' onClick={handleSearch}>Search</Button>
            </Form.Item>
        </Form>


    return (
        <Card
            title={title}
            // extra={<Button type='primary' onClick={handleClickAddCategory}><PlusOutlined/>add category</Button>}
            extra={<>
                {
                    isSearch ? <Button type='primary' onClick={handleReturn}
                                       style={{marginRight: '10px'}}>return</Button> : null
                }
                <Button type='primary'>add product</Button>
            </>}

            style={{
                width: "100%",
                position: 'unset'
            }}
        >
            <Table
                columns={columns}
                dataSource={isSearch ? searchResult.list : productInfo.list}
                bordered
                loading={loading}
                rowKey='_id'
                pagination={   // Front end pagination
                    {
                        pageSize: PAGE_SIZE,
                        total: isSearch ? searchResult.total : productInfo.total,
                        showQuickJumper: true,
                        onChange: handlePageChange,
                        current: currentPage
                    }
                }
            />
        </Card>
    );
}

export default Product;