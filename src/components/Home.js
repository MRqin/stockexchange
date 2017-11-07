import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import axios from 'axios';
import '../styles/home.scss';
import { Form, Input, Button, Row, Col, message, Tabs, Table } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const columns1 = [{
    title: '停牌股票代码',
    dataIndex: 'code',
    width: 300,
}, {
    title: '停牌股票名称',
    dataIndex: 'name',
    width: 300,
}, {
    title: '停牌原因',
    dataIndex: 'reason',
    width: 400,
}];
const columns2 = [{
    title: '复牌股票代码',
    dataIndex: 'code',
    width: 100,
}, {
    title: '复牌股票名称',
    dataIndex: 'name',
    width: 100,
}, {
    title: '复牌原因',
    dataIndex: 'reason',
    width: 100,
}];
const columns3 = [{
    title: '首发上市股票代码',
    dataIndex: 'code',
    width: 300,
}, {
    title: '首发上市股票名称',
    dataIndex: 'name',
    width: 300,
}, {
    title: '首发上市原因',
    dataIndex: 'reason',
    width: 400,
}];

const columns4 = [{
    title: '增发新股上市股票代码',
    dataIndex: 'code',
    width: 300,
}, {
    title: '增发新股上市股票名称',
    dataIndex: 'name',
    width: 300,
}, {
    title: '增发新股上市原因',
    dataIndex: 'reason',
    width: 400,
}];
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shangzhengData: [],
            shenzhengData: [],
            hengshengData: [],
            stopList: [],
            recoverList: [],
            newStockNetPublishList: [],
            addNewStockNetPublishList: [],
        };
        // ProjCfg.base.APIServerBaseUrl
    }

    getyyyyMMdd() {
        var d = new Date();
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1;
        var curr_year = d.getFullYear();
        String(curr_month).length < 2 ? (curr_month = "0" + curr_month) : curr_month;
        String(curr_date).length < 2 ? (curr_date = "0" + curr_date) : curr_date;
        var yyyyMMdd = curr_year + "" + curr_month + "" + curr_date;
        return yyyyMMdd;
    }
    componentDidMount() {
        var today = this.getyyyyMMdd();
        var self = this;
        axios({
            method: 'get',
            url: '/finance/stock/hs?gid=&type=0&key=1ed6d144683a32812ebe646f31a8e62e'
        }).then(function (response) {
            if (response.status == 200) {
                self.setState({
                    shangzhengData: response.data.result,
                });
            }
        }).catch(function (err) {

        });


        // jsonp('http://web.juhe.cn:8080/finance/stock/hs?gid=&type=0&key=1ed6d144683a32812ebe646f31a8e62e', null, function (err, data) {
        //     if (err) {
        //     //   console.error(err.message);
        //     } else {
        //     //   console.log(data);
        //     }
        //   });
        axios({
            method: 'get',
            url: '/finance/stock/hs?gid=&type=1&key=1ed6d144683a32812ebe646f31a8e62e'
        }).then(function (response) {
            if (response.status == 200) {
                self.setState({
                    shenzhengData: response.data.result,
                });
            }
        }).catch(function (err) {
            // console.log(err);
            // console.log('222');
        });
        axios({
            method: 'get',
            url: '/finance/stock/hk?num=00001&key=1ed6d144683a32812ebe646f31a8e62e'
        }).then(function (response) {
            console.log('response333', response);
            if (response.status == 200) {
                self.setState({
                    hengshengData: response.data.result[0].hengsheng_data,
                });
            }
        }).catch(function (err) {
            console.log(err);
            console.log('222');
        });

        // axios({
        //     method: 'get',
        //     url: 'http://ali-stock.showapi.com/stop-start-divide?date=' + today,
        //     headers: {
        //         'Authorization': 'APPCODE 3441821118114ad3a91145af64dba101',
        //     }
        // }).then(function (response) {
        //     if (response.status == 200) {
        //         console.log(response.data.showapi_res_body);
        //         self.setState({
        //             stopList: response.data.showapi_res_body.stopList,
        //             recoverList: response.data.showapi_res_body.recoverList,
        //             startList: response.data.showapi_res_body.startList,
        //             addNewStockNetPublishList: response.data.showapi_res_body.addNewStockNetPublishList,
        //         });
        //     }
        // }).catch(function (err) {
        //     //    console.log(err.response);
        //     // console.log('222');
        // });
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
                        <h2 >登录</h2>
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
                                <Button type="primary" htmlType="submit">登录</Button>
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
                    </Tabs>
                </div>
                <div className="content content-fupai" >
                    <h2>停复牌及新上市股票</h2>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="停牌股票" key="1">
                            <Table rowKey="code" columns={columns1} dataSource={this.state.stopList} />
                        </TabPane>
                        <TabPane tab="复牌股票" key="2">
                            <Table rowKey="code" columns={columns2} dataSource={this.state.recoverList} />
                        </TabPane>
                        <TabPane tab="首发上市股票" key="3">
                        <Table rowKey="code" columns={columns3} dataSource={this.state.startList} />
                        </TabPane>
                        <TabPane tab="增发新股上市股票" key="4">
                        <Table rowKey="code" columns={columns4} dataSource={this.state.addNewStockNetPublishList} />
                        </TabPane>
                    </Tabs>
                </div>
                {/* <div className="content content-chuquan" >
                    <h2>除权除息或分红转增或退市风险股票</h2>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="除权除息股票" key="1">
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
                        <TabPane tab="分红转增股票" key="2"></TabPane>
                        <TabPane tab="退市风险股票" key="3"></TabPane>
                    </Tabs>
                </div> */}
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
                <div>

                </div>
                <Footer />
            </div >
        );
    }
}

Home.propTypes = {
    form: PropTypes.any,
};

const HomePage = Form.create()(Home);
export default HomePage;