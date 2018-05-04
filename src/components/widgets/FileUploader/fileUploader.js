import React from 'react';
import { firebase } from '../../../firebase';
import FileUploader from 'react-firebase-file-uploader';

class Uploader extends React.Component {
   state = {
      name:'',
      isUploading: false,
      progress: 0,
      fileURL: ''
   }

   handleUploadStart = () => {
      this.setState({
         isUploading: true,
         progress: 0
      })
   }

   handleProgress = (progress) => {
      this.setState({
         progress
      })
   }

   handleUploadError = (error) => {
      this.setState({
         isUploading: false
      })
   }

   handleUploadSuccess = (filename) => {
      this.setState({
         name: filename,
         progress: 100,
         isUploading: false
      })
      firebase.storage().ref('img')
      .child(filename).getDownloadURL()
      .then( url => {
         this.setState({
            fileURL: url
         })
      })
      this.props.filename(filename);
   }


   render() {
      return(
         <div>
            <FileUploader
               accept="image/*"
               name="image"
               randomizeFilename
               storageRef={firebase.storage().ref('img')}
               onUploadStart={this.handleUploadStart}
               onUploadError={this.handleUploadError}
               onUploadSuccess={this.handleUploadSuccess}
               onProgress={this.handleProgress}
            />
            { this.state.isUploading ?
               <p>Progress:{this.state.progress}</p>
               : null
            }
            { this.state.fileURL ?
               <img style={{
                  width:'300px'
               }} src={this.state.fileURL} alt="img"/>
               : null
            }
         </div>
      )
   }
}

export default Uploader;
