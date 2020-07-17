import React             from 'react';
import ReactDOM          from 'react-dom';
import Header            from 'component/layout/header/header.jsx';
import './error.scss';

class ErrorPage extends React.Component{
	constructor(props){
		super(props);
		
	}

	render(){
		return(
			<div>
				<Header/>
				<div id="wrapper">
					<div className="errormsg">
						该页面暂时无法显示
					</div>
				</div>
				
			</div>
			)
		
	}
}

export default ErrorPage;