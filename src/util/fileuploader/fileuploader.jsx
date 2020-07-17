import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React              from 'react';
import './fileuploader.scss';

const fileList = [
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  
];

const props2 = {
  action: '/manage/product/upload.do',
  listType: 'picture',
  name:'upload_file',
  method:"post",
  className: 'upload-list-inline',
};
class Uploader extends React.Component{
  constructor(props){
      super(props);
      this.state={
        subImages: [],
      }
  }
  getUri(e){
    console.log()
  }

  //父组件回调
  handleChange(e){
    if(e.file.status=='done'){
      this.state.subImages.push(e.file.response.data.uri)
      this.props.sendURLBack(this.state.subImages)
    }
    

}
    render(){
      return(
          <div className="filelist">
            <Upload {...props2} onChange={e=>{this.handleChange(e)}}>
              <Button>
                <UploadOutlined /> Upload
              </Button>
            </Upload>
          </div>
      )
    }
}

export default  Uploader;
