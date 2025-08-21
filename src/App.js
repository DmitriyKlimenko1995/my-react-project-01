import './App.css';
import ContentContainer from './components/Content/ContentContainer';
import Dialogs from './components/Dialogs/Dialogs';
import Header1 from './components/Header/Header';
import Nav from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsersContainer from './components/Users/UsersContainer';
// import Content from './components/Content/Content';
import RegisterForm from './components/Header/AuthReg/RegisterForm';
import LoginForm from './components/Header/AuthReg/LoginForm';
import PrivateRoute from './components/PrivateRouter/PrivateRoute';
import HeaderContainer from './components/Header/HeaderContainer';
import React, { useEffect, useState } from 'react';
import ChatBox from './components/Dialogs/Chat/ChatBox';
import ChatPath from './components/Dialogs/Chat/ChatPath';
import MyForm from './components/Content/MyForm/MyForm';
import { NavLink } from "react-router-dom";
import logo from "./logo.svg";

import { LaptopOutlined, NotificationOutlined, UserOutlined, UserSwitchOutlined, FileDoneOutlined, SettingOutlined, WechatOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { ChatRoom } from './components/Dialogs/Chat/ChatRoom';
const { Header, Content, Footer, Sider } = Layout;
const items1 = ['1', '2', '3'].map(key => ({
  key,
  label: `nav ${key}`,
}));

const menuRoutes = [
  { key: '1', to: '/content', label: 'Profile', icon: UserOutlined },
  { key: '2', to: '/dialogs', label: 'Messages', icon: LaptopOutlined },
  { key: '3', to: '/users', label: 'Users', icon: UserSwitchOutlined },
  { key: '4', to: '/news', label: 'News', icon: FileDoneOutlined },
  { key: '5', to: '/music', label: 'Music', icon: NotificationOutlined },
  { key: '6', to: '/settings', label: 'Settings', icon: SettingOutlined },
  { key: '7', to: '/chat', label: 'Chat', icon: WechatOutlined },
];

const items2 = menuRoutes.map(({ key, to, label, icon }) => ({
  key,
  icon: icon ? React.createElement(icon) : null,
  label: (
    <div>
      <NavLink
        to={to}
      >
        {label}
      </NavLink>
    </div>
  ),
}));



function App() {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('userId');

  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleSubscribe = () => {
    // выполнить подписку
    setRefreshFlag(prev => !prev); // заставит Sidebar перерендериться
  };

  return (
    <Layout>
      <BrowserRouter>
        <Header className="header" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} className="App-logo" alt="logo" />
          <Header1 handleSubscribe={handleSubscribe} />
        </Header>
        <div style={{ padding: '0 48px' }}>
          <Breadcrumb
            style={{ margin: '16px 0' }}
            items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
          />
          <Layout
            style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
          >
            <Sider className="sider" style={{ background: colorBgContainer }} width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: 'auto' }}
                items={items2}
              />
              <Nav refreshFlag={refreshFlag} />

            </Sider>
            <Content className="content" style={{ padding: '0 24px', minHeight: 280 }}>
              <div>
                <Routes>
                  <Route
                    path="/dialogs"
                    element={
                      <PrivateRoute>
                        <Dialogs />
                      </PrivateRoute>} />
                  <Route
                    path="/content/:id"
                    element={
                      <PrivateRoute>
                        <ContentContainer />
                      </PrivateRoute>} />
                  <Route
                    path="/users"
                    element={
                      <PrivateRoute>
                        <UsersContainer refreshFlag={handleSubscribe} />
                      </PrivateRoute>} />
                  <Route path="/registerform" element={<RegisterForm />} />
                  <Route path="/loginform" element={<LoginForm handleSubscribe={handleSubscribe} />} />
                  <Route
                    path="/chat/:id"
                    element={
                      <PrivateRoute>
                        <ChatPath handleSubscribe={handleSubscribe} />
                      </PrivateRoute>} />
                  <Route
                    path="/chatroom/:id"
                    element={
                      <PrivateRoute>
                        <ChatRoom />
                      </PrivateRoute>} />
                  <Route
                    path="/profile/:id"
                    element={
                      <PrivateRoute>
                        <MyForm />
                      </PrivateRoute>} />

                </Routes>

              </div>
            </Content>
          </Layout>
        </div>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </BrowserRouter>
    </Layout>

    // <BrowserRouter>
    //   <div className="app-wrapper">
    //     <Header1 handleSubscribe={handleSubscribe} />
    //     <Nav refreshFlag={refreshFlag} />
    // <div className='app-wrapper-content'>
    //   <Routes>
    //     <Route
    //       path="/dialogs"
    //       element={
    //         <PrivateRoute>
    //           <Dialogs />
    //         </PrivateRoute>} />
    //     <Route
    //       path="/content/:id"
    //       element={
    //         <PrivateRoute>
    //           <ContentContainer />
    //         </PrivateRoute>} />
    //     <Route
    //       path="/users"
    //       element={
    //         <PrivateRoute>
    //           <UsersContainer refreshFlag={handleSubscribe} />
    //         </PrivateRoute>} />
    //     <Route path="/registerform" element={<RegisterForm />} />
    //     <Route path="/loginform" element={<LoginForm handleSubscribe={handleSubscribe} />} />
    //     <Route
    //       path="/chat/:id"
    //       element={
    //         <PrivateRoute>
    //           <ChatPath handleSubscribe={handleSubscribe} />
    //         </PrivateRoute>} />
    //     <Route
    //       path="/profile/:id"
    //       element={
    //         <PrivateRoute>
    //           <MyForm />
    //         </PrivateRoute>} />

    //   </Routes>

    // </div>
    //   </div>
    // </BrowserRouter>
  );
}

export default App;
