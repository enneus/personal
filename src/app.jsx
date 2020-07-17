
import{HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import React         			 from 'react';
import ReactDOM      			 from 'react-dom';
import LoginPage    			 from 'page/login/loginpage.jsx';
import HomePage     			 from 'page/home/homepage.jsx';
import UserInfo      			 from 'page/user/user.jsx';
import ProductPage   			 from 'page/product/product.jsx';
import ProductDetailPage  		 from 'page/product/detail/productdetail.jsx';
import ProductEditPage  		 from 'page/product/edit/editproduct.jsx';
import ProductCategoryPage 		 from 'page/product/product-category/productcategory.jsx';
import SecondProductCategoryPage from 'page/product/product-category/secondproductcategory.jsx';
import AddProductPage 			 from 'page/product/save/save.jsx';
import OrderPage 				 from 'page/order/orderpage.jsx';
import orderDetailPage 			 from 'page/order/orderdetail/orderdetail.jsx';
import ErrorPage    			 from 'page/error/error.jsx';
import Layout        			 from 'layout/layout.jsx';
import 'antd/dist/antd.css';


class Main extends React.Component{
	
	
	render(){
	
		let mainurl = (
				<Switch>
					<Route exact path="/" component={HomePage}/>
					<Route exact path="/homepage" component={HomePage}/>
					<Route exact path="/userinfo" component={UserInfo}/>
					<Route exact path="/product"  component={ProductPage}/>
					<Route exact path="/product-category"  component={ProductCategoryPage}/>
					<Route exact path="/product/save"  component={AddProductPage}/>
					<Route exact path="/product-category/index:pcateid"  component={SecondProductCategoryPage}/>
					<Route exact path="/product/detail"  component={ProductDetailPage}/>
					<Route exact path="/orderinfo"  component={OrderPage}/>
					<Route path="/product/detail:pid" component={ProductDetailPage}/>
					<Route path="/product/edit:pid" component={ProductEditPage}/>
					<Route path="/orderinfo/:ono"   component={orderDetailPage}/>
					<Route component={ErrorPage}/>
				</Switch>
						)				
		return(	
			<Router>
				<Switch>
					<Route path="/login" component={LoginPage}/>
					<Route path="/" render={props => mainurl}/>
				</Switch>
			</Router>
		)	
	}	
	
}

ReactDOM.render(
	<Main/>,
	document.getElementById('app')
);