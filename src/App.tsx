import Home from "./pages/Home";
import Trips from "./pages/Trips";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ToggleTheme from "./components/ToggleTheme";

function App(): React.ReactElement {
  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-center bg-gray-100 dark:bg-gray-800 transition duration-500" >
       <ToggleTheme />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/trips">
          <Trips />
        </Route>
        </Switch>
        </div>
    </Router>
  );
}

export default App;
