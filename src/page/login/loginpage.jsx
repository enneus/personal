import React 												from 'react';
import { Input, Space, Button, Row, Col} 				    from 'antd';
import { UserOutlined,EyeInvisibleOutlined, EyeTwoTone }    from '@ant-design/icons';
import CommonUtil   										from 'util/commonutil.jsx';
import User         										from 'service/userservice.jsx';
import './loginpage.scss';
const commonutil = new CommonUtil();
const user       = new User();

class LoginPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: ''
		}
	}

	onValueChange(e){
		let inputvalue = e.target.value 
		let inputname  = e.target.name;
		this.setState({
			[inputname]: inputvalue
		})
		
	}

	onSubmit(){
		let loginInfo={
			username: this.state.username,
			password: this.state.password
		}
		user.login(loginInfo).then((res)=>{
			console.log(this);
			commonutil.setStorage('userInfo',res);
			this.props.history.push("/homepage");
			
			
		},(err)=>{
			
		});


	}

	onInputKeyup(e){
		if(e.keyCode === 13){
			this.onSubmit();
		}
	}
	

	render(){
		return(	
			
			<Row>
		      <Col span={6} offset={8}>
		        <div className="UserLogin">
						<div className="logintitle">用户登录入口</div>
						<div className="loginwindow">
							 <Input className="inputwindow" name="username"placeholder="用户名" prefix={<UserOutlined />} 
											 onKeyUp={e=>{this.onInputKeyup(e)}}
											 onChange={e=>{this.onValueChange(e)}
											 }
							 />
						     <Input.Password className="inputwindow"
						     				 name="password"						     	  
							      			 placeholder="请输入密码"
							      			 iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
							      			 onKeyUp={e=>{this.onInputKeyup(e)}}
							      			 onChange={e=>{this.onValueChange(e)}}
							 />	
							 <br/>
							 <div className="loginbtnstyle">
							 	<Button type="primary"  block className="loginbtn" onClick={(e)=>{
							 	this.onSubmit(e)}} >
		      					登录
		    					</Button>
							 </div>				 
	    				</div>
				</div>
		      </Col>
   			</Row>
			
		)
	}
}

export default LoginPage;