import React, { Component } from 'react';
import Cookies from 'js-cookie';

class CreateProfile extends Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      body: '',
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmitForApp = this.handleSubmitForApp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInput(event){
    this.setState({ [event.target.name]: event.target.value });
  }

handleSubmit(event){
  event.preventDefault();
  const article = {
    body: this.state.body,
    title: this.state.title,
    }

    fetch('/api/v1/news/user/articles/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken' : Cookies.get('csrftoken'),
      },
      body: JSON.stringify(article),
    })
      .then(response => {
        if(!response.ok){
          throw new Error ('Invalid Post request');
        }
        return response.json()
      })
      .then(data => {
        this.props.addArticle(data);
        console.log('Message created!', data)})
        .catch(error => console.log('Error:', error))
        .finally('I always fire.');
        this.setState({
          title: "",
          body: "",})
      };
handleSubmitForApp(event){
  event.preventDefault();
  const article = {
    body: this.state.body,
    title: this.state.title,
    phase: 'Approval',
  }
    fetch('/api/v1/news/user/articles/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken' : Cookies.get('csrftoken'),
      },
      body: JSON.stringify(article),
    })
    .then(response => {
      if(!response.ok){
        throw new Error ('Bad Post request');
      }
      return response.json()
    })
    .then(data => {
      this.props.addArticle(data);
      console.log('Message created!', data)})
      .catch(error => console.log('Error:', error))
      .finally('I always fire.');
      this.setState({
        title: "",
        body: "",})
  };

render(){

  return(
    <>
      <div className="ArticleForm">
        <form className="form">
          <input type="title" id="article-title" name="title" value={this.state.title} onChange={this.handleInput} placeholder="Title"/><br/>
          <input type="body" id="article-body" name="body" value={this.state.body} onChange={this.handleInput} placeholder="Text"/>
          <label htmlFor="article-body"></label><br/>
          <button type="button" onClick={this.handleSubmitForApp}>Submit</button>
          <button type="button" onClick={this.handleSubmit}>Save as Draft</button>
        </form>
     </div>
    </>
  )
}
}


export default CreateProfile;
