import React             		from 'react';
import ReactDOM          		from 'react-dom';
import Header           		from 'component/layout/header/header.jsx';
import { Row, Col, Button}      from 'antd';
import Product        			from 'service/productservice.jsx';
import CommonUtil     		    from 'util/commonutil.jsx';
import Selector     		    from 'util/selector.jsx';
import './form.scss';
import './index.scss';

const commonutil 	= new CommonUtil();
const product       = new Product();


class ProductDetailPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			id:this.props.match.params.pid,
			name       : '',
			subtitile  : '',
			price      :'',
			stock      :'',
			subImages  : [],
			imageHost  : '',
			mainurl    : [],
			detail     : ''
		}
	}

	componentDidMount(){
		this.loadProductDetail();
		
	}

	loadProductDetail(id){
	
		product.requestProductDetail(this.state.id).then(res=>{
			let curl;
			res.subImages.split(',').map(url=>{
				 curl = res.imageHost + url;
				 this.state.mainurl.push(curl);		
			});
			this.setState(this.state.mainurl);
			this.setState(res);
			
		},err=>{
			commonutil.errorTips(err)
		  }
		);
		
	}


	

	render(){
		return(
			<div>
				<Header/>
				<div id="wrapper">
					<div className="subpageTitle_detail">商品详情</div>
					<div className="detailform">
						<Row>
							<Col span={2}>
								<label className="formtitle">商品名称</label>
							</Col>
							<Col span={4}>
								<div className="formvalue">{this.state.name}</div>
							</Col>
						</Row>	
						<br/>
						<Row>
							<Col span={2}>
								<label className="formtitle">商品描述</label>
							</Col>
							<Col span={4}>
								<div className="formvalue">{this.state.subtitle}</div>
							</Col>
						</Row>

						<br/>
						<Row>
							<Col span={2}>
								<label className="formtitle">所属分类</label>
							</Col>
							<Col span={22}>
								<Selector />
							</Col>
						</Row>	

						<br/>
						<Row>
							<Col span={2}>
								<label className="formtitle">商品价格</label>
							</Col>
							<Col span={4}>
								<div className="formvalue">{this.state.price} 元</div>
							</Col>
						</Row>		

						<br/>
						<Row>
							<Col span={2}>
								<label className="formtitle">商品库存</label>
							</Col>
							<Col span={4}>
								<div className="formvalue">{this.state.stock} 件</div>
							</Col>
						</Row>

						<br/>
						<Row>
							<Col span={2}>
								<label className="formtitle">商品图片</label>
							</Col>
							<Col span={22}>
								<div className="formvalue">
									{
										this.state.mainurl.map((url,index)=>(
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
								<div className="formvalue" dangerouslySetInnerHTML={{ __html: this.state.detail }}></div>
							</Col>
						</Row>
									
					</div>
				</div>
				
			</div>
			)
		
	}
}

export default ProductDetailPage;