import React from 'react';
import StatisticsWindow from './statisticswindow/statistics.jsx';
import UserWindow from './userwindow/userlogin.jsx';
import 'layout/layout.scss'

class NavSide extends React.Component{
	constructor(props){
		super(props);
	}

	render(){

		return(
			<div className="naviside">
				<UserWindow history={this.props.history}/>
				<StatisticsWindow/>
			</div>
			
		)
	}
}

export default NavSide;