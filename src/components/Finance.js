import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Nav from './Nav';
import {Tabs, Table, Icon } from 'antd';
import axios from 'axios';
// import reqwest from 'reqwest';

const TabPane = Tabs.TabPane;
const columns1 = [{
    title: '股票代码',
    dataIndex: 'stockcode',
    key: 'stockcode',
    width: '15%',
  }, {
    title: '股票名称',
    dataIndex: 'stockname',
    key: 'stockname',
    width: '15%',
  }, {
    title: '股票持仓总数',
    dataIndex: 'total',
    key: 'total',
    width: '15%',
  }, {
    title: '可抛股票数量',
    dataIndex: 'available',
    key: 'available',
    width: '15%',
  }];

  const columns2 = [{
    title: '订单ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
    width: '15%',
    sorter: (a, b) => a.id - b.id,
  }, {
    title: '交易时间',
    dataIndex: 'time',
    key: 'time',
    sorter: true,
    width: '15%',
    sorter: (a, b) => a.time - b.time,
  }, {
    title: '交易类型',
    dataIndex: 'type',
    key: 'type',
    filters: [
        { text: 'sell', value: 'sell' },
        { text: 'buy', value: 'buy' },
      ],
    width: '15%',
    onFilter: (value, record) => record.type.indexOf(value) === 0,
  }, {
    title: '交易股票代码',
    dataIndex: 'stockcode',
    key: 'stockcode',
    width: '15%',
  },{
    title: '交易价格',
    dataIndex: 'price',
    key: 'price',
    sorter: true,
    width: '15%',
    sorter: (a, b) => a.price - b.price,
  },{
    title: '订单数量',
    dataIndex: 'total',
    key: 'total',
    sorter: true,
    width: '15%',
    sorter: (a, b) => a.total - b.total,
  },{
    title: '交易状态',
    dataIndex: 'state',
    key: 'state',
    filters: [
        { text: '交易成功', value: '交易成功' },
        { text: '未完成', value: '未完成' },
      ],
    onFilter: (value, record) => record.state.indexOf(value) === 0,
  }];
  
  const columns3 = [{
    title: '订单ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
    width: '15%',
    sorter: (a, b) => a.id - b.id,
  }, {
    title: '成交时间',
    dataIndex: 'time',
    key: 'time',
    sorter: true,
    width: '15%',
    sorter: (a, b) => a.time - b.time,
  }, {
    title: '成交类型',
    dataIndex: 'type',
    key: 'type',
    filters: [
        { text: 'sell', value: 'sell' },
        { text: 'buy', value: 'buy' },
      ],
    width: '15%',
    onFilter: (value, record) => record.type.indexOf(value) === 0,
  }, {
    title: '股票代码',
    dataIndex: 'stockcode',
    key: 'stockcode',
    width: '15%',
  },{
    title: '成交价格',
    dataIndex: 'price',
    key: 'price',
    sorter: true,
    width: '15%',
    sorter: (a, b) => a.price - b.price,
  },{
    title: '订单数量',
    dataIndex: 'total',
    key: 'total',
    sorter: true,
    width: '15%',
    sorter: (a, b) => a.total - b.total,
  }];



export default class Trade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockPositon: [],
            stockOrder: [],
            
        };
        // ProjCfg.base.APIServerBaseUrl
    }

    componentDidMount() {
        // var today = this.getyyyyMMdd();
        var self = this;
        axios({
            method: 'get',
            url: '/stock/position/query?belong=tom'
        }).then(function (response) {
            console.log('111',response);
            if (response.status == 200) {
                self.setState({
                    stockPosition: response.data.data,
                });
            }
        }).catch(function (err) {

        });
        axios({
            method: 'get',
            url: '/stock/order/query?belong=tom'
        }).then(function (response) {
            console.log('222',response);
            if (response.status == 200) {
                self.setState({
                    stockOrder: response.data.data,
                });
            }
        }).catch(function (err) {
        
        });
        // axios({
        //     method: 'get',
        //     url: '/stock/order/query?belong=tom'
        // }).then(function (response) {
        //     console.log('333', response);
        //     if (response.status == 200) {
        //         self.setState({
        //             hengshengData: response.data.result[0].hengsheng_data,
        //         });
        //     }
        // }).catch(function (err) {
        // });
    }

    render() {
        return(
            <div className="content content-trade">
                <Nav />
                <br/>
                    <Tabs tabPosition='left'>
                        <TabPane tab={<span><Icon type="pay-circle-o" />财务中心</span>} key="1">
                            <h1>财务中心</h1><br/>
                            <p style={{fontSize:20}}>您的可用余额： {this.state.stockPosition}</p><br/>
                            <Table rowKey="trade" columns={columns1} dataSource={this.state.stockPosition} />
                        </TabPane>
                        <TabPane tab={<span><Icon type="solution" />订单管理</span>} key="2">
                            <h1>订单管理</h1><br/>
                            <Table rowKey="order" columns={columns2} dataSource={this.state.stockOrder} />
                        </TabPane>
                        <TabPane tab={<span><Icon type="search" />成交查询</span>} key="3">
                            <h1>成交查询</h1><br/>
                            <Table rowKey="deal" columns={columns3} dataSource={this.state.stockOrder} />
                        </TabPane>
                    </Tabs>
            </div>
        );
    }
}
