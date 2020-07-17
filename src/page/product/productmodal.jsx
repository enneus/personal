import { Modal, Button, Input }    from 'antd';
import React                       from 'react';
import Product                     from 'service/productservice.jsx';
import CommonUtil                  from 'util/commonutil.jsx';
const commonutil  = new CommonUtil();
const product     = new Product();

class ProductModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categoryName   :0,
      categoryId     :this.props.passId,
      newCategoryName:'',
      status         :this.props.passStatus,
      visible        : false 
    };
}
  showModal(){
    this.setState({
      visible: true,
    });
  };

  componentDidMount(){
    console.log(this.props)
    //console.log('currentid:',this.props.passid,'currentstatus:',this.props.passstatus)
    //console.log('newrentid:',this.props.passid,'newstatus:',this.props.passstatus)
  }

  handleOk(){
    let newstatus = this.state.status == 1 ? 2 : 1;
    product.changeProductStatus(this.state.categoryId,newstatus).then(res=>{
      commonutil.successTips(res);
      this.setState({
        status: newstatus
      })
      this.props.passvalue(newstatus);
    },err=>{
      commonutil.errorTips(err);
    });
    this.setState({
      visible: false,
    });

  };

  handleCancel(e){
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={e=>this.showModal()}>
          {this.state.status==1 ? '下架' : '上架'}
        </Button>
        <Modal
          title="xxx管理系统"
          visible={this.state.visible}
          onOk={e=>this.handleOk()}
          destroyOnClose={true}
          onCancel={e=>this.handleCancel(e)
            }
        >
          <p>{
                this.state.status==1 ? '确定下架？' : '确定上架？'
            }
          </p>
        </Modal>
      </div>
    );
  }
}

export default ProductModal;