import logo from './logo.svg';
import './App.css';

// Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Components
import { Navbar } from './components/Navbar';
import { HomePage } from './components/pages/Homepage';
import { LoginPage } from './components/pages/Loginpage';
import { ProfilePage } from './components/pages/Profilepage';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <HomePage></HomePage>
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/me">
            <ProfilePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
