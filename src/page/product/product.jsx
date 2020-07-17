import React             				   						from 'react';
import ReactDOM          				   						from 'react-dom';
import {Link, NavLink} 					   						from 'react-router-dom';
import Layout            				   						from 'layout/layout.jsx';
import Header           			       						from 'layout/header/header.jsx';
import NavSide          				   						from 'layout/navside/index.jsx';
import { Row, Col, Table, Tag, Space, Pagination, Button}      	from 'antd';
import Searcher  						   						from './searcher.jsx';
import Product        					   						from 'service/productservice.jsx';
import ProductModal       				   						from './productmodal.jsx';
import CommonUtil     					   						from 'util/commonutil.jsx';
import './index.scss'
const commonutil 	= new CommonUtil();
const product       = new Product();

class ProductPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			list   : [],
			pageNum: 1,
			id     : '1',
			status : 0,
			data   : []
		}	
	}

	componentDidMount(){
		this.loadProductList();
	}

	loadProductList(){
		product.requestProductInfo(this.state.pageNum).then(res=>{
			this.setState(res);
		},err=>{
			_mm.errorTips(err);
		});
	}

	onPageChange(num){
		this.setState({
			pageNum: num
		},()=>{
			this.loadProductList()
		});	
	}

	/*onSubmit(id,currentstatus){
		console.log(currentstatus)
		let newstatus = currentstatus=2 ? 1 : 2;
		currentstatus == 1 ? alert('确认要上架吗？') : alert('确认要下架吗？')
		product.changeProductStatus(id,newstatus).then(res=>{
			commonutil.successTips(res);
			this.loadProductList();
		},err=>{
			commonutil.errorTips(err)
		})

	}*/
	//在父组件处理搜索功能
	getValueFromSearcher(searchType,keyword){
		//console.log('searchType:',searchType, 'keyword:', keyword)
		let result = product.checkSeachValidity(searchType,keyword);
		if(result.status){
			//console.log('searchType:',searchType, 'keyword:', typeof keyword)
			product.searchProduct(searchType,keyword).then(res=>{
				this.setState(res);
			},err=>{
				commonutil.errorTips(err)
			})
		}
		
	}

	getnewstatus(newstatus){
		this.loadProductList();
	}

	onAddItemClicked(){
		window.location.href = "/dist/#/product/save";
	}


	render(){

		const title = [
		    {
		      title: 'id',
		      dataIndex: 'id',
		     // render: text => <a>{text}</a>,
		    },
		    {
		      title: '商品信息',
		      dataIndex: 'name',
		    },
		    {
		      title: '价格',
		      dataIndex: 'price',
		    },
		    {
		      title: '状态',
		      dataIndex: 'status',
		      render:(text,record)=>{
		      	return(
		      		<div>
						<p>{record.status == 2 ? '已下架' : '在售'}</p>
						<ProductModal passId={record.id} passStatus={record.status} passvalue={(newstatus)=>{this.getnewstatus(newstatus)}}/>
					</div>
		      		)
		      }
	       		
		      
		    },
		    {
		      title: '操作',
		      dataIndex: '',
		      render:(text,record)=>
			      (
			      	<div>
			      		<Link to={'/product/detail' + record.id} >详情</Link>  <Link to={'/product/edit' + record.id} >编辑</Link>
			     	</div>
			      		
			      )     
			}
  		]
 
		return(
			<div>
				<Header/>
				<Row>
					<Col span={4}>
						<NavSide history={this.props.history}/>
					</Col>
					<Col offset={1} span={15}>
						
						<div className="subpageTitle">商品列表</div>
						<div className="searchandadd">		
							{/*搜索区域*/}	
							<Row>
								<Col ><Searcher passValuetoParentComponent={(searchType,keyword)=>{this.getValueFromSearcher(searchType,keyword)}}/></Col>
								<Col offset={3}>
									<div className="paraddbtn">
										<Button className="addbtn" onClick={e=>{this.onAddItemClicked()}}>添加商品</Button>
									</div>
								</Col>
							</Row>	
						</div>		
							{/*列表区域*/}
							<div >
								<Table columns={title}  dataSource={this.state.list}  rowKey={record => record.id} pagination={false} />
								<br/>
								<Pagination defaultCurrent={1} total={100} onChange={(num)=>{this.onPageChange(num)}} />
							</div>
					</Col>
				</Row>
			</div>		
			)		
	}
}

export default ProductPage;