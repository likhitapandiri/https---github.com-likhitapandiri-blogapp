import {Link} from "react-router-dom";
import { useContext, useEffect ,useState} from "react";
import { UserContext } from "./UserContext";
export default function Header() {
  const { setUserInfo, userInfo} = useContext(UserContext);
  //const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/profile', {
    credentials:'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      })
    })
  }, []);
  function logout() {
    fetch('http://localhost:8080/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }
  const username = userInfo?.username;
    return (
        <header>
        <Link to="/" className="logo">My Blog</Link>
        <nav>
          {username && (
            <>
              <span>Hello,{username}</span>
              <Link to="/create">Create new post</Link>
              <a href="" onClick={logout} >Logout</a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login" >Login</Link>
          <Link to="/register" >Register</Link>
            </>
          )}
          
        </nav>
      </header>
    );
}