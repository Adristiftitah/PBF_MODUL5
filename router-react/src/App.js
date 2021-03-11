import React from "react";
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useLocation,
  Redirect,
  useHistory,
  withRouter
} from "react-router-dom";


export default function AuthExample() {
  return (
    <Router>
      <div>
        <AuthButton />
        <ul>
          <li>
             {/* <Link to="/">Home</Link>  */}
            {/* <Link to="/netflix">Netflix</Link> */}
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            {/* <Link to="/about">About</Link> */}
            {/* <Link to="/gmail">Gmail</Link> */}
            {/* <Link to="/topics">Topics</Link>  */}
            <Link to="/private">Private Page</Link>
          </li>
          
        </ul>

        <Switch>
          {/* <Route path="/:id" children={<Child />} /> */}
          <Route path="/public">
            <PublicPage/>
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/private">
            <ProtectedPage />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}
const fakeAuth ={
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signot(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(({ history }) =>
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button 
      onClick={() => {
        fakeAuth.signot(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
);

function PrivateRoute({ children, ...rest}){
  return (
    <Route 
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {from:location}
            }}
            />
        )
      }
     />
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Private</h3>;
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: {pathname: "/"} };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}
// function Child(){
//   let {id} = useParams();
//   return (
//     <div>
//       <h3>ID: {id} </h3>
//     </div>
//   );
// }

// function Home(){
//   return (
//      <div>
//        <h2>Home</h2>
//      </div>
//    );
//  }

//  function Topics(){
//   let {path, url} = useRouteMatch();
//   return (
//      <div>
//        <h2>Topics</h2>
//        <ul>
//          <li>
//            <Link to={`${url}/Sate, Nasi goreng`}>Kuliner</Link>
//          </li>
//          <li>
//            <Link to={`${url}/Wisata alam, Museum`}>Travelling</Link>
//          </li>
//          <li>
//            <Link to={`${url}/Ibis, JW Marriot`}>Review Hotel</Link>
//          </li>
//        </ul>

//        <Switch>
//          <Route exact path={path}>
//            <h3>Please select a topic.</h3>
//          </Route>
//          <Route path={`${path}/:topicId`}>
//            <Topic />
//          </Route>
//        </Switch>
//      </div>
//    );
//  }

//  function Topic(){
//    let {topicId} = useParams();

//    return (
//      <div>
//        <h3>{topicId}</h3>
//      </div>
//    )
//  }

// function About(){
//   return (
//     <div>
//       <h2>About</h2>
//     </div>
//   );
// }

// function Dashboard(){
//   return (
//     <div>
//       <h2>Dashboard</h2>
//     </div>
//   );
// }
