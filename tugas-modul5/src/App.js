import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch
} from "react-router-dom";

export default function NestingAuthExample() {
  return(
    <Router>
      <nav class="navbar navbar-expand-lg navbar-dark bg-warning">
        <div class="container">
          <a class="navbar=brand" href="#">MEDIHEAL STORE</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" 
          data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
          aria-expanded="false" aria-label="Toggle navigation">
            
            <span class="navbar-toggler-icon"></span>
          </button>  
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link">
                  <Link to="/home">HOME</Link>
                  <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link">
                  <Link to="/prodact">BRANDS</Link>
                  <span class="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item ml-2 mt-2">
              <AuthButton />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="bghome">
        <br></br>
        <div class="text-center">
          <h4>Sheet Mask Best Seller</h4>
        </div>
      </div>
      <hr />

      <Switch>
        <Route  path="/home">
          <Home />
        </Route>
        <Route  path="/login">
          <LoginPage />
        </Route>
        <Route  path="/prodact">
          <Prodact />
        </Route>
        <PrivateRoute path="/private">
          <ProtectedPage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

const fakeAuth={
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function AuthButton() {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: {pathname: "/"}};

  return fakeAuth.isAuthenticated ? (
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push(from));
        }}
      >
        Sign out
      </button>
  ) : (
    <p>You are not logged in.</p>
  );
}

function PrivateRoute({children, ...rest}){
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

function ProtectedPage() {
  return <h3>Private</h3>;
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: {pathname: "/prodact"}};
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <center>
      <p>You must log in to view the page at {from.pathname}</p>
      <button type="button" class="btn btn-success" onClick={login}>Log in</button>
      </center>
    </div>
  );
}

function Home(){
  const isLoggedIn = fakeAuth.isAuthenticated;
  return(
    <div>
      <center>
          <div class="container">
          <img src="https://cdn.shopify.com/s/files/1/0053/9033/6034/collections/Special_Banner_1200x1200.png?v=1609371935"
          alt="content"/>
          <h1> HI Girls!</h1>
          <br></br><p>MEDIHEAL was built upon on the founder’s belief that everyone should be empowered to reach their full beauty potential. 
            It categorizes itself as a “beauty science” company and offers beauty solutions that are more scientific in approach.</p>
            <br></br><p>Through its dedication to ongoing research and development, MEDIHEAL distinguishes itself as a sheet mask brand that values the scientific processes behind these innovative products.</p>
        </div>
      </center>
    </div>
  );
}

function Prodact(){
  let { path, url } = useRouteMatch();
  const isLoggedIn = fakeAuth.isAuthenticated;
  if (isLoggedIn == true) {
    return(
      <div>
        <center>
          <h4>All Product</h4>
          <div class="card card-group">
            <div class="card">
            <Link to={`${url}/MEDIHEAL Collagen Essential Lifting & Firming Mask USD1.99`}>
              <img src="https://d1pupqkbnrtvyv.cloudfront.net/upload/product/Collagen-Essential-Lifting-&-Firming-Mask.png"
              alt="Mediheal1" /><br></br>
              <h5>MEDIHEAL SHEET MASK</h5>
              </Link>
            </div>

            <div class="card">
            <Link to={`${url}/MEDIHEAL D.N.A Hydrating Protein Mask USD1.99`}>
              <img src="https://d1pupqkbnrtvyv.cloudfront.net/upload/product/D.N.A-Hydrating-Protein-Mask.png"
              alt="Mediheal2" /><br></br>
              <h5>MEDIHEAL SHEET MASK</h5>
              </Link>
            </div>

            <div class="card">
            <Link to={`${url}/MEDIHEAL Brightclay Mespeel Mask USD4.99`}>
              <img src="https://d1pupqkbnrtvyv.cloudfront.net/upload/product/Brightclay-Meshpeel-Mask.png"
              alt="Mediheal2" /><br></br>
              <h5>MEDIHEAL SHEET MASK</h5>
              </Link>
              <br></br>
              <br/>
            </div>
          </div>
          <br></br>

          <div className="bgLink">
          <Switch>
            <Route exact path="{path}">
              <h3>Please Choose Your Goods!</h3>
            </Route>

            <Route path={`${path}/:prodactId`}>
                <Prodacts />
            </Route>
          </Switch>
          </div>
        </center>
      </div>
    );
  }
  return (
    <div>
      <center>
        <h2>MEDIHEAL SHEET MASK</h2>
      <Link to="/login">
      <button className="btn btn-warning">Go to login page</button>
      </Link>
      </center>
    </div>
  );
}

function Prodacts(){
  let {prodactId} = useParams();

  return (
    <div>
      <h3>{prodactId}</h3>
    </div>
  );
}