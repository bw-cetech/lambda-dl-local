import React from 'react';

import Button from '@material-ui/core/Button'; // Material-UI, the world's most popular React UI framework

import './App.css';
import './Dnd.css';
import logo from './logo.svg';

import cetech from './cetech.png';

import $ from 'jquery';




class App extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      files: [],
      imagePreviewUrl: ''
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    // localStorage.setItem('UploadedData', file);
    // console.log(this.state.file)
    // axios.post('https://tmpfiles.org/download/81437/', this.state.file, {onUploadProgress: progressEvent => {
    //   console.log(progressEvent.loaded / progressEvent.total)
    // }})

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  onPreviewDrop = (files) => {
    this.setState({
      files: this.state.files.concat(files),
     });
     alert("Great Shot!")
  }


  render() {

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img id='uploadedImage' name='formUpload' src={imagePreviewUrl} thumbnail />);
    } else {
      // $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }


      return (
        
        <div className="App">

	<div>
  		<img src={cetech} className="cetech_logo" alt="ce.tech" />
	</div>
      
        <header className="App-header">
          <img src={logo} className="App-logo" alt="reactjs" />
        </header>
        
        <form method="POST" action="" enctype="multipart/form-data" id='mainForm'>
            <p style={{color: imagePreviewUrl ? 'transparent' : '#ffffff'}} >Drag your files here or click in this area.</p>
            <input id='dragDropArea' type="file" name="file" multiple onChange={this._handleImageChange} ></input>
            <button onClick={this._handleSubmit}>UPLOAD IMAGE</button>
            <input className="submitBtn" type="submit" value="Submit" ></input>
            <Button style={{backgroundColor: "#90caf9"}} variant="contained" type="submit" value="Submit" >Run Script</Button>
            
            {$imagePreview}
            <div> </div>
            <div id='inferMsg' style={{color: !(window.token) ? 'transparent': '#ffffff' }}> Traffic Sign: {window.token}</div>
        </form>
  
      </div>

      );
  }
}

export default App;