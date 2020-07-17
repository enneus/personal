import React, { useState, useEffect } from 'react';
import { Bar } from '@ant-design/charts';

class HoriChart extends React.Component{
  constructor(props){
      super(props);
      this.state={
        userCount: '',
        productCount:'',
        orderCount:''
    }

  }
  render(){
    //let usernum = this.props.statiticsvalue.userCount;
        //productnum = this.props.statiticsvalue.productCount;
      const data = [
      {
        action: '用户数量',
        '数量': this.props.statiticsvalue.userCount,
      },
      {
        action: '商品数量',
        '数量': this.props.statiticsvalue.productCount,
      },
      {
        action: '订单数量',
        '数量': this.props.statiticsvalue.orderCount,
      },
      {
        action: '支付订单',
        '数量': 700,
      },
      {
        action: '完成交易',
        '数量': 550,
      },
    ];
    const config = {
      title: {
        visible: true,
        text: '基础条形图',
      },
      /*description: {
        visible: true,
        text: '基础条形图的图形之间添加转化率标签图形\uFF0C用户希望关注从上到下的数据变化比例',
      },*/
      forceFit: true,
      data,
      xField: '数量',
      yField: 'action',
      
    };
    return <Bar {...config} />;
    }
  
}


export default HoriChart;