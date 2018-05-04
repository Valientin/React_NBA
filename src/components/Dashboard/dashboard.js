import React from 'react';
import FormField from '../widgets/FormFields/formFields';
import { firebaseTeams, firebaseArticles, firebase } from '../../firebase';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import Uploader from '../widgets/FileUploader/fileUploader';

import style from './dashboard.css';

class Dashboard extends React.Component {
   state = {
      editorState: EditorState.createEmpty(),
      postError: '',
      loading: false,
      formData: {
         author: {
            element: 'input',
            value: '',
            config: {
               name: 'author_input',
               type: 'text',
               placeholder: 'Enter your name'
            },
            validation: {
               required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
         },
         title: {
            element: 'input',
            value: '',
            config: {
               name: 'title_input',
               type: 'text',
               placeholder: 'Enter the title'
            },
            validation: {
               required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
         },
         body:{
            element:'texteditor',
            value:'',
            valid: true
         },
         image:{
            element:'image',
            value:'',
            valid: true
         },
         team: {
            element: 'select',
            value: '',
            config: {
               name: 'team_input',
               options:[]
            },
            validation: {
               required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
         }
      }
   }

   componentDidMount() {
      this.loadTeams()
   }

   loadTeams = () => {
      firebaseTeams.once('value')
      .then((snapshot) => {
         let team = [];

         snapshot.forEach((childSnapshot) => {
            team.push({
               id: childSnapshot.val().teamId,
               name: childSnapshot.val().name,
            })
         })
         const newFormData = {...this.state.formData};
         const newElem = {...newFormData['team']};

         newElem.config.options = team;
         newFormData['team'] = newElem;

         this.setState({
            formData: newFormData
         })
      })
   }

   submitForm = (e) => {
      e.preventDefault();
      let dataToSubmit = {};
      let formIsValid = true;

      for(let key in this.state.formData){
         dataToSubmit[key] = this.state.formData[key].value
      }
      for(let key in this.state.formData){
         formIsValid = this.state.formData[key].valid && formIsValid;
      }


      if(formIsValid){
         this.setState({
            loading: true,
            postError: ''
         })

         firebaseArticles.orderByChild("id")
         .limitToLast(1).once('value')
         .then( snapshot => {
            let articleId = null;
            snapshot.forEach(childSnapshot => {
               articleId = childSnapshot.val().id
            });
            dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP
            dataToSubmit['id'] = articleId + 1;
            dataToSubmit['team'] = parseInt(dataToSubmit['team'], 10);

            firebaseArticles.push(dataToSubmit)
            .then( article => {
               this.props.history.push(`/articles/${article.key}`)
            }).catch( e => {
               this.setState({
                  postError: e.message
               })
            })
         })


      } else {
         this.setState({
            postError: 'Something went wrong'
         })
      }
   }

   updateForm = (elem, content = '') => {
      const newFormData = {
         ...this.state.formData
      }
      const newElem = {
         ...newFormData[elem.id]
      }

      if(content === ''){
         newElem.value = elem.e.target.value;
      } else {
         newElem.value = content;
      }

      if(elem.blur){
         let validData = this.validate(newElem);
         newElem.valid = validData[0];
         newElem.validationMessage = validData[1]
      }

      newElem.touched = elem.blur;
      newFormData[elem.id] = newElem;

      this.setState({
         formData: newFormData
      })
   }

   validate = (elem) => {
      let error = [true,''];

      if(elem.validation.required){
         const valid = elem.value.trim() !== '';
         const message = `${!valid ? 'This field is required': ''}`;
         error = !valid ? [valid, message] : error
      }

      return error;
   }

   submitButton = () => (
      this.state.loading ?
      'loading...'
      :
      <div>
         <button type="submit">Add Post</button>
      </div>
   )

   showError = () => (
      this.state.postError !== '' ?
      <div className={style.error}>
         {this.state.postError}
      </div>
      : ''
   )

   onEditorStateChange = (editorState) => {
      let contentState = editorState.getCurrentContent();
      let rawState = convertToRaw(contentState);

      let html = stateToHTML(contentState);

      this.updateForm({id:'body'},html)

      this.setState({
         editorState
      })
   }

   storeFilename = (filename) => {
      this.updateForm({id:'image'}, filename)
   }

   render(){
      return(
         <div className={style.postContainer}>
            <form onSubmit={this.submitForm}>
               <h2>Add Post</h2>

               <Uploader
                  filename={(filename) => this.storeFilename(filename)}
               />

               <FormField
                  id={'author'}
                  formData={this.state.formData.author}
                  change={(elem) => this.updateForm(elem)}
               />
               <FormField
                  id={'title'}
                  formData={this.state.formData.title}
                  change={(elem) => this.updateForm(elem)}
               />
               <Editor
                  editorState={this.state.editorState}
                  wrapperClassName="myEditor-wrapper"
                  editorClassName="myEditor-editor"
                  onEditorStateChange={this.onEditorStateChange}
               />
               <FormField
                  id={'team'}
                  formData={this.state.formData.team}
                  change={(elem) => this.updateForm(elem)}
               />
               {this.submitButton()}
               {this.showError()}
            </form>
         </div>
      )
   }
}

export default Dashboard;
