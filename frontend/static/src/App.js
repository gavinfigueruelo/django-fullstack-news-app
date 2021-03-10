import {Component} from 'react';
import Cookies from 'js-cookie';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import Articles from './components/Articles';
import Header from "./components/Header";
import Profile from './components/Profile';
import ProfileAdmin from './components/ProfileAdmin';

const endpoint = '/api/v1/articles/'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_picture: null,
      preview: '',
      articles: [],
      isLoggedIn: !!Cookies.get('Authorization'),
      clickRegister: false,
      clickLogin: false,
      profileUploaded: false,
    }
    this.handleImage = this.handleImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleImageEdit = this.handleImageEdit.bind(this);
    this.editarticle = this.editarticle.bind(this);
    this.addArticle = this.addArticle.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
  }


  componentDidMount() {
      fetch(`${endpoint}`)
        .then(res => res.json())
        .then(
          (result) => {
            console.log('response', result)
            this.setState({
              articles: result
            });
          },
          (error) => {
            this.setState({
              error
            });
          }
        )
    }

  addArticle(article){
    const articles = [...this.state.articles]
    articles.push(article);
    this.setState({ articles })
  }

  removeArticle(article){
    const articles = [...this.state.articles];
    const index = articles.indexOf(article);
    articles.splice(index, 1);
    this.setState({ articles });
    fetch(`${endpoint}edit/${article.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken' : Cookies.get('csrftoken'),
          },
        })
          .then(response => {
          if(!response.ok){
            throw new Error ('Bad Post request');
          }
          })
        .catch(error => console.log('Error:', error))
        .finally('I am always going to fire!');
    };

editarticleAdmin(article, updatedText){
  console.log(article);
  const articles =  [...this.state.articles];
  const index = articles.indexOf(article);
  article.body = updatedText;
  articles[index] = article;

  const id = article.id;
  this.setState({ articles });

  fetch(`${endpoint}edit/${id}`, {
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
      .then(data => console.log('Success. ChatApp created!'))
      .catch(error => console.log('Error:', error))
      .finally('I am always going to fire!');
};

  editarticle(article, updatedText){
    console.log(article);
    const articles =  [...this.state.articles];
    const index = articles.indexOf(article);
    article.body = updatedText;
    articles[index] = article;

    const id = article.id;
    this.setState({ articles });

    fetch(`${endpoint}edit/${id}`, {
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
        .then(data => console.log('Success. ChatApp created!'))
        .catch(error => console.log('Error:', error))
        .finally('I am always going to fire!');
  };

  async handleRegistration(e, obj) {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: JSON.stringify(obj)
    };
    const handleError = (err) => console.warn(err);
    const response = await fetch('/rest-auth/registration/', options);
    const data = await response.json().catch(handleError);
    console.log(data);

    if (data.key) {
      Cookies.set('Authorization', `Token ${data.key}`);
      const user = {username: data.username, is_staff: data.is_staff}
      localStorage.setItem("user", JSON.stringify(user));
      this.setState({isLoggedIn: true})
    }

  }

  handleImage(event) {
    let file = event.target.files[0];
    this.setState({profile_picture: file});

    let reader = new FileReader()
    reader.onloadend = () => {
      this.setState({preview: reader.result})
    }
    reader.readAsDataURL(file);
  }

  async handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append('profile_picture', this.state.profile_picture);

    const options = {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: formData
    }
    const response = await fetch('/profiles/', options);
    console.log(response);
    this.setState({preview: null})
    this.setState({profileUploaded: true})
  }

  async handleImageEdit(event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append('profile_picture', this.state.profile_picture);

    const options = {
      method: 'PUT',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: formData
    }
    const response = await fetch('/profiles/detail', options);
    console.log(response);
    this.setState({preview: null})
  }

  async handleLogin(e, obj){
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken' : Cookies.get('csrftoken'),
      },
      body: JSON.stringify(obj),
    };
    const handleError = (err) => console.warn(err);
    const response = await fetch('/rest-auth/login/', options);
    const data = await response.json().catch(handleError);
    console.log(data);

    if(data.key){
      Cookies.set('Authorization', `Token ${data.key}`);
      const user = {username: data.username, is_staff: data.is_staff}
      localStorage.setItem("user", JSON.stringify(user));
      this.setState({isLoggedIn: true })
      }
  }

  async handleLogOut(e){
    console.log(this.state.isLoggedIn);
    e.preventDefault();

    alert('we logging out');

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken' : Cookies.get('csrftoken'),
      },
    };
    const handleError = (err) => console.warn(err);
    const response = await fetch('/rest-auth/logout/', options);
    const data = await response.json().catch(handleError);
    console.log(data);


    Cookies.remove('Authorization');
    this.setState({isLoggedIn: false });
    localStorage.removeItem('user');
  }

  render() {

    return (
      <>
      <BrowserRouter>
        <Header
          handleLogOut={this.handleLogOut}
          isLoggedIn={this.state.isLoggedIn}
        />
      <Switch>

        <Route path="/login" children={
            <Login
              isLoggedIn={this.state.isLoggedIn}
              handleLogin={this.handleLogin}
            />
          }></Route>

        <Route path="/articles" children={
            <Articles className="articles"
              articles={this.state.articles}
            />
        }></Route>

        <Route path="/register" children={
            <Register className="register"
              isLoggedIn={this.state.isLoggedIn}
              handleRegistration={this.handleRegistration}
            />
        }></Route>

        <Route path="/profile/admin" children={
          <ProfileAdmin
          profile_picture={this.state.profile_picture}
          preview={this.state.preview}
          articles={this.state.articles}
          editarticle={this.editarticle}
          removeArticle = {this.removeArticle}
          isLoggedIn={this.state.isLoggedIn}
          handleSubmit={this.handleSubmit}
          addArticle={this.addArticle}
          handleImageEdit={this.handleImageEdit}
          handleImage={this.handleImage}
          profileUploaded={this.profileUploaded}
          />
        }></Route>
        <Route path="/profile/:phase?" children={
          <Profile
          profile_picture={this.state.profile_picture}
          preview={this.state.preview}
          articles={this.state.articles}
          editarticle={this.editarticle}
          removeArticle = {this.removeArticle}
          isLoggedIn={this.state.isLoggedIn}
          handleSubmit={this.handleSubmit}
          addArticle={this.addArticle}
          handleImageEdit={this.handleImageEdit}
          handleImage={this.handleImage}
          profileUploaded={this.profileUploaded}
          />
        }></Route>

        <Route path="/" exact>
          <div className="test">
            <div className="divider-container">
              <div className="divider-top">
                <div className="divider-words">What articles are you looking for?</div>
              </div>
            </div>
             <Articles articles={this.state.articles}/>
          </div>
        </Route>

      </Switch>
      </BrowserRouter>

    </>
  )}
}

export default App;
