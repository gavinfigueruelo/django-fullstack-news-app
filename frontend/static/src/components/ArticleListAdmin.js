import ArticleItemAdmin from './ArticleItemAdmin';

function ArticleListAdmin(props) {
  console.log(props);
  const article = props.userArticles.map((article, id) => (
      <ArticleItemAdmin key={id} article={article} articles={props.articles}
      editarticle={props.editarticle}
      isLoggedIn={props.isLoggedIn}
      removeArticle={props.removeArticle} />
));

  return(
    <>
    <ul className="articleList"> { article }
    </ul>

    </>
  )
}


export default ArticleListAdmin;
