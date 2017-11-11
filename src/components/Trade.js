import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import {reciveTitle} from '../actions/actions.js';
import axios from 'axios';
import { Tabs, Table, Input } from 'antd';
import Nav from './Nav';
import Footer from './Footer';
import "../styles/trade.scss";
const TabPane = Tabs.TabPane;
const Search = Input.Search;
// const columns1 = [{
//     title: '股票代码',
//     dataIndex: 'symbol',
//     render(text,record,index) {
//         return(
//             <Link to="/trade/details"  >{text}</Link>
//         );
//     } 
// }, {
//     title: '股票名称',
//     dataIndex: 'name',
// }, {
//     title: '最新价',
//     dataIndex: 'trade',
// }, {
//     title: '涨跌额',
//     dataIndex: 'pricechange',
//     sorter: (a,b) => a.pricechange - b.pricechange,
// }, {
//     title: '涨跌幅',
//     dataIndex: 'changepercent',
//     sorter: (a,b) => a.changepercent - b.changepercent,
// }, {
//     title: '昨收',
//     dataIndex: 'settlement',
// }, {
//     title: '今开',
//     dataIndex: 'open',
// }, {
//     title: '最高价',
//     dataIndex: 'high',
// }, {
//     title: '最低价',
//     dataIndex: 'low',
// }, {
//     title: '成交量',
//     dataIndex: 'volume',
//     sorter: (a,b) => a.volume - b.volume,
// }, {
//     title: '成交额',
//     dataIndex: 'amount',
//     sorter: (a,b) => a.amount - b.amount,
// }];


class Trade extends React.Component {
    constructor(props) {
        super(props);

        this.openDetails = this.openDetails.bind(this);
        var that = this;
        this.columns1 = [{
            title: '股票代码',
            dataIndex: 'symbol',
            render(text,record,index) {
                return(
                    <Link to="/trade/details"  onClick={() =>that.openDetails(text)}>{text}</Link>
                    // <a href="#" onClick={() =>that.openDetails(index)}>{text}</a>
                );
            } 
        }, {
            title: '股票名称',
            dataIndex: 'name',
        }, {
            title: '最新价',
            dataIndex: 'trade',
        }, {
            title: '涨跌额',
            dataIndex: 'pricechange',
            sorter: (a,b) => a.pricechange - b.pricechange,
        }, {
            title: '涨跌幅',
            dataIndex: 'changepercent',
            sorter: (a,b) => a.changepercent - b.changepercent,
        }, {
            title: '昨收',
            dataIndex: 'settlement',
        }, {
            title: '今开',
            dataIndex: 'open',
        }, {
            title: '最高价',
            dataIndex: 'high',
        }, {
            title: '最低价',
            dataIndex: 'low',
        }, {
            title: '成交量',
            dataIndex: 'volume',
            sorter: (a,b) => a.volume - b.volume,
        }, {
            title: '成交额',
            dataIndex: 'amount',
            sorter: (a,b) => a.amount - b.amount,
        }];

        this.columns2 = [{
            title: '股票代码',
            dataIndex: 'symbol',
            render(text,record,index) {
                return(
                    <a href="#">{text}</a>
                );
            } 
        }, {
            title: '股票名称',
            dataIndex: 'name',
            render(text,record,index) {
                return(
                    <a href="#">{text}</a>
                );
            } 
        }, {
            title: '最新价',
            dataIndex: 'lasttrade',
        }, {
            title: '涨跌额',
            dataIndex: 'pricechange',
            sorter: (a,b) => a.pricechange - b.pricechange,
        }, {
            title: '涨跌幅',
            dataIndex: 'changepercent',
            sorter: (a,b) => a.changepercent - b.changepercent,
        }, {
            title: '昨收',
            dataIndex: 'prevclose',
        }, {
            title: '今开',
            dataIndex: 'open',
        }, {
            title: '最高价',
            dataIndex: 'high',
        }, {
            title: '最低价',
            dataIndex: 'low',
        }, {
            title: '成交量',
            dataIndex: 'volume',
            sorter: (a,b) => a.volume - b.volume,
        }, {
            title: '成交额',
            dataIndex: 'amount',
            sorter: (a,b) => a.amount - b.amount,
        }];
        
        this.columns3 = [{
            title: '股票代码',
            dataIndex: 'gid',
            render(text,record,index) {
                return(
                    <a href="#">{text}</a>
                );
            } 
        }, {
            title: '股票名称',
            dataIndex: 'name',
            render(text,record,index) {
                return(
                    <a href="#">{text}</a>
                );
            } 
        }, {
            title: '最新价',
            dataIndex: 'nowPri',
        }, {
            title: '涨跌额',
            dataIndex: 'increase',
            sorter: (a,b) => a.pricechange - b.pricechange,
        }, {
            title: '涨跌幅',
            dataIndex: 'increPer',
            sorter: (a,b) => a.changepercent - b.changepercent,
        }, {
            title: '昨收',
            dataIndex: 'yestodEndPri',
        }, {
            title: '今开',
            dataIndex: 'todayStartPri',
        }, {
            title: '最高价',
            dataIndex: 'todayMax',
        }, {
            title: '最低价',
            dataIndex: 'todayMin',
        }, {
            title: '成交量',
            dataIndex: 'traNumber',
            sorter: (a,b) => a.volume - b.volume,
        }, {
            title: '成交额',
            dataIndex: 'traAmount',
            sorter: (a,b) => a.amount - b.amount,
        }];
        
        this.columns4 = [{
            title: '股票代码',
            dataIndex: 'gid',
            render(text,record,index) {
                return(
                    <a href="#">{text}</a>
                );
            } 
        }, {
            title: '股票名称',
            dataIndex: 'name',
            render(text,record,index) {
                return(
                    <a href="#">{text}</a>
                );
            } 
        }, {
            title: '最新价',
            dataIndex: 'lastestpri',
        }, {
            title: '涨跌额',
            dataIndex: 'uppic',
            sorter: (a,b) => a.pricechange - b.pricechange,
        }, {
            title: '涨跌幅',
            dataIndex: 'limit',
            sorter: (a,b) => a.changepercent - b.changepercent,
        }, {
            title: '昨收',
            dataIndex: 'formpri',
        }, {
            title: '今开',
            dataIndex: 'openpri',
        }, {
            title: '最高价',
            dataIndex: 'maxpri',
        }, {
            title: '最低价',
            dataIndex: 'minpri',
        }, {
            title: '成交量',
            dataIndex: 'traNumber',
            sorter: (a,b) => a.volume - b.volume,
        }, {
            title: '成交额',
            dataIndex: 'traAmount',
            sorter: (a,b) => a.amount - b.amount,
        }];
        this.state = {
            shData: [],
            szData: [],
            hkData: [],
            shStock: [],
            hkStock: [],
            hkDisplay: false,
            shDisplay: false,
        };
        this.searchStock = this.searchStock.bind(this);
        this.searchkStock = this.searchkStock.bind(this);
        // ProjCfg.base.APIServerBaseUrl
    }

