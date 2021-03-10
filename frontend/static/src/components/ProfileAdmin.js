import React, { Component } from 'react';
import CreateProfile from './CreateProfile';
import ArticleListAdmin from './ArticleListAdmin';


class Profile extends Component{
  constructor(props) {
    super(props);
    this.state = {
      drafts: [],
      profileSelection: "",
      allArticles: [],
      profile: null,
      phaseSelection: "",
    }
    this.filterProfile = this.filterProfile.bind(this);
    this.filterPhaseApproval = this.filterPhaseApproval.bind(this);
    this.filterPhasePublished = this.filterPhasePublished.bind(this);
    this.filterPhaseDrafts = this.filterPhaseDrafts.bind(this);

  }
  componentDidMount() {
      fetch('/profiles/detail/')
        .then(res => res.json())
        .then(
          (result) => {
            if(result.detail !== "Not found.") {
              this.setState({
                profile: result
              });
            }},
          (error) => {
            this.setState({
              error
            });
          }
        )

        fetch('/api/v1/news/staff/articles/')
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                  allArticles: result
                });
              },
            (error) => {
              this.setState({
                error
              });
            }
          )
    }
  filterProfile(event){
    console.log("I'm firing");
    const profileSelection = event.target.dataset.type;
    this.setState({profileSelection})
  }

  filterPhaseApproval(event){
    const phaseSelection = event.target.dataset.type;
    this.setState({phaseSelection})
    console.log("It's just a phase", phaseSelection );
    fetch(`/api/v1/news/user/articles/?phase=Approval`)
      .then(res => res.json())
      .then(
        (result) => {
            this.setState({
              userArticles: result
            });
          },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  filterPhaseDrafts(event){
    const phaseSelection = event.target.dataset.type;
    this.setState({phaseSelection})
    console.log("It's just a phase", phaseSelection );
    fetch(`/api/v1/news/user/articles/?phase=Draft`)
      .then(res => res.json())
      .then(
        (result) => {
            this.setState({
              userArticles: result
            });
          },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  filterPhasePublished(event){
    const phaseSelection = event.target.dataset.type;
    this.setState({phaseSelection})
    console.log("It's just a phase", phaseSelection );
    fetch(`/api/v1/news/user/articles/?phase=Published`)
      .then(res => res.json())
      .then(
        (result) => {
            this.setState({
              userArticles: result
            });
          },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  render(){
  const profile = this.state.profile
  console.log("[profil]", profile)
  console.log('PHASE BELOW', this.state.phaseSelection);
    return(
      <>
      <div className="profiles">
      <div className="profile-nav-container">
        <p>Username: {profile?.username} </p>
        <img className="profile-img" src={profile?.profile_picture} alt="preview"/>
        <ul className="profile-nav">
          <li data-type="Edit Picture" onClick={this.filterProfile}>
            Edit Picture
          </li>
          <li data-type="Write new artcile" onClick={this.filterProfile}>
            Write new artcile
          </li>
          <li data-type="Approval" onClick={this.filterPhaseApproval}>
          Approval Pendings
          </li>
          <li data-type="Published" onClick={this.filterPhasePublished}>
          Published Artciles
          </li>
          <li data-type="Drafts" onClick={this.filterPhaseDrafts}>
          Drafts
          </li>

      </ul>
    </div>
      <div className="profile-views">

      {!profile && this.state.profileSelection === "Edit Picture"
        ?
        <form onSubmit={this.props.handleSubmit}> <input type="file" name='profile_picture' onChange={this.props.handleImage}/>
          {this.props.profile_picture && <img className="pre-img" src={this.props.preview} alt="preview"/>}
          <button type="submit"> Save</button>
        </form>
        :
        null
      }
      {profile && this.state.profileSelection === "Edit Picture"
        ?
        <form onSubmit={this.props.handleImageEdit}> <input type="file" name='profile_picture' onChange={this.props.handleImage}/>
          {this.props.profile_picture && <img className="pre-img" src={this.props.preview} alt="preview"/>}
          <button type="submit"> Edit</button>
        </form>
        :
        null}
        {profile && this.state.profileSelection === "Write new artcile"
          ?
          <CreateProfile addArticle={this.props.addArticle}/>
          :
          null}

        <ArticleListAdmin isLoggedIn={this.props.isLoggedIn}
            userArticles={this.state.allArticles}
            editarticle={this.props.editarticle}
            removeArticle = {this.props.removeArticle}
          />
      </div>


      </div>
      </>
  )
}

}


export default Profile;
