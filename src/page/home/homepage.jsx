import React             from 'react';
import ReactDOM          from 'react-dom';
import Header            from 'component/layout/header/header.jsx';
import Layout            from 'component/layout/layout.jsx';
import NavSide           from 'component/layout/navside/index.jsx';
import { SlackOutlined } from '@ant-design/icons';
import HoriChart         from './chart/horichart/horichart.jsx';
import VerChart          from './chart/verchart/verchart.jsx';
import PanChart          from './chart/panchart/panchart.jsx';
import { Row, Col }      from 'antd';
import User         	 from 'service/userservice.jsx';
import CommonUtil   	 from 'util/commonutil.jsx';
const commonutil = new CommonUtil();
const user       = new User();
import './homepage.scss';

class HomePage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			userCount: '',
			productCount:'',
			orderCount:''
		}
	}

	componentDidMount(){
		this.loadUserAmount();
	}

	loadUserAmount(){
		user.requestAllAmount().then(res=>{
			this.setState(res);
			//console.log(this.state)
		},err=>{
			commonutil.errorTips(err);
		});

	}
	render(){
		return(
			<div>
				<Header/>
				<div >
					<Row>
						<Col span={5}>	
								<NavSide history={this.props.history}/>
						</Col>
						<Col span={19}>
							<div className="wrapper">
								<div className="horichartdecoration">
									<div className="horibarchart">
										<HoriChart statiticsvalue={this.state}/>
									</div>
								</div>
								<Row>
									<Col span={12}>
										<div className="verbarchart">
											<VerChart statiticsvalue={this.state}/>
										</div>
									</Col>
									<Col span={12} offest={12}>
										<PanChart statiticsvalue={this.state}/>
									</Col>
								</Row>
							</div>
							
						</Col>
					</Row>
				</div>
				
			</div>
			)
		
	}
}

export default HomePage;