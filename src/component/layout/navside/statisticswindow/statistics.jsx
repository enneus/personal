import React 																						from 'react';
import {Link, NavLink} 																				from 'react-router-dom';
import { UserSwitchOutlined,StarOutlined, StarFilled, StarTwoTone, ShopOutlined, SolutionOutlined } from '@ant-design/icons'
import User         																				from 'service/userservice.jsx';
import CommonUtil   																				from 'util/commonutil.jsx';
import './index.scss';
const commonutil = new CommonUtil();
const user       = new User();

class StatisticsWindow extends React.Component{
	constructor(props){
		super(props);
		this.state={
			userCount: '',
			productCount:'',
			orderCount:''
		}
	}

	componentDidMount(){
		this.loadUserAmount();
	}

	loadUserAmount(){
		user.requestAllAmount().then(res=>{
			this.setState(res);
		},err=>{
			commonutil.errorTips(err);
		});

	}
	render(){
		return(
			
			<div className="statisticswindow">
				<div className="block">
					<Link to="/userinfo">
						<div className="userblock">
							<div className="iconwindow" >
								<UserSwitchOutlined style={{fontSize:'xx-large'}}/>
							</div>
							<div className="statistictitle" >
								<div className="text">用户数量</div>
							</div>
						</div>
						<div className="showvalue">
							{this.state.userCount}
						</div>
					</Link>
				</div>	
				<div className="block">	
					<Link to="/product" replace>
						<div >
							<div className="iconwindow" >
								<ShopOutlined  style={{fontSize:'xx-large'}}/>
							</div>
							<div className="statistictitle">
								<div className="text">商品数量</div>
							</div>
						</div>
						<div className="showvalue">
							{this.state.productCount}
						</div>
					</Link>
				</div>		
				<div className="block">	
					<Link to="/orderinfo">
						<div >
							<div className="iconwindow" >
								<SolutionOutlined style={{fontSize:'xx-large'}}/>
							</div>
							<div className="statistictitle">
								<div className="text">订单数量</div>
							</div>
						</div>
						<div className="showvalue">
							{this.state.orderCount}
						</div>
					</Link>
				</div>	
			</div>
		)
	}
}

export default StatisticsWindow;