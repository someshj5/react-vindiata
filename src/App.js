import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Auth from "./components/Auth";
import EmployeeAdd from "./components/EmployeeAdd";
import EmployeeList from "./components/EmployeeList";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Auth />
          </Route>
          <Route exact path="/employee">
            <EmployeeList />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
