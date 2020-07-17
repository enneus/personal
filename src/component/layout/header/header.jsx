import React 					from 'react';
import {Link, NavLink} 		    from 'react-router-dom';
import { SlackOutlined } 		from '@ant-design/icons';
import { Row, Col }      		from 'antd';
import TopNav            		from 'component/layout/navtop/index.jsx';
import './index.scss';

class Header extends React.Component{
	constructor(props){
		super(props);
	}


	render(){
		return(
				<div className="topBarBackground" id="wrapper">
					<div className="topBar">
						<Row>
							<Col>
								<div><SlackOutlined className="layoutIcon" style={{ fontSize: '45px'}} spin /></div>
							</Col>

							<Col>
								<div className="name">
									<Link className="projectName" to="/homepage">南通市崇川区</Link>
									<Link className="subProjectName"to="/homepage">XXX管理系统</Link>
								</div>
							</Col>


							<Col>
								<TopNav className="navtop" />
							</Col>
						</Row>	
					</div>
				</div>
			);
	}

}

export default Header;