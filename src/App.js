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


function App() {
  return (
    <div className="App">
      <Router>

        <Navbar />

        <Switch>
          <Route exact path="">
            <HomePage></HomePage>
          </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
