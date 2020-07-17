import CommonUtil from 'util/commonutil.jsx';
const commonutil = new CommonUtil();
class User{
	login(loginInfo){
		return commonutil.request({
			type: 'post',
			 url: '/manage/user/login.do',
			data: loginInfo
		});
	}

	logout(){
		return commonutil.request({
			type:'post',
			url :'/user/logout.do'
		})
	}

	requestUserInfo(pageNum){
		return commonutil.request({
			type:'post',
			url :'/manage/user/list.do',
			data:{
				pageNum: pageNum
			}
		})
	}

	requestAllAmount(){
		return commonutil.request({
			type:'post',
			url :'/manage/statistic/base_count.do',
		})
	}

}

export default User;