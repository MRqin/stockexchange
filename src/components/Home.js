import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Nav from './Nav';
import '../styles/home.scss';
import { Form, Input, Button, Row, Col, message, Tabs } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class Home extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            WrapperCol: {
                span: 24,
            },
        };
        return (
            <div id="home">
                <Nav />
                <div className="content content-intro">
                    <div className="login-box">
                        <h5 className="black">登录</h5>
                        <Form onSubmit={this.handleSubmit}>
                            <label>账户名</label>
                            <FormItem {...formItemLayout} >
                                {getFieldDecorator('userName', {
                                    rules: [
                                        {
                                            required: true, message: '手机号不能为空',
                                        }, {
                                            validator: this.checkPhone,
                                        }],
                                    validateTrigger: 'onBlur',
                                })
                                    (
                                    <Input placeholder="手机号" />
                                    )}
                            </FormItem>
                            <label>密码</label>
                            <Link to="/log/pwd" className="login-form-forgot" >忘记密码？</Link>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: true, message: '密码不能为空',
                                    }],
                                })(
                                    <Input type="password" />
                                    )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit">提交</Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
                <div className="content content-dangri">
                    <h2>重要指数</h2>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="上证指数" key="1">
                        <table className="pure-table">
                            <tbody>
                                <tr>
                                    <td>成交量</td>
                                    <td>成交额</td>
                                    <td>最高价</td>
                                    <td>最低价</td>
                                    <td>跌涨百分比</td>
                                    <td>跌涨幅</td>
                                    <td>当前价格</td>
                                    <td>今日开盘价</td>
                                    <td>昨日收盘价</td>
                                </tr>
                            </tbody>
                        </table>
                        </TabPane>
                        <TabPane tab="深证指数" key="2"></TabPane>
                        <TabPane tab="恒生指数" key="3"></TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    form: PropTypes.any,
};

const HomePage = Form.create()(Home);
export default HomePage;