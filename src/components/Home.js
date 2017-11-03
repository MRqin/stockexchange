import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Nav from './Nav';
import axios from 'axios';
import '../styles/home.scss';

import { Form, Input, Button, Row, Col, message, Tabs } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shangzhengData: [],
            shenzhengData: [],
<<<<<<< HEAD
=======
            hengshengData: [],
>>>>>>> 8f46c8891900773dfb53f11e880298b425456b64
        };
        // ProjCfg.base.APIServerBaseUrl
    }
    componentDidMount() {
        var self = this;
        axios({
            method: 'get',
            url: '/finance/stock/hs?gid=&type=0&key=1ed6d144683a32812ebe646f31a8e62e'
        }).then(function (response) {
            console.log('response', response);
            if (response.status == 200) {
                console.log('result', response.data.result);
                self.setState({
                    shangzhengData: response.data.result,
                });
            }
        }).catch(function (err) {
            // console.log(err);
            // console.log('222');
        });


        // jsonp('http://web.juhe.cn:8080/finance/stock/hs?gid=&type=0&key=1ed6d144683a32812ebe646f31a8e62e', null, function (err, data) {
        //     if (err) {
        //     //   console.error(err.message);
        //     } else {
        //     //   console.log(data);
        //     }
        //   });
    }

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
                                    <tr>
                                        <td>{this.state.shangzhengData.dealNum}</td>
                                        <td>{this.state.shangzhengData.dealPri}</td>
                                        <td>{this.state.shangzhengData.highPri}</td>
                                        <td>{this.state.shangzhengData.lowpri}</td>
                                        <td>{this.state.shangzhengData.increPer}</td>
                                        <td>{this.state.shangzhengData.increase}</td>
                                        <td>{this.state.shangzhengData.nowpri}</td>
                                        <td>{this.state.shangzhengData.openPri}</td>
                                        <td>{this.state.shangzhengData.yesPri}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </TabPane>
                        <TabPane tab="深证指数" key="2">
<<<<<<< HEAD
                        
                        </TabPane>
                        <TabPane tab="恒生指数" key="3"></TabPane>
=======
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
                                    <tr>
                                        <td>{this.state.shenzhengData.dealNum}</td>
                                        <td>{this.state.shenzhengData.dealPri}</td>
                                        <td>{this.state.shenzhengData.highPri}</td>
                                        <td>{this.state.shenzhengData.lowpri}</td>
                                        <td>{this.state.shenzhengData.increPer}</td>
                                        <td>{this.state.shenzhengData.increase}</td>
                                        <td>{this.state.shenzhengData.nowpri}</td>
                                        <td>{this.state.shenzhengData.openPri}</td>
                                        <td>{this.state.shenzhengData.yesPri}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </TabPane>
                        <TabPane tab="恒生指数" key="3">
                            <table className="pure-table">
                                <tbody>
                                    <tr>
                                        <td>成交额</td>
                                        <td>涨跌额</td>
                                        <td>涨跌幅</td>
                                        <td>最高价</td>
                                        <td>最低价</td>
                                        <td>前收盘价</td>
                                        <td>开盘价</td>
                                        <td>最新价</td>
                                    </tr>
                                    <tr>
                                        <td>{this.state.hengshengData.traAmount}</td>
                                        <td>{this.state.hengshengData.uppic}</td>
                                        <td>{this.state.hengshengData.limit}</td>
                                        <td>{this.state.hengshengData.maxpri}</td>
                                        <td>{this.state.hengshengData.minpri}</td>
                                        <td>{this.state.hengshengData.formpri}</td>
                                        <td>{this.state.hengshengData.openpri}</td>
                                        <td>{this.state.hengshengData.lastestpri}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </TabPane>
>>>>>>> 8f46c8891900773dfb53f11e880298b425456b64
                    </Tabs>
                </div>
                <div className="content content-fupai" >
                    <h2>停复牌及新上市股票</h2>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="停牌股票" key="1">
                            <table className="pure-table">
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                    </tr>
                                </tbody>
                            </table>
                        </TabPane>
                        <TabPane tab="复牌股票" key="2"></TabPane>
                        <TabPane tab="首发上市股票" key="3"></TabPane>
                    </Tabs>
                </div>
                <div className="content content-baozhang">
                    <h3>专业的安全保障</h3>
                    <ul>
                        <li>
                            <img src={require("../static/images/safe1.png")} alt="safe"></img>
                            <p>系统可靠</p>
                        </li>
                        <li>
                            <img src={require("../static/images/safe2.png")} alt="safe"></img>
                            <p>资金安全</p>
                        </li>
                        <li>
                            <img src={require("../static/images/safe3.png")} alt="safe"></img>
                            <p>快捷方便</p>
                        </li>
                        <li>
                            <img src={require("../static/images/safe4.png")} alt="safe"></img>
                            <p>服务专业</p>
                        </li>
                    </ul>
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