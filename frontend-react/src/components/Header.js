import { Layout, Menu, Breadcrumb, Descriptions, Button } from 'antd';
import { Link, NavLink } from 'react-router-dom';
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
import 'antd/dist/antd.dark.css';
import './App.css';

function Header() {
    const [state, dispatch] = useContext(Context);
    const { Content, Footer, Sider } = Layout;
    function logout() {
        dispatch(logoutUser());
    }

    function isAdmin(){
        if(state.auth.aCC == 873333){
            return(
                <Menu.Item key="7" icon={<DesktopOutlined />} className='menu-item'>
                    <Link to="/adminpage">Admin view</Link>
                </Menu.Item>
            )
            
        }
    }

    function loggedIn(){
        if(state.auth.token != undefined && state.auth.token != null){
            return (
                <Menu theme="light" /*defaultSelectedKeys={['1']}*/ mode="inline" >
                    <Menu.Item key="2" icon={<DesktopOutlined />} className='menu-item' >
                        <Link to="/profile">Your profile</Link>
                    </Menu.Item>
                    <Menu.Item key="3" className='menu-item'>
                    <Link to="/createpost">Create new post</Link>
                    </Menu.Item>
                    <Menu.Item key="4" style={{ pointerEvents: 'none' }}>
                        Sub:
                    </Menu.Item>
                    <Menu.Item key="5" className='menu-item'>
                        <Link to="/social">Social</Link>
                    </Menu.Item>
                    <Menu.Item key="6" className='menu-item'>
                        <Link to="/gaming">Gaming</Link>
                    </Menu.Item>
                    {isAdmin()}
                </Menu>  
            )
            
        } else {
            return (
                <Menu theme="light" /*defaultSelectedKeys={['1']}*/ mode="inline" >
                    <Menu.Item key="2" icon={<DesktopOutlined />} className='menu-item' onSelect="menu-item-active">
                        <Link to="/login">Login</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<DesktopOutlined />} className='menu-item'>
                        <Link to="/register">Register</Link>
                    </Menu.Item>
                    <Menu.Item key="4" className='menu-item'>
                    <Link to="/createpost">Create new post</Link>
                    </Menu.Item>
                    <Menu.Item key="5" style={{ pointerEvents: 'none' }}>
                        Sub:
                    </Menu.Item>
                    <Menu.Item key="6" className='menu-item'>
                        <Link to="/social">Social</Link>
                    </Menu.Item>
                    <Menu.Item key="7" className='menu-item'>
                    <Link to="/gaming">Gaming</Link>
                    </Menu.Item>
                </Menu>
            )
            
        }
    }
    function logoutButton(){
        if(state.auth.token != undefined && state.auth.token != null){
            return (
                <Button style={{ marginTop: "20px", marginLeft: 60 }} onClick={() => logout()}><Link to="/">Logout</Link></Button>
            )
        }
    }


    return (
            <Sider theme="light" style={{ minHeight: '100vh', fontFamily: "Roboto, sans-serif" }}>
                
                <Menu theme="light" mode="inline">
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