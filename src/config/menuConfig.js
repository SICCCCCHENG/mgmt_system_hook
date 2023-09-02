import {
    ToolOutlined,
    UnorderedListOutlined,
    HomeOutlined,
    AppstoreOutlined,
    UserOutlined,
    SafetyCertificateOutlined,
    AreaChartOutlined,
    PieChartOutlined,
    LineChartOutlined,
    BarChartOutlined
} from '@ant-design/icons';

const menuList = [
    {
        label: 'Home', // title name
        key: '/home', // according path
        icon: <HomeOutlined/>, // icon name
    },
    {
        label: 'Category Mgt',
        key: '/commodityMgt',
        icon: <AppstoreOutlined/>,
        children: [ // submenu list
            {
                label: 'Category Mgt', // title name
                key: '/category', // according path
                icon: <UnorderedListOutlined/>, // icon name
            },
            {
                label: 'Product Mgt', // title name
                key: '/product', // according path
                icon: <ToolOutlined/>, // icon name
            }
        ]
    },
    {
        label: 'User Mgt', // title name
        key: '/user', // according path
        icon: <UserOutlined/>, // icon name
    },
    {
        label: 'Role Mgt', // title name
        key: '/role', // according path
        icon: <SafetyCertificateOutlined/>, // icon name
    },
    {
        label: 'Charts',
        key: '/charts',
        icon: <AreaChartOutlined/>,
        children: [ // submenu list
            {
                label: 'Bar Chart', // title name
                key: '/charts/bar', // according path
                icon: <BarChartOutlined/>, // icon name
            },
            {
                label: 'Pie Chart', // title name
                key: '/charts/pie', // according path
                icon: <PieChartOutlined/>, // icon name
            },
            {
                label: 'Line Chart', // title name
                key: '/charts/line', // according path
                icon: <LineChartOutlined/>, // icon name
            }
        ]
    },
]

export default menuList;