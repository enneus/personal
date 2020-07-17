import React 											from 'react';
import { Input, Space, Button, Row, Col} 				from 'antd';
import { UserOutlined,EyeInvisibleOutlined, EyeTwoTone }from '@ant-design/icons';
import CommonUtil   									from 'util/commonutil.jsx';
import User         									from 'service/userservice.jsx';
import './index.scss';	
const commonutil = new CommonUtil();
const user       = new User();

class UserWindow extends React.Component{
	constructor(props){
		super(props);
		this.state={
			username: commonutil.getStorage('userInfo').username || ''
		}
		
	}

	logout(){
		user.logout().then((res)=>{
			console.log(this)
			this.props.history.push("/login");
			commonutil.removeStorage('userInfo');
		},(err)=>{
			commonutil.errorTips(err);
		});	
	}
	
	render(){	
		return(	
			
				<div >
					<div className="UserBorder">
						<div className="logintitle">用户信息</div>
						<div>
							<div className="userstatus">
								{	
									this.state.username
								 	? <span>欢迎登录, {this.state.username}</span>
								 	: <span>未登录</span>
								}
							</div>
	    				</div>
	    				<Button className="logoutbutton"
							    onClick={e=>this.logout()}
	    				>登出</Button>
					</div>
				</div>
			
		)
	}
}

export default UserWindow;