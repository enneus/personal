import React 								from 'react';
import Selector 							from 'util/selector.jsx';
import {Input, Row, Col, Button, Select} 	from 'antd';
import './index.scss'
const { Option } = Select;
class Searcher extends React.Component{
	constructor(props){
		super(props);
		this.state={
			searchType: '',
			keyword   : ''
		}

	}
	//选中搜索类型数据
	onSearchTypeSelected(searchType){
		//console.log(typeof searchType)
		this.setState({
			searchType: searchType
		})
	}

	onKeywordEntered(e){
		//console.log(e.target.value)
		let keyword = e.target.value;
		this.setState({
			keyword: keyword
		})
	}
	
	//将searchType&keyword传回父组件
	onSearch(){
		this.props.passValuetoParentComponent(this.state.searchType,this.state.keyword);
	}
	render(){
		return(
			<div className='searcher'>
				<Row gutter='5'>
					<Col>
						<Select
						    style={{ width: 200 }}
						    placeholder="请选择查询方式"
						    onChange={searchType=>{this.onSearchTypeSelected(searchType)}}
						  >
						    <Option value="productId">按商品ID查询</Option>
						    <Option value="productName">按商品名称查询</Option>
						 </Select>
					</Col>
					<Col>
						<Input placeholder="请输入关键字" onChange={e=>this.onKeywordEntered(e)}></Input>
					</Col>
					<Col>
						<div className="searcherbutton">
							<Button onClick={e=>this.onSearch()}>搜索</Button>
						</div>
					</Col>
				</Row>	
			</div>
			
			)
	}
}

export default Searcher;