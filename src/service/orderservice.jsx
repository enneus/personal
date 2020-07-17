import CommonUtil from 'util/commonutil.jsx';
const commonutil = new CommonUtil();

class Order{
	requestOrderInfo(pageNum){
		return commonutil.request({
			type: 'post',
			url:'/manage/order/list.do',
			data:{
				pageNum: pageNum
			}
		})
	}

	requestOrderDetail(ordernum){
		return commonutil.request({
			type: 'post',
			url:'/manage/order/detail.do',
			data:{
				orderNo: ordernum
			}
		})
	}
}
export default Order;