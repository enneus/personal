import React             				   from 'react';
import ReactDOM          				   from 'react-dom';
import Layout            				   from 'layout/layout.jsx';
import Header           			       from 'layout/header/header.jsx';
import NavSide          				   from 'layout/navside/index.jsx';
import { Row, Col, Table, Tag, Space}      from 'antd';
import { Pagination } 					   from 'antd';
import User         from 'service/userservice.jsx';
import CommonUtil   from 'util/commonutil.jsx';
const commonutil = new CommonUtil();
const user       = new User();


class UserInfo extends React.Component{
	constructor(props){
		super(props);
		this.state={
			pageNum: 1,
			List   : [],
			data   : []
		}	
	}

	componentDidMount(){
		this.loadUserList();
	}

	loadUserList(){
		user.requestUserInfo(this.state.pageNum).then(res=>{
			this.setState(res);
			let data = this.state.list.map((item,index)=>{
				return(
					{
						'key'	  	:index,
						'username'	:item.username, 
						'email'   	:item.email, 
						'phone'   	:item.phone, 
						'updateTime':item.updateTime
					}	
				)		
			});
			this.setState({
				data: data
			})
		},err=>{
			commonutil.errorTips(err);
		});
	}

	onPageChange(num){
		this.setState({
			pageNum: num
		},()=>{
			this.loadUserList()
		});	
	}

	render(){

		const title = [
		    {
		      title: '用户名',
		      dataIndex: 'username',
		      render: text => <a>{text}</a>,
		    },
		    {
		      title: 'email',
		      dataIndex: 'email',
		    },
		    {
		      title: '电话号码',
		      dataIndex: 'phone',
		    },
		    {
		      title: '更新时间',
		      dataIndex: 'updateTime',
		    }
  		];
	
		return(
			<div>
				<Header/>
				<Row>
					<Col span={4}>
						<NavSide history={this.props.history}/>
					</Col>
					<Col span={16}>
						<div >
							<div className="subpageTitle">用户列表</div>
							{/*列表区域*/}
							<div >
								<Table columns={title}  dataSource={this.state.data}  pagination={false}/>
								<br/>
								<Pagination defaultCurrent={1} total={100} onChange={(num)=>{this.onPageChange(num)}}/>
							</div>
						</div>
					</Col>
				</Row>
			</div>	
				
				
			
			)
		
	}
}

export default UserInfo;