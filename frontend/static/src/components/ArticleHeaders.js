import { NavLink } from 'react-router-dom';


function ArticleHeaders(props) {
  return (
    <ul className="nav-bar">
      <li><NavLink to="/profile">Community</NavLink></li>
    </ul>
  )
}



export default ArticleHeaders;