    componentDidMount() {
        var self = this;
        axios({
            method: 'get',
            url: '/finance/stock/shall?stock=&page=&type=4&key=1ed6d144683a32812ebe646f31a8e62e',
        }).then(function (response) {
            if (response.status == 200) {
                console.log('11',response.data.result);
                self.setState({
                    shData: response.data.result.data,
                });
            }
        }).catch(function (err) {
            // console.log(err);
            // console.log('222');
        });

        axios({
            method: 'get',
            url: '/finance/stock/szall?stock=&page=&type=4&key=1ed6d144683a32812ebe646f31a8e62e',
        }).then(function (response) {
            if (response.status == 200) {
                console.log('11',response.data.result);
                self.setState({
                    szData: response.data.result.data,
                });
            }
        }).catch(function (err) {
            // console.log(err);
            // console.log('222');
        });

        axios({
            method: 'get',
            url: '/finance/stock/hkall?page=&type=4&key=1ed6d144683a32812ebe646f31a8e62e',
        }).then(function (response) {
            if (response.status == 200) {
                console.log('11',response.data.result);
                self.setState({
                    hkData: response.data.result.data,
                });
            }
        }).catch(function (err) {
            // console.log(err);
            // console.log('222');
        });
    }

    openDetails(text) {
        this.props.reciveTitle(text);
        console.log('text',text);
    }

    searchStock(value) {
        var that = this;
        axios({
            method: 'get',
            url: '/finance/stock/hs?gid='+ value + '&type=&key=1ed6d144683a32812ebe646f31a8e62e',
        }).then(function (response) {
            if (response.status == 200) {
                console.log('11',response.data.result[0].data);
                var myArray=new Array();
                myArray.push(response.data.result[0].data);

                that.setState({
                    shStock: myArray,
                    shDisplay: true,
                });
            }
        }).catch(function (err) {
            // console.log(err);
            // console.log('222');
        });
    }

    searchkStock(value) {
        var that = this;
        axios({
            method: 'get',
            url: '/finance/stock/hk?num='+ value + '&key=1ed6d144683a32812ebe646f31a8e62e',
        }).then(function (response) {
            if (response.status == 200) {
                console.log('22',response.data.result[0].data);
                var myArray2=new Array();
                myArray2.push(response.data.result[0].data);

                that.setState({
                    hkStock: myArray2,
                    hkDisplay: true,
                });
            }
        }).catch(function (err) {
            // console.log(err);
            // console.log('222');
        });
    }

    render() {
        return (
            <div >
                <Nav />
                <div className="content content-sh">
                    <h2>沪深股市</h2>
                    <Search className="shSearch" placeholder="股票代码" style={{width:300}} onSearch={this.searchStock} />
                    <div style={this.state.shDisplay === false ? {display: 'flex'} : {display : 'none'}}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="沪股列表" key="1">
                        <Table rowKey="code" columns={this.columns1} dataSource={this.state.shData} />
                        </TabPane>
                        <TabPane tab="深股列表" key="2">
                        <Table rowKey="code2" columns={this.columns1} dataSource={this.state.szData} />
                        </TabPane>
                    </Tabs>
                    </div> 
                    <div className="single" style={this.state.shDisplay === true ? {display: 'flex'} : {display : 'none'}}>
                    <Table rowKey="code3" columns={this.columns3} dataSource={this.state.shStock} />
                    </div>
                </div>
                <div className="content content-hk">
                    <h2>香港股市</h2>
                    <Search className="shSearch" placeholder="股票代码" style={{width:300}} onSearch={this.searchkStock} />
                    <div style={this.state.hkDisplay === false ? {display: 'flex'} : {display : 'none'}}>
                        <Table rowKey="code4" columns={this.columns2} dataSource={this.state.hkData} />
                        </div>
                        <div className="hksingle" style={this.state.hkDisplay === true ? {display: 'flex'} : {display : 'none'}}>
                    <Table rowKey="code5" columns={this.columns4} dataSource={this.state.hkStock} />
                    </div>
                </div>
                <Footer />

            </div>
        );
    }
}

Trade.propTypes = {
    reciveTitle : PropTypes.func,
};
const mapDispatchToProps = ({
    reciveTitle: reciveTitle,
});

export default connect(null, mapDispatchToProps)(Trade);