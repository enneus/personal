import { Modal, Button, Input }    from 'antd';
import React                       from 'react';
import Product                     from 'service/productservice.jsx';
import CommonUtil                  from 'util/commonutil.jsx';
const commonutil  = new CommonUtil();
const product       = new Product();

class ModalTool extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categoryName   :0,
      categoryId     :this.props.cateid,
      newCategoryName:'',
      visible        : false 
    };
}
  showModal(){
    this.setState({
      visible: true,
    });
  };

  handleOk(){
    product.updateCategoryName(this.state.categoryId,this.state.newCategoryName).then(res=>{
      commonutil.successTips(res);
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

  onNameChange(e){
    let newname = e.target.value;
    this.setState({
      newCategoryName: newname
    })
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={e=>this.showModal()}>
          修改名称
        </Button>
        <Modal
          title="xxx管理系统"
          visible={this.state.visible}
          onOk={e=>this.handleOk()}
          destroyOnClose={true}
          onCancel={e=>this.handleCancel(e)
            }
        >
          <p>请输入新的品类名称:</p>
          <Input onChange={e=>this.onNameChange(e)}></Input>
        </Modal>
      </div>
    );
  }
}

export default ModalTool;