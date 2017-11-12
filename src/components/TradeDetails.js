import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Tabs, Input, Button, Modal } from 'antd';
import axios from 'axios';
import qs from 'qs';
import Nav from './Nav';
import Footer from './Footer';
import "../styles/tradeDetails.scss";
const TabPane = Tabs.TabPane;

class TradeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailPicture: [],
            detailData: [],
            buyVisible: false,
            sellVisible: false,
            stockcode: '',
            price: '',
            quantity: '',
        };
        // ProjCfg.base.APIServerBaseUrl
        this.handle1 = this.handle1.bind(this);
        this.handleBuyCancel = this.handleBuyCancel.bind(this);
        this.handleBuyOk = this.handleBuyOk.bind(this);
        this.handle2 = this.handle2.bind(this);
        this.handleSellCancel = this.handleSellCancel.bind(this);
        this.handleSellOk = this.handleSellOk.bind(this);
    }
    componentDidMount() {
        var test = this.props.title;
        var self = this;
        axios({
            method: 'get',
            url: '/finance/stock/hs?gid=' + test + '&type=&key=1ed6d144683a32812ebe646f31a8e62e',
        }).then(function (response) {
            if (response.status == 200) {
                console.log('11', response.data.result[0].data);
                self.setState({
                    detailPicture: response.data.result[0].gopicture,
                    detailData: response.data.result[0].data,
                });
            }
        }).catch(function (err) {
            // console.log(err);
            // console.log('222');
        });
    }

    handle1() {
        this.setState({
            stockcode: document.getElementsByClassName("input-param")[0].value,
            price: document.getElementsByClassName("input-param")[1].value,
            quantity: document.getElementsByClassName("input-param")[2].value,
            buyVisible: true,
        });
    }

    handle2() {
        this.setState({
            stockcode: document.getElementsByClassName("input-param")[3].value,
            price: document.getElementsByClassName("input-param")[4].value,
            quantity: document.getElementsByClassName("input-param")[5].value,
            sellVisible: true,
        });
    }

    handleBuyOk(){
        axios.post('/stock/order/add', qs.stringify({
            stockcode: document.getElementsByClassName("input-param")[0].value,
            price: document.getElementsByClassName("input-param")[1].value,
            quantity: document.getElementsByClassName("input-param")[2].value,
            belong: window.localStorage.getItem('user'),
            type: 'buy',
        })).then(function (response) {
            if (response.status == 200) {
                alert("委托已提交");
            }
        }).catch(function (err) {
            console.log(err);
            console.log('222');
        });
        console.log(document.getElementsByClassName("input-param"));
        this.setState({
            buyVisible: false,
        });
       
    }

    handleSellOk(){
        axios.post('/stock/order/add', qs.stringify({
            stockcode: document.getElementsByClassName("input-param")[3].value,
            price: document.getElementsByClassName("input-param")[4].value,
            quantity: document.getElementsByClassName("input-param")[5].value,
            belong: window.localStorage.getItem('user'),
            type: 'sell',
        })).then(function (response) {
            if (response.status == 200) {
                alert("委托已提交");
            }
        }).catch(function (err) {
            console.log(err);
            console.log('222');
        });
        console.log(document.getElementsByClassName("input-param"));
        this.setState({
            sellVisible: false,
        });
       
    }

    handleBuyCancel(){
        this.setState({
            buyVisible: false,
        });
        console.log('aaaa');
    }


    handleSellCancel(){
        this.setState({
            sellVisible: false,
        });
        console.log('aaaa');
    }
    render() {
        return (
            <div className="tradeDetails">
                <Nav />
                <div className="content content-detail">
                    <div className="kInfo">
                        <h1>交易详情</h1>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="分时k线" key="1">
                                <div>
                                    {<img src={this.state.detailPicture.minurl} alt="min-k"></img>}
                                </div>
                            </TabPane>
                            <TabPane tab="日k线图" key="2">
                                <div>
                                    {<img src={this.state.detailPicture.dayurl} alt="min-k"></img>}
                                </div>
                            </TabPane>
                            <TabPane tab="周k线图" key="3">
                                <div>
                                    {<img src={this.state.detailPicture.weekurl} alt="min-k"></img>}
                                </div>
                            </TabPane>
                            <TabPane tab="月k线图" key="4">
                                <div>
                                    {<img src={this.state.detailPicture.monthurl} alt="min-k"></img>}
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                    <div className="stockTrade">
                        <h2>{this.state.detailData.name + '(' + this.state.detailData.gid + ')'}</h2>
                        <div className="info">
                            <label>最新价</label>
                            <p>{this.state.detailData.nowPri}</p>
                        </div>
                        <div className="info">
                            <label>今日最高价</label>
                            <p>{this.state.detailData.todayMax}</p>
                        </div>
                        <div className="info">
                            <label>今日最低价</label>
                            <p>{this.state.detailData.todayMin}</p>
                        </div>
                        <div className="info">
                            <label>成交量</label>
                            <p>{this.state.detailData.traNumber}</p>
                        </div>
                        <div className="info">
                            <label>成交金额</label>
                            <p>{this.state.detailData.traAmount}</p>
                        </div>
                        <div className="info">
                            <label>今日开盘价</label>
                            <p>{this.state.detailData.todayStartPri}</p>
                        </div>
                        <div className="info">
                            <label>昨日收盘价</label>
                            <p>{this.state.detailData.yestodEndPri}</p>
                        </div>
                    </div>
                </div>
                <div className="content content-buy">
                    <div>
                        <h2>买入</h2>
                        <ul className="buy">
                            <li>
                                <span>股票代码</span>
                                <Input className="input-param" />
                            </li>
                            <li>
                                <span>买入价</span>
                                <Input className="input-param" />
                            </li>
                            <li>
                                <span>买入量</span>
                                <Input className="input-param" />
                            </li>
                            <li>
                                <span>手续费</span>
                                <p>0.02% (成交才收，撤单退回)</p>
                            </li>
                            <li>
                                <Button type="primary" onClick={this.handle1}>买入</Button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2>卖出</h2>
                        <ul className="buy">
                            <li>
                                <span>股票代码</span>
                                <Input className="input-param" />
                            </li>
                            <li>
                                <span>卖出价</span>
                                <Input className="input-param" />
                            </li>
                            <li>
                                <span>卖出量</span>
                                <Input className="input-param" />
                            </li>
                            <li>
                                <span>手续费</span>
                                <p>0.02% (成交才收，撤单退回)</p>
                            </li>
                            <li>
                                <Button type="primary" onClick={this.handle2}>卖出</Button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2>买卖五档</h2>
                        <ul className="five">
                            <li className="five-title">
                                <span>档位</span>
                                <span>卖出价</span>
                                <span>数量</span>
                            </li>
                            <li>
                                <span>卖五</span>
                                <span>{this.state.detailData.sellFivePri}</span>
                                <span>{this.state.detailData.sellFive}</span>
                            </li>
                            <li>
                                <span>卖四</span>
                                <span>{this.state.detailData.sellFourPri}</span>
                                <span>{this.state.detailData.sellFour}</span>
                            </li>
                            <li>
                                <span>卖三</span>
                                <span>{this.state.detailData.sellThreePri}</span>
                                <span>{this.state.detailData.sellThree}</span>
                            </li>
                            <li>
                                <span>卖二</span>
                                <span>{this.state.detailData.sellTwoPri}</span>
                                <span>{this.state.detailData.sellTwo}</span>
                            </li>
                            <li className="end">
                                <span>卖一</span>
                                <span>{this.state.detailData.sellOnePri}</span>
                                <span>{this.state.detailData.sellOne}</span>
                            </li>
                            <li className="five-title">
                                <span>档位</span>
                                <span>买出价</span>
                                <span>数量</span>
                            </li>
                            <li>
                                <span>买一</span>
                                <span>{this.state.detailData.buyOnePri}</span>
                                <span>{this.state.detailData.buyOne}</span>
                            </li>
                            <li>
                                <span>买二</span>
                                <span>{this.state.detailData.buyTwoPri}</span>
                                <span>{this.state.detailData.buyTwo}</span>
                            </li>
                            <li>
                                <span>买三</span>
                                <span>{this.state.detailData.buyThreePri}</span>
                                <span>{this.state.detailData.buyThree}</span>
                            </li>
                            <li>
                                <span>买四</span>
                                <span>{this.state.detailData.buyFourPri}</span>
                                <span>{this.state.detailData.buyFour}</span>
                            </li>
                            <li className="end">
                                <span>买五</span>
                                <span>{this.state.detailData.buyFivePri}</span>
                                <span>{this.state.detailData.buyFive}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <Footer />
                <div className="weituo">
                    <Modal
                        title="委托买入确认"
                        visible={this.state.buyVisible}
                        onOk={this.handleBuyOk}
                        onCancel={this.handleBuyCancel}
                    >
                        <p>股票代码： {this.state.stockcode}</p>
                        <p>价格： {this.state.price}</p>
                        <p>数量： {this.state.quantity}</p>
                        <p>您是否确认以上委托？</p>
                    </Modal>
                    <Modal
                        title="委托卖出确认"
                        visible={this.state.sellVisible}
                        onOk={this.handleSellOk}
                        onCancel={this.handleSellCancel}
                    >
                        <p>股票代码： {this.state.stockcode}</p>
                        <p>价格： {this.state.price}</p>
                        <p>数量： {this.state.quantity}</p>
                        <p>您是否确认以上委托？</p>
                    </Modal>
                </div>
            </div >
        );
    }
}

TradeDetails.propTypes = {
    title: PropTypes.any,
    detailData: PropTypes.any,
    detailPicture: PropTypes.any,
};

const mapStatetoProps = (state) => ({
    title: state.App.title,
});

export default connect(
    mapStatetoProps,
    null
)(TradeDetails);