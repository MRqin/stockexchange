import React from 'react';
import '../styles/footer.scss';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <div className="footer-link">
                    <ul className="footer-link-list">
                        <li>
                            <a href="/">
                            {<img src={require('../static/images/footlink.png')} alt="official-website"></img>}
                            </a>
                        </li>
                    </ul>
                    <ul className="footer-link-list">
                        <li>
                            <h4>关于我们</h4>
                            <ul>
                                <li><a href="#">公司简介</a></li>
                                <li><a href="#">联系我们</a></li>
                                <li><a href="#">交易费用</a></li>
                                <li><a href="#">更多</a></li>
                            </ul>
                        </li>
                        <li>
                            <h4>新手帮助</h4>
                            <ul>
                                <li><a href="#">注册指南</a></li>
                                <li><a href="#">交易指南</a></li>
                                <li><a href="#">充值指南</a></li>
                                <li><a href="#">更多</a></li>
                            </ul>
                        </li>
                        <li>
                            <h4>下载中心</h4>
                            <ul>
                                <li>人傻钱多app下载</li> 
                                <li>更多</li> 
                            </ul>
                        </li>
                        <li> 
                            <h4>市场合作</h4>
                            <ul>
                                <li>邮箱：market@renshaqianduo.com</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <p className="warning"> 股市有风险，投资需谨慎。人傻钱多网温馨提醒你，请谨慎选择要投资持有的股票,按照自己的经济能力妥善配置自己的资产。 </p>
                <div className="footer-copyright">
                    <p>版权所有 ©  人傻钱多有限公司 － 浙ICP备*********号-1    浙江省宁波市鄞州区浙江大学软件学院</p>
                </div>
            </div>
        );
    }
}