import CommonUtil from 'util/commonutil.jsx';
const commonutil = new CommonUtil();

class Product{
	requestProductInfo(pageNum){
		return commonutil.request({
			type: 'post',
			url:'/manage/product/list.do',
			data:{
				pageNum: pageNum
			}
		})
	}

	requestProductDetail(id){
		return commonutil.request({
			type: 'post',
			url:'/manage/product/detail.do',
			data:{
				productId: id
			}
		})
	}

	requestProductCategory(categoryId){
		return commonutil.request({
			type: 'post',
			url:'/manage/category/get_category.do',
			data:{
				categoryId: categoryId || 0
			}
		})
	}

	changeProductStatus(id,status){
		return commonutil.request({
			type: 'post',
			url:'/manage/product/set_sale_status.do',
			data:{
				productId: id,
				status   : status
			}
		})
	}

	updateCategoryName(categoryid, newname){
		return commonutil.request({
			type: 'post',
			url:'/manage/category/set_category_name.do',
			data:{
				categoryId: categoryid,
				categoryName   : newname
			}
		})
	}

	searchProduct(searchType,keyword){

		return commonutil.request({
			type: 'post',
			url:'/manage/product/search.do',
			data:{
				productName  : keyword
			}
		})
	}

	checkSeachValidity(searchType,keyword){
		let result = {
			status: true
		}

		if(keyword==''){
			alert('关键字不能为空！');
			return{
				status: false
			}
		}

		if(searchType==''){
			alert('选项不能为空！');
			return{
				status: false
			}
		}

		if(searchType=='productId' && typeof keyword !=='number'){
			alert('bad request!');
			return{
				status: false
			}
		}


		return result;
	}
	//更新物品
	updateProduct(updatedata){
		return commonutil.request({
			type: 'post',
			url :'/manage/product/save.do',
			data: updatedata
		})
	}


}
	
export default Product;