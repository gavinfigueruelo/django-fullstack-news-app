import { Component } from 'react';

class Article extends Component{
  constructor(props) {
    super(props);
    this.state = {
      articleSelection: "All",
    }
    this.filterArticles = this.filterArticles.bind(this);
  }

  filterArticles(event){
    console.log("I'm firing");
    const articleType = event.target.dataset.type;
    this.setState({articleSelection: articleType})
  }

  render(){
    const filterArticles = this.props.articles.filter(article => {
    if(article.types === this.state.articleSelection ){
      console.log("matchChatsWithRooms", article.type)
      return article
    }
    else if (this.state.articleSelection === "All") {
      return article

    }
    return console.log("what is this?", article.type )
  }).map((article, id) => (

      <li key={article.id} className="article-item" >
          <div className="articles-container">
            <div className="article-img-container">
              <img className="article-img" src={article.image} alt="preview"/>
            </div>
            <p className="articles-title">{article.title}</p>
            <p className="articles-type">{article.types}</p>
            <p className = "article-list-text" >
              {article.body}
              </p>
              <p className="articles-author">Writen by: {article.author}</p>
          </div>
          </li>
          ));

            const community = this.props.articles.filter(article => {
            if (article.types === "Community") {
              return article
            }
            return console.log("what is this?", article.type )
          }).map((article, id) => (

              <li key={article.id} className="article-item" >
                  <div className="left-side-container">
                    <div className="article-img-container">
                      <img className="article-img" src={article.image} alt="preview"/>
                    </div>
                    <p className="articles-title">{article.title}</p>
                    <p className="articles-type">{article.types}</p>
                    <p className = "article-list-text" >
                      {article.body}
                      </p>
                      <p className="articles-author">Writen by: {article.author}</p>
                  </div>
                  </li>
                  ));

  return(
    <>
      <nav>
        <ul className="nav-selection">
          <li>
            <button className="nav-button" onClick={this.filterArticles}
              data-type="All">All</button>
          </li>
          <li>
            <button className="nav-button" onClick={this.filterArticles}
            data-type="Community">Community</button>
          </li>
          <li>
            <button className="nav-button" onClick={this.filterArticles}
            data-type="Sports">Sports</button>
          </li>
          <li>
            <button className="nav-button" onClick={this.filterArticles}
            data-type="Local">Local</button>
          </li>
          <li>
            <button className="nav-button" onClick={this.filterArticles}
              data-type="Inspiring">Inspiring</button>
          </li>
          <li>
            <button className="nav-button" onClick={this.filterArticles}
            data-type="International">International</button>
          </li>
        </ul>
      </nav>
      <div className="home-container">
      <div className="article-container">
        <div className="article-background">
    <ul className="articleList"> { filterArticles }
    </ul>
      </div>
    </div>
    <div className="side-container">
      <ul className="articleList"> { community }
      </ul>
    </div>
    </div>
    </>
      )
    }

  }

  export default Article;
