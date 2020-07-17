import React             				from 'react';
import ReactDOM          				from 'react-dom';
import Header           				from 'component/layout/header/header.jsx';
import { Row, Col, Input, Button}     	from 'antd';
import Product        					from 'service/productservice.jsx';
import CommonUtil     		    		from 'util/commonutil.jsx';
import Selector     		    		from 'util/selector.jsx';
import Uploader     		    	    from 'util/fileuploader/fileuploader.jsx';
const commonutil 	= new CommonUtil();
const product       = new Product();


class ProductEditPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			id:this.props.match.params.pid,
			name       		: '',
			subtitle   		: '',
			categoryId 		:  0,
			price      		: '',
			stock      		: '',
			subImages  		: [],
			imageHost  		: '',
			mainImage  		: [],
			detail     		: '',
			categoryName    : [],
			wholeurl    	: [],
			parentCategoryId:  0,
		}
	}

	componentDidMount(){
		this.loadProductDetail();
		
	
	}
	//拿到最初编辑页面数据
	loadProductDetail(id){	
		product.requestProductDetail(this.state.id).then(res=>{
			let curl;
			res.subImages.split(',').map(url=>{
				 curl = res.imageHost + url;
				 this.state.wholeurl.push(curl);		
			});
			this.setState(this.state.wholeurl);
			this.setState(res);	
			//console.log(typeof this.state.subImages)
		},err=>{
			commonutil.errorTips(err)
		  }
		);
		
	}

	thisPageGetId(categoryId, parentCategoryId){
		console.log('categoryId:', categoryId, 'parentCategoryId:', parentCategoryId)
		this.setState({
			categoryId      :categoryId,
			parentCategoryId:parentCategoryId
		})
		
	}
	//提交表单
	onSubmit(){
		let updatedata = {
			categoryId: this.state.categoryId,
			name      : this.state.name,
			subtitle  : this.state.subtitle,
			subImages : this.state.subImages,
			detail    : this.state.detail,
			price     : this.state.price,
			stock     : this.state.stock,
			status    : this.state.status,
			id        : this.state.id
		}
		console.log(updatedata)
		product.updateProduct(updatedata).then(res=>{
			alert(res);
			this.loadProductDetail();
		},err=>{
			commonutil.errorTips(err);
		})
	}
	//从uploader组件拿到uri数组并转成string
	getURLFromUploader(uri){
		let ur = uri.join(',');
		//let finaluri = this.state.subImages + ur;
		
		this.setState({
			subImages: ur
		})
	}
	
	onValueChange(e){
		let name = e.target.name;
		let value= e.target.value;
		this.setState({
			[name] : value
		})
	}



	render(){
		return(
			<div>
				<Header/>
				<div id="wrapper">
					<div className="subpageTitle_detail">商品编辑</div>
					<div className="detailform">
						<Row>
							<Col span={2}>
								<label className="formtitle">商品名称</label>
							</Col>
							<Col span={8}>
								<Input value={this.state.name} name="name"onChange={e=>{this.onValueChange(e)}}/>
							</Col>
						</Row>	
						<br/>
						<Row>
							<Col span={2}>
								<label className="formtitle">商品描述</label>
							</Col>
							<Col span={4}>
								<Input value={this.state.subtitle} name="subtitle" onChange={e=>{this.onValueChange(e)}}/>
							</Col>
						</Row>

						<br/>
						<Row>
							<Col span={2}>
								<label className="formtitle">所属分类</label>
							</Col>
							<Col span={22}>
								<Selector
										  onCategoryChange={(categoryId, parentCategoryId)=>{this.thisPageGetId(categoryId, parentCategoryId)}}/>
							</Col>
						</Row>	

						<br/>
						<Row>
							<Col span={2}>
								<label className="formtitle">商品价格</label>
							</Col>
							<Col span={4}>
								<input value={this.state.price + ' 元'} name="price" onChange={e=>{this.onValueChange(e)}}></input>
							</Col>
						</Row>		

						<br/>
						<Row>
							<Col span={2}>
								<label className="formtitle">商品库存</label>
							</Col>
							<Col span={4}>
								<input value={this.state.stock} name="stock" onChange={e=>{this.onValueChange(e)}}></input>
							</Col>
						</Row>

						<br/>
						<Row>
							<Col span={2}>
								<label className="formtitle">商品图片</label>
							</Col>
							<Col span={22}>
								<div className="formvalue">
									<Uploader sendURLBack={(uri)=>{this.getURLFromUploader(uri)}}/>	
									{
										this.state.wholeurl.map((url,index)=>(
												<img className="productdetailedimage" key={index} src={url} />
											)	
									 	)
									}
											 	
								</div>
							</Col>
						</Row>

						<br/>
						<Row>
							<Col span={2}>
								<label className="formtitle">商品详情</label>
							</Col>
							<Col span={8}>

								<Input name="detail" value={this.state.detail} onChange={e=>{this.onValueChange(e)}}></Input>
							</Col>
						</Row>

						<Row>
							<Col span={2}>
								
							</Col>
							<Col span={8}>
								<Button type="primary" onClick={e=>{this.onSubmit(e)}}>
					      			提交
					    		</Button>
					    	</Col>	
						</Row>
											
					</div>
				</div>
				
			</div>
			)
		
	}
}

export default ProductEditPage;