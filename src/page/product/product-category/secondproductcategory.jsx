import React             				   from 'react';
import ReactDOM          				   from 'react-dom';
import {Link, NavLink} 					   from 'react-router-dom';
import Layout            				   from 'layout/layout.jsx';
import Header           			       from 'layout/header/header.jsx';
import NavSide          				   from 'layout/navside/index.jsx';
import { Row, Col, Table, Tag, Space}      from 'antd';
import { Pagination, Button } 			   from 'antd';
import Product        					   from 'service/productservice.jsx';
import CommonUtil     					   from 'util/commonutil.jsx';
import ModalTool     					   from './categorymodal.jsx';
import 'page/product/index.scss'
const commonutil 	= new CommonUtil();
const product       = new Product();


class SecondProductCategoryPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			pageNum 	    : 1,
			data   			: [],
			categoryId      : this.props.match.params.pcateid
		}	
	}

	componentDidMount(){
		this.loadProductList();
	}

	loadProductList(){
		product.requestProductCategory(this.state.categoryId).then(res=>{
			let data = res.map((item,index)=>{
				return(
					{
						'key'	  	:index,
						'id'	    :item.id, 
						'name'   	:item.name
					}
				)
				
			});
			
			this.setState({
				data 			: data
			});
		},err=>{
			commonutil.errorTips();
		});
	}

	onPageChange(num){
		this.setState({
			pageNum: num
		},()=>{
			this.loadProductList()
		});	
	}



	render(){

		const title = [
		    {
		      title: '品类Id',
		      dataIndex: 'id',
		     // render: text => <a>{text}</a>,
		    },
		    {
		      title: '品类名称',
		      dataIndex: 'name',
		    },
		    {
		      title: '操作',
		      dataIndex: '',
		      render:(text,record)=>
			      (
			      	<div>
			      		<ModalTool cateid={record.id}/>
			     	</div>
			      		
			      )     
			}
  		]
	
		return(
			<div>
				<Header/>
				<Row>
					<Col span={7}>
						<NavSide/>
					</Col>
					<Col offset={1} span={16}>
						<div >
								<div className="subpageTitle">品类列表</div>
								<br/>
								<div>上级品类ID:{this.state.categoryId}</div>
							{/*列表区域*/}
							<div  className="thispagination">
								<Table columns={title}  dataSource={this.state.data}/>
							</div>
						</div>
					</Col>
				</Row>
			</div>		
			)		
	}
}

export default SecondProductCategoryPage;