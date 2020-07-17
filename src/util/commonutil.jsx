class CommonUtil{
	
	request(param){
		return new Promise((resolve, reject)=>{
			$.ajax({
			type:  param.type 		 || 'get',
			url: param.url    		 || '',
			data: param.data  		 || null,
			dataType: param.dataType || 'json',
			success: res=>{
				if(0===res.status){
					resolve(res.data,res.msg);
				}
				else if(10===res.status){
					this.doLogin();
				}
				else{
					reject(res.msg || res.data);
				}
				
			},
			error: err=>{
				reject(err.statusText);
			}		
			});
		});
		
	}

	doLogin(){
		window.location.href = "/dist/#/login";
	}

	setStorage(name, data){
		let dataType = typeof data;
		if(dataType = 'object'){
			window.localStorage.setItem(name, JSON.stringify(data));
		}
		else if(dataType == 'string' || dataType == 'boolean' || dataType == 'number'){
			window.localStorage.setItem(name, data);
		}	
		else{
			alert('该类型数据无法存入localStorage');
		}
		
	}

	getStorage(name){
		let data = window.localStorage.getItem(name);
		if(data){
			return JSON.parse(data);
		}
		else{
			return '';
		}
		
	}

	removeStorage(name){
		window.localStorage.removeItem(name);
	}

	errorTips(errMsg){
		alert(errMsg || '好像哪里不对了！');
	}

	successTips(msg){
		alert(msg || '操作成功！');
	}
	
}

export default CommonUtil;