import React             				from 'react';
import ReactDOM          				from 'react-dom';
import Header           				from 'component/layout/header/header.jsx';
import { Row, Col, Button, Table}       from 'antd';
import Order        					from 'service/orderservice.jsx';
import CommonUtil     		    		from 'util/commonutil.jsx';
import Selector     		    		from 'util/selector.jsx';
import 'page/order/index.scss'

const commonutil 	= new CommonUtil();
const order         = new Order();


class OrderDetailPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			orderNo    			:this.props.match.params.ono,
			receiver   			: '',
			statusDesc 			: '',
			paymentTypeDesc     :'',
			payment      		:'',
			subImages  			: [],
			imageHost  			: '',
			mainurl    			: [],
			createTime     		: '',
			list                : []
		}
	}

	componentDidMount(){
		this.loadOrderDetail();
		
	
	}

	loadOrderDetail(){
		order.requestOrderDetail(this.state.orderNo).then(res=>{
			/*let curl;
			res.subImages.split(',').map(url=>{
				 curl = res.imageHost + url;
				 this.state.mainurl.push(curl);		
			});
			this.setState(this.state.mainurl);*/
			this.setState(res)
			console.log(res)
			console.log(this.state.orderItemVoList)
		},err=>{
			commonutil.errorTips(err)
		  }
		);
		
	}


	

	render(){
		const title = [
		    {
		      title: '商品图片',
		      //dataIndex: 'this.state.imageHost + productImage',
		      render: (text,record) => <img className="orderdetailimg" src={this.state.imageHost + record.productImage}></img>,
		    },
		    {
		      title: '商品信息',
		      dataIndex: 'productName',
		    },
		    {
		      title: '单价',
		      dataIndex: 'currentUnitPrice',
		    },
		    {
		      title: '数量',
		      dataIndex: 'quantity',
		    },
		    {
		      title: '合计',
		      dataIndex: 'totalPrice',
		    }
		    
  		];

		//console.log(this.state)
		return(
			<div>
				<Header/>
				<div id="wrapper">
					<div className="subpageTitle_detail">订单详情</div>
					<div className="detailform">
						<Row>
							<Col span={1}>
								<label className="formtitle">订单号</label>
							</Col>
							<Col span={4}>
								<div className="formvalue">{this.state.orderNo}</div>
							</Col>
						</Row>	
						<br/>
						<Row>
							<Col span={1}>
								<label className="formtitle">收件人</label>
							</Col>
							<Col span={4}>
								<div className="formvalue">{this.state.receiverName}</div>
							</Col>
						</Row>

						<br/>
						<Row>
							<Col span={1}>
								<label className="formtitle">订单状态</label>
							</Col>
							<Col span={4}>
								<div className="formvalue">{this.state.statusDesc}</div>
							</Col>
						</Row>	

						<br/>
						<Row>
							<Col span={1}>
								<label className="formtitle">支付方式</label>
							</Col>
							<Col span={4}>
								<div className="formvalue">{this.state.paymentTypeDesc}</div>
							</Col>
						</Row>		

						<br/>
						<Row>
							<Col span={1}>
								<label className="formtitle">订单金额</label>
							</Col>
							<Col span={4}>
								<div className="formvalue">{this.state.payment} 元</div>
							</Col>
						</Row>
						<br/>
						
						<Row>
							<Col span={1}>
								<label className="formtitle">创建时间</label>
							</Col>
							<Col span={8}>
								<div className="formvalue">{this.state.createTime}</div>
							</Col>
						</Row>

						<br/>
						<Row>
							<Col span={1}>
								<label className="formtitle">商品图片</label>
							</Col>
							<Col span={22}>						
								<div>
                  					 <Table columns={title} dataSource={this.state.orderItemVoList} pagination={false}/>    
              					</div>
							</Col>
						</Row>
					</div>
				</div>
				
			</div>
			)
		
	}
}

export default OrderDetailPage;