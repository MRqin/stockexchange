import React from 'react';
import '../styles/header.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

export default class Nav extends React.Component {
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
                        <li className="pure-menu-item"><Link to="/log/register" className="pure-button pure-button-normal"  >注册</Link></li>
                        <li className="pure-menu-item"><Link to="/log/login" className="pure-menu-link"  >登录</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}