import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Auth from "./components/Auth";
import TaskList from "./components/TaskList";
import TaskAdd from "./components/TaskAdd";
import TaskDetails from "./components/TaskDetails";

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
          <Route exact path="/tasks">
            <TaskList />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/task/:id">
            <TaskDetails />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
