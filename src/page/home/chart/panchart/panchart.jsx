import React, { useState, useEffect } from 'react';
import { Donut } from '@ant-design/charts';
import User            from 'service/userservice.jsx';
import CommonUtil      from 'util/commonutil.jsx';
const commonutil = new CommonUtil();
const user       = new User();

class PanChart extends React.Component{
  constructor(props){
      super(props);
      this.state={
        userCount: '',
        productCount:'',
        orderCount:''
    }
}
   
  
    render(){
      //console.log(this.props.statiticsvalue.userCount)
      //let usernum = this.props.statiticsvalue.userCount;
      const data = [
      {
        type: '用户数量',
        value: 20,
      },
      {
        type: '商品数量',
        value: 25,
      },
      {
        type: '订单数量',
        value: 18,
      },
      {
        type: '支付订单',
        value: 15,
      },
      {
        type: '完成交易',
        value: 10,
      }
    ];
      const config = {
        forceFit: true,
        title: {
          visible: true,
          /*text: '环图-指标卡',*/
        },
        description: {
          visible: true,
         /* text: '环图指标卡能够代替tooltip\uFF0C在环图中心挖空部分显示各分类的详细信息\u3002',*/
        },
        radius: 0.8,
        padding: 'auto',
        data,
        angleField: 'value',
        colorField: 'type',
        statistic: { visible: true },
      };
    return <Donut {...config} />;
   }

}  
export default PanChart;