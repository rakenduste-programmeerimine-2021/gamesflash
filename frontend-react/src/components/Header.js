import { Layout, Menu, Breadcrumb, Descriptions, Button } from 'antd';
import { Link } from 'react-router-dom';
import { React, useContext } from "react";
import { Context } from "../store";
import { logoutUser } from "../store/actions";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

function Header() {
    const [state, dispatch] = useContext(Context);
    const { Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;
    function logout() {
        dispatch(logoutUser());
    }
    function loggedIn() {
        if(state.auth.token != undefined && state.auth.token != null){
            return (
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        <Link to="/profile">Your profile</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                    <Link to="/createpost">Create new post</Link>
                    </Menu.Item>
                    <Menu.Item key="4" style={{ pointerEvents: 'none' }}>
                        Sub:
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to="/social">Social</Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                    <Link to="/gaming">Gaming</Link>
                    </Menu.Item>
                </Menu>  
            )
            
        } else {
            return (
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        <Link to="/login">Login</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<DesktopOutlined />}>
                        <Link to="/register">Register</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                    <Link to="/createpost">Create new post</Link>
                    </Menu.Item>
                    <Menu.Item key="5" style={{ pointerEvents: 'none' }}>
                        Sub:
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Link to="/social">Social</Link>
                    </Menu.Item>
                    <Menu.Item key="7">
                    <Link to="/gaming">Gaming</Link>
                    </Menu.Item>
                </Menu>
            )
            
        }
    }
    function logoutButton(){
        if(state.auth.token != undefined && state.auth.token != null){
            return (
                <Button style={{ marginTop: 650, marginLeft: 60 }} onClick={() => logout()}><Link to="/">Logout</Link></Button>
            )
        }
    }


    return (
            <Sider style={{ minHeight: '100vh' }}>
                
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" style={{ pointerEvents: 'none' }}>
                        GamesFlash
                    </Menu.Item>
                </Menu>
                    {loggedIn()}
                    
                    {logoutButton()}
                    
                
            </Sider>
        
    );
}

export default Header;