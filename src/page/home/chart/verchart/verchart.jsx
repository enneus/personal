import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/charts';
class VerChart extends React.Component{
  constructor(props){
      super(props);
      this.state={
        userCount: '',
        productCount:'',
        orderCount:''
    }
  }

  render(){
      const data = [
      {
        type: '用户数量',
        sales: this.props.statiticsvalue.userCount,
      },
      {
        type: '商品数量',
        sales: this.props.statiticsvalue.productCount,
      },
      {
        type: '订单数量',
        sales: this.props.statiticsvalue.orderCount,
      },
      {
        type: '支付订单',
        sales: 700,
      },
      {
        type: '完成交易',
        sales: 550,
      }
    ];
    const config = {
      title: {
        visible: true,
        /*text: '基础柱状图label颜色自动调整',*/
      },
      description: {
        visible: true,
       /* text:
          '图形标签(label)的adjustColor配置项设置为true时\uFF0C位于柱形的内部的label颜色会根据柱形颜色自动调整\uFF0C保证可读性\u3002',*/
      },
      forceFit: true,
      data,
      padding: 'auto',
      xField: 'type',
      yField: 'sales',
      meta: {
        type: { alias: '类别' },
        sales: { alias: '数量' },
      },
      colorField: 'type',
      color: ['#55A6F3', '#55A6F3', '#55A6F3', '#CED4DE', '#55A6F3', '#55A6F3', '#55A6F3', '#55A6F3'],
      label: {
        visible: true,
        position: 'middle',
        adjustColor: true,
      },
    };
    return <Column {...config} />;
  }
}
  
export default VerChart;