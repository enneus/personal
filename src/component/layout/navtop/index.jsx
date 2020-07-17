import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import './index.scss';
const { SubMenu } = Menu;

class TopNav extends React.Component {
  constructor(props){
    super(props);
    this.state = {
       current: 'mail',
    };
  }
 
handleClick(e){
  //this.props.history.push("/userinfo");
  let name = e.key;
  console.log(name)
  if(name == '用户管理'){
     window.location.href="/dist/#/userinfo";
  }
   if(name == '商品管理'){
     window.location.href="/dist/#/product";
  }
   if(name == '品类管理'){
     window.location.href="/dist/#/product-category";
  }
   if(name == '订单管理'){
     window.location.href="/dist/#/orderinfo";
  }
}


  render() {
    return (
      <div className="navtopdiv">
        <Menu selectedKeys={[this.state.current]} mode="horizontal" inlineIndent="15">
          <SubMenu icon={<SettingOutlined />} title="用户" className="aa">
            <Menu.ItemGroup> 
                  <Menu.Item key="用户管理" onClick={e=>{this.handleClick(e)}}>用户管理</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>

          <SubMenu icon={<SettingOutlined />} title="商品" className="aa">   
              <Menu.ItemGroup>        
                    <Menu.Item key="商品管理" onClick={e=>{this.handleClick(e)}}>商品管理</Menu.Item>
                    <Menu.Item key="品类管理" onClick={e=>{this.handleClick(e)}}>品类管理</Menu.Item>       
              </Menu.ItemGroup>
           
          </SubMenu>

          <SubMenu icon={<SettingOutlined />} title="订单" className="aa">
            <Menu.ItemGroup>
              <Menu.Item key="订单管理" onClick={e=>{this.handleClick(e)}}>订单管理</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default TopNav;

