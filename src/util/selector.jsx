import { Select }           from 'antd';
import React                from 'react';
import ReactDOM             from 'react-dom';
import { Row, Col, Input}   from 'antd';
import CommonUtil           from 'util/commonutil.jsx';
import Product              from 'service/productservice.jsx';
import './index.scss';
const commonutil  = new CommonUtil();
const product       = new Product();
const { Option } = Select;


class Selector extends React.Component{
  constructor(props){
    super(props);
    this.state={
      firstCategoryId    :0,
      firstCategoryList  : [],
      secondCategoryId   :0,
      secondCategoryList : [],

    };
    
  }

  componentDidMount(){
    this.loadFirstCategory();
  }

  componentWillReceiveMount(nextProps){
    let categoryIdChange       =       this.props.categoryId !== nextProps.categoryId,
        parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId
    //数据没有发生变化的时候不做处理
    if(!categoryIdChange && !parentCategoryIdChange){
      return;
    }
    if(nextProps.parentCategoryId === 0){
      this.setState({
        firstCategoryId  : nextProps.categoryId,
        secondCategoryId : 0
      });
    }
    //有两级品类
    else{
      this.setState({
        firstCategoryId  : nextProps.parentCategoryId,
        secondCategoryId : nextProps.categoryId
      }, () => {
        parentCategoryIdChange && this.loadSecondCategory();
      });
    }

  }

  //根据categoryid取一级数据
  loadFirstCategory(){
    product.requestProductCategory(this.props.parentCategoryId).then((res)=>{
      this.setState({
        firstCategoryList: res
      });
    },(err)=>{
        commonutil.errorTips(err);
    });
  }

   //当第一级选中，获得一级品类的ID
  onFirstCategorySelected(e){
    this.setState({
      firstCategoryId:e,
      secondCategoryId:0,
      secondCategoryList  : []

    });
    this.loadSecondCategory(e);
    this.sendCategoryIdToParentComponent(e);

  }
  
  //发送一级品类id请求二级品类列表
  loadSecondCategory(newnum){
    
    product.requestProductCategory(newnum).then(res=>{
      this.setState({
        secondCategoryList: res
      })
    },err=>{
      commonutil.errorTips(err);
    })
  }


 
  //选中第二级时获得
  onSecondCategorySelected(e){
    this.setState({
      secondCategoryId:e
    });
    this.sendCategoryIdToParentComponent(e);
    
  }
  //给父组件传值
  sendCategoryIdToParentComponent(e){
    let checkValid = typeof this.props.onCategoryChange === 'function';
    //如果有二级品类
    if(this.state.secondCategoryId){
        checkValid && this.props.onCategoryChange(e, this.state.firstCategoryId);
    }
    //如果只有一级品类
    else{
        checkValid && this.props.onCategoryChange(e, 0);
    }
  }

  
  render(){
    let param = this.props.categoryId;
    return(
        
            
              <Row>
                  <Col span={3}>
                      <Select
                        className="dropdownselect"
                        showSearch
                        style={{ width: 200 }}
                        placeholder={param}
                        optionFilterProp="children"
                        onSelect={e=>{this.onFirstCategorySelected(e)}}
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }

                      >
                      {this.state.firstCategoryList.map((pname,index)=>(
                          <Option key={pname.id}>{pname.name}</Option>
                        ))
                      }
                      
                      </Select>
                  </Col>
                  
                  <Col span={3}>
                      {this.state.firstCategoryId>0 ?
                      <Select
                        className="dropdownselect"
                        showSearch
                        style={{ width: 200 }}
                        placeholder={param}
                        optionFilterProp="children"
                        onSelect={e=>{this.onSecondCategorySelected(e)}}
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                       {
                        this.state.secondCategoryList.map((pname,index)=>(
                          <Option key={pname.id}>{pname.name}</Option>
                        ))
                      } 
                      </Select>
                       : null
                       } 
                  </Col>
              </Row>
    )
    
  }
}

export default Selector;