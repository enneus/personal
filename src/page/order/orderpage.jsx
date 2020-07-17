import React             				   			   from 'react';
import ReactDOM          				   			   from 'react-dom';
import {Link, NavLink} 					   			   from 'react-router-dom';
import Layout            				   			   from 'layout/layout.jsx';
import Header           			       			   from 'layout/header/header.jsx';
import NavSide          				   			   from 'layout/navside/index.jsx';
import Order         					   			   from 'service/orderservice.jsx';
import CommonUtil   								   from 'util/commonutil.jsx';
import { Row, Col, Table, Tag, Space, Pagination}      from 'antd';
const commonutil = new CommonUtil();
const order      = new Order();


class OrderPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			pageNum: 1,
		}	
	}

	componentDidMount(){
		this.loadOrderList();

	}

	loadOrderList(){
		order.requestOrderInfo(this.state.pageNum).then(res=>{
			this.setState(res)
		},err=>{
			commonutil.errorTips(err);
		});

	}

	onPageChange(num){
		this.setState({
			pageNum: num
		},()=>{
			this.loadOrderList()
		});	
	}


	render(){

		const title = [
		    {
		      title: '订单号',
		      dataIndex: 'orderNo',
		      //render: text => <a>{text}</a>,
		    },
		    {
		      title: '收件人',
		      dataIndex: 'receiverName',
		    },
		    {
		      title: '支付状态',
		      dataIndex: 'statusDesc',
		    },
		    {
		      title: '支付金额',
		      dataIndex: 'payment',
		    },
		    {
		      title: '支付时间',
		      dataIndex: 'createTime',
		    },
		    {
		      title: '订单详情',
		      render: (text,record)=>{
		      	return(
		      		<Link to={'/orderinfo/'+ record.orderNo}>详情</Link>
		      		) 	
		      }
		    }
  		];
		//console.log(this.state.List)
  		//const data = this.state.list
	
		return(
			<div>
				<Header/>
				<Row>
					<Col span={4}>
						<NavSide history={this.props.history}/>
					</Col>
					<Col offset={1} span={16}>
						<div >
							<div className="subpageTitle">订单列表</div>
							{/*列表区域*/}
							<div >
								<Table columns={title}  dataSource={this.state.list} rowKey={(record) => record.orderNo}/>
							</div>
							<br/>
								<Pagination defaultCurrent={1} total={100} onChange={(num)=>{this.onPageChange(num)}}/>
						</div>
					</Col>
				</Row>
			</div>	
				
				
			
			)
		
	}
}

export default OrderPage;