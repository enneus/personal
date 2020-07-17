import React from 'react';
import NavSide from './navside/index.jsx';
import Header from './header/header.jsx';
import { Row, Col }      from 'antd';
import './layout.scss'
class Layout extends React.Component{
	constructor(props){
		super(props);
		
	}
	
	render(){
		return(
			<div>
				<Header/>
				<Row  className="sidebarwindow" >
					<Col><NavSide/></Col>
					<Col><div className="wrappertitle">用户列表</div></Col>
				</Row>	
			</div>
			
			
			)
	}
}

export default Layout;
