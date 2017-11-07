import React from 'react';
import '../styles/header.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Icon, Modal, Button} from 'antd';
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
        };
        this.showLoginModal = this.showLoginModal.bind(this);
        this.showRegModal = this.showRegModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLoginCan = this.handleLoginCan.bind(this);
        this.handleRegCan = this.handleRegCan.bind(this);
        this.handleReg = this.handleReg.bind(this);
        // ProjCfg.base.APIServerBaseUrl
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
        this.setState({
            loginVisible: false,
        });
    }

    handleReg() {
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
                    <ul className="pure-menu-list pure-menu-list-right">
                    <li className="pure-menu-item"><Button  className="pure-button pure-button-normal"  onClick={this.showRegModal}>注册</Button></li>
                    <li className="pure-menu-item"><Button className="pure-menu-link"  onClick={this.showLoginModal}>登录</Button></li>
                    </ul>
                </div>
                <Modal title="注册" visible={this.state.regVisible} onOk={this.handleReg} onCancel={this.handleRegCan}>
                </Modal>
                <Modal title="登录" visible={this.state.loginVisible} onOk={this.handleLogin} onCancel={this.handleLoginCan}>
                </Modal>
            </div>
        );
    }
}