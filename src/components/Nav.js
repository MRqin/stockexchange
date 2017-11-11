import React from 'react';
import '../styles/header.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Icon, Modal, Button, Input, message} from 'antd';
import qs from 'qs';
import axios from 'axios';
const { SubMenu } = Menu;
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            regVisible: false,
            loginVisible: false,
            isLogin: false,
            userName: '',
        };
        this.showLoginModal = this.showLoginModal.bind(this);
        this.showRegModal = this.showRegModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLoginCan = this.handleLoginCan.bind(this);
        this.handleRegCan = this.handleRegCan.bind(this);
        this.handleReg = this.handleReg.bind(this);
        // ProjCfg.base.APIServerBaseUrl
    }

    componentDidMount(){
        if(window.localStorage.getItem('user')) {
            this.setState({
                userName: window.localStorage.getItem('user'),
                isLogin: true,
            });
        }
    }
    showRegModal(){
        this.setState({
            regVisible: true,
        });
    }
    showLoginModal(){
        this.setState({
            loginVisible: true,
        });
    }

    handleLogin() {
        var self = this;
        axios.post('/stock/user/login',qs.stringify({
            name: document.getElementsByClassName("input-param")[0].value,
            password: document.getElementsByClassName("input-param")[1].value,
            token: null,

        })).then(function (response) {
            if (response.status == 200) {
                console.log('1',response);
                window.localStorage.setItem('user',document.getElementsByClassName("input-param")[0].value);
                window.location.href =  window.location.origin ;
            }
        }).catch(function (err) {
            console.log(err);
            console.log('222');
        });
        this.setState({
            regVisible: false,
        });
    }

    handleReg() {
        var self = this;
        axios.post('/stock/user/register', {
            name: document.getElementsByClassName("input-param")[0].value,
            password: document.getElementsByClassName("input-param")[1].value,
            money: 200000,
        }).then(function (response) {
            if (response.status == 200) {
                message.info("注册成功！");
            }
        }).catch(function (err) {
            console.log(err);
            console.log('222');
        });
        this.setState({
            regVisible: false,
        });
    }

    handleLoginCan() {
        this.setState({
            loginVisible: false,
        });
    }

    handleRegCan() {
        this.setState({
            regVisible: false,
        });
    }

    handleClick(e) {
        if(e.key === "setting: 2"){
            window.localStorage.removeItem('user');
            window.location.href =  window.location.origin ;
            } else {
                window.location.href = window.location.origin + "/finance";
            }
    }
    render() {
        return (
            <div className="nav">
                <div className="home-menu pure-menu pure-menu-horizontal">
                    <Link className="pure-menu-heading" to="/"></Link>
                    <ul className="pure-menu-list">
                        <li className="pure-menu-item pure-menu-selected"><Link to="/" className="pure-menu-link">首页</Link></li>
                        <li className="pure-menu-item"><Link to="/trade" className="pure-menu-link">交易中心</Link></li>
                        <li className="pure-menu-item"><Link to="/finance" className="pure-menu-link">财务中心</Link></li>
                    </ul>
                    {this.state.isLogin ?
                    <ul className="pure-menu-list pure-menu-list-right">
                        <li className="pure-menu-item nav-userInfo">
                            <Menu
                                mode="horizontal"
                                defaultSelectedKeys={['1']}
                                style={{ lineHeight: '64px' }}
                                onClick = {this.handleClick}
                            >
                                <SubMenu title={<p><Icon type="user" />{window.localStorage.getItem('user')}</p>}>
                                    <Menu.Item key="setting: 1">财务中心</Menu.Item>
                                    <Menu.Item key="setting: 2" >退出</Menu.Item>
                                </SubMenu>
                            </Menu>
                            </li>
                        </ul>
                    :
                    <ul className="pure-menu-list pure-menu-list-right">
                    <li className="pure-menu-item"><Button  className="pure-button pure-button-normal"  onClick={this.showRegModal}>注册</Button></li>
                    <li className="pure-menu-item"><Button className="pure-menu-link"  onClick={this.showLoginModal}>登录</Button></li>
                    </ul>}
                </div>
                <Modal title="注册" visible={this.state.regVisible} onOk={this.handleReg} onCancel={this.handleRegCan}>
                <div className="userInfo"><label> 账户名:</label> <Input  className="input-param" /></div>
                <div className="userInfo"><label>设置密码:</label> <Input  className="input-param" type="password"/></div>
                <div className="userInfo"><label>确认密码:</label> <Input className="input-param" type="password"/></div>
                </Modal>
                <Modal title="登录" visible={this.state.loginVisible} onOk={this.handleLogin} onCancel={this.handleLoginCan}>
                <div className="userInfo"><label> 账户名:</label> <Input  className="input-param"/></div>
                <div className="userInfo"><label> 密码：</label> <Input  className="input-param" type="password"/></div>
                </Modal>
            </div>
        );
    }
}