import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Nav from './Nav';
import { Tabs, Table, Icon, Tag, Popconfirm, Input } from 'antd';
import axios from 'axios';
import '../styles/finance.scss';

const TabPane = Tabs.TabPane;

export default class Trade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockPositon: [],
            stockOrder: [],
            stockUser: [],
            stockOrderNew: [],
            stockOrderDone: [],
        };
        this.formatDate = this.formatDate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        // this.revocation = this.revocation.bind(this);
        var that = this;
        this.columns1 = [{
            title: '股票代码',
            dataIndex: 'stockcode',
            key: 'stockcode',
            width: 150,
        }, {
            title: '股票名称',
            dataIndex: 'stockname',
            key: 'stockname',
            width: 150,
        }, {
            title: '股票持仓总数',
            dataIndex: 'total',
            key: 'total',
            width: 150,
        }, {
            title: '可抛股票数量',
            dataIndex: 'available',
            key: 'available',
            width: 150,
        }];
        this.columns2 = [{
            title: '订单ID',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
            width: 100,
            sorter: (a, b) => a.id - b.id,
        }, {
            title: '交易时间',
            dataIndex: 'time',
            key: 'time',
            sorter: true,
            width: 200,
            sorter: (a, b) => a.time - b.time,
            render(text, record, index) {
                return (
                    <p>{that.formatDate(text)}</p>
                );
            },
        }, {
            title: '交易类型',
            dataIndex: 'type',
            key: 'type',
            filters: [
                { text: 'sell', value: 'sell' },
                { text: 'buy', value: 'buy' },
            ],
            width: 150,
            onFilter: (value, record) => record.type.indexOf(value) === 0,
        }, {
            title: '交易股票代码',
            dataIndex: 'stockcode',
            key: 'stockcode',
            width: 150,
        }, {
            title: '交易价格',
            dataIndex: 'price',
            key: 'price',
            sorter: true,
            width: 150,
            sorter: (a, b) => a.price - b.price,
        }, {
            title: '订单数量',
            dataIndex: 'total',
            key: 'total',
            sorter: true,
            width: 150,
            sorter: (a, b) => a.total - b.total,
        }, {
            title: '未完成订单',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 150,
        }, {
            title: '交易状态',
            dataIndex: 'state',
            key: 'state',
            width: 150,
            filters: [
                { text: '交易成功', value: '交易成功' },
                { text: '未完成', value: '未完成' },
            ],
            onFilter: (value, record) => record.state.indexOf(value) === 0,
        }, {
            title: '撤销订单',
            dataIndex: 'delete',
            key: 'delete',
            width: 150,
            render(text, record, index) {
                return (
                    // that.state.dataSource.length > 1 ?
                    // (
                    <Popconfirm title="确认撤销?" onConfirm={() => that.onDelete(record.id)}>
                        <a href="#">撤销</a>
                    </Popconfirm>
                    // ) : null
                );
            }
        },];

        this.columns3 = [{
            title: '订单ID',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
            width: 100,
            sorter: (a, b) => a.id - b.id,
        }, {
            title: '成交时间',
            dataIndex: 'time',
            key: 'time',
            sorter: true,
            width: 200,
            sorter: (a, b) => a.time - b.time,
            render(text, record, index) {
                return (
                    <p>{that.formatDate(text)}</p>
                );
            },
        }, {
            title: '成交类型',
            dataIndex: 'type',
            key: 'type',
            filters: [
                { text: 'sell', value: 'sell' },
                { text: 'buy', value: 'buy' },
            ],
            width: 150,
            onFilter: (value, record) => record.type.indexOf(value) === 0,
        }, {
            title: '股票代码',
            dataIndex: 'stockcode',
            key: 'stockcode',
            width: 150,
        }, {
            title: '订单价格',
            dataIndex: 'price',
            key: 'price',
            width: 150,
        }, {
            title: '成交价格',
            dataIndex: 'averageprice',
            key: 'averageprice',
            sorter: true,
            width: 150,
            sorter: (a, b) => a.averageprice - b.averageprice,
        }, {
            title: '成交数量',
            dataIndex: 'finish',
            key: 'finish',
            sorter: true,
            width: 150,
            sorter: (a, b) => a.finish - b.finish,
        }];

        // ProjCfg.base.APIServerBaseUrl
    }

    // onDelete(index) {
    //     console.log('index', index);
    //     var dataSource = [this.state.stockOrder];
    //     console.log('datasource', dataSource);
    //     dataSource.splice(index, 1);//index为获取的索引，后面的 1 是删除几行
    //     console.log('datasource1', dataSource);
    //     this.setState({ dataSource });
    // }
    onDelete(id) {
        console.log('id',id);
        var this1 = this;
        var dataSource = new Array();
        var dataSource1 = new Array();
        var dataSource2 = new Array();
        dataSource = this1.state.stockOrder;
        console.log('dataSource',dataSource);
        // var a = dataSource.index;
        dataSource1 = dataSource.filter(function (item) {
            // console.log('item.index',item.id);
            // console.log('item',item);
            return item.id !== id;
        }); 
        dataSource2 = dataSource1.filter(function (item) {
            return item.state == "未完成";
        });
        this1.setState({
            stockOrderNew: dataSource2,
        });
        console.log('dataSource2',dataSource2);
        axios({
            method: 'get',
            url: '/stock/order/delete?id=' + id,
        }).then(function (response) {
            // console.log('result', response);
            // if (response.status == 200) {
            //     this1.setState({
            //         stockOrderDel: dataSource1,
            //     });
            // }
        }).catch(function (err) {
        });
        // this1.setState({ 
        //     stockOrderDel : dataSource1,
        //     // stockOrderDel: dataSource.filter(item => item.index !== index) 
        // });
    }

    formatDate(text) {
        // console.log('text', text);
        var d = new Date(parseInt(text) * 1000);
        // console.log('pardate',parseInt(text));
        // console.log('date',d);
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var date = d.getDate();
        var hour = d.getHours();
        var minute = d.getMinutes();
        var second = d.getSeconds();
        var result = year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
        // console.log('year',year);
        // console.log('result',result);
        return result;
    }

    componentDidMount() {
        // var today = this.getyyyyMMdd();
        // var test;
        // test = this.formatDate(1510020806);
        // console.log('test', test);
        var self = this;
        axios({
            method: 'get',
            url: '/stock/position/query?belong='+window.localStorage.getItem('user'),
        }).then(function (response) {
            console.log('111', response);
            if (response.status == 200) {
                self.setState({
                    stockPosition: response.data.data,
                });
            }
        }).catch(function (err) {

        });
        axios({
            method: 'get',
            url: '/stock/user/query?name='+window.localStorage.getItem('user'),
        }).then(function (response) {
            console.log('333', response);
            if (response.status == 200) {
                self.setState({
                    stockUser: response.data.data,
                });
            }
        }).catch(function (err) {
        });
        axios({
            method: 'get',
            url: '/stock/order/query?belong='+window.localStorage.getItem('user'),
        }).then(function (response) {
            console.log('222', response);
            if (response.status == 200) {
                self.setState({
                    stockOrder: response.data.data,
                });
            }
            var stockOrder1 = new Array();
            var stockOrder2 = new Array();
            var stockOrder3 = new Array();
            stockOrder1 = self.state.stockOrder;
            console.log('stockOrder1',stockOrder1);
            stockOrder2 = stockOrder1.filter(function (item) {
                return item.state == "未完成";
            });//筛选出未完成的订单
            stockOrder3 = stockOrder1.filter(function (item) {
                return item.finish != 0;
            });//筛选出已完成的订单
            // console.log('stockOrder2',stockOrder2);
            // console.log('stockOrder3',stockOrder3);
            self.setState({
                stockOrderNew: stockOrder2,
                stockOrderDone: stockOrder3,
            });
        }).catch(function (err) {

        });

    }

    render() {
        return (
            <div className="content content-trade">
                <Nav />
                <br />
                <Tabs tabPosition='left'>
                    <TabPane tab={<span><Icon type="pay-circle-o" />财务中心</span>} key="1">
                        <h1>财务中心</h1>
                        <p>您的可用余额：<Tag>{this.state.stockUser.money}</Tag></p>
                        <br />
                        <br />
                        <Table rowKey="trade" columns={this.columns1} dataSource={this.state.stockPosition} />
                    </TabPane>
                    <TabPane tab={<span><Icon type="solution" />订单中心</span>} key="2">
                        <h1>订单中心</h1><br />
                        <Table rowKey="order" columns={this.columns2} dataSource={this.state.stockOrderNew} />
                    </TabPane>
                    <TabPane tab={<span><Icon type="search" />成交查询</span>} key="3">
                        <h1>成交查询</h1><br />
                        <Table rowKey="deal" columns={this.columns3} dataSource={this.state.stockOrderDone} />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
