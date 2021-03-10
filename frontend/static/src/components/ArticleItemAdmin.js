import { Component } from 'react';
import Cookies from 'js-cookie';

class ArticleItemAdmin extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      body: this.props.article.body,
      title: this.props.article.title
    }
    this.handleInputEdit = this.handleInputEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmitForApp = this.handleSubmitForApp.bind(this);
  }
  handleSubmitForApp(event, id){
    event.preventDefault();
    const article = {
      body: this.state.body,
      title: this.state.title,
      phase: 'Approval',
    }
      fetch(`/api/v1/news/user/articles/${id.id}`, {
        method: 'PUT',
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
        console.log('Success. Message created!', data)})
        .catch(error => console.log('Error:', error))
        .finally('I am always going to fire!');
        this.setState({
          title: "",
          body: "",})
    };

    handleEdit(event, article){
      if(event.keyCode === 13) {
        this.props.editarticle(article, this.state.body);
        this.setState({ isEditing: false });
      }
    }

    handleInputEdit(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render(){
    const article = this.props.article;
  return(
      <li key={article.id} className="article-item" >
          <div className="articles-container">
          <p className="articles-title">{article.title}</p>



            {this.state.isEditing
              ?
              <input type="body" name="body"
              value={this.state.body} onChange={this.handleInputEdit}
              onKeyUp={(event) => this.handleEdit(event, article)}/>
              :
              <p className = "article-list-text-profile" > {article.body} </p>
            }
            <p className="articles-phase-profile">This article is: {article.phase}</p>
          <p className="articles-author-profile">Writen by: {article.author}</p>

          {!this.state.isEditing

            ?
            <button class="btn" type="button" onClick={() => this.setState({ isEditing: !this.state.isEditing })}>
            <i className="fas fa-edit"></i>
            </button>
            :
            null
          }

            <div>
            <button class="btn" type="button" onClick={()=> this.props.removeArticle(article)}>
              <i className="fas fa-trash-alt"></i>
            </button><br/>
            <button class="btn" type="button" onClick={(event) => this.handleSubmitForApp(event, article)}
              >Submit for approval</button>
            </div>




          </div>
          </li>


      )
    }

  }

  export default ArticleItemAdmin;
