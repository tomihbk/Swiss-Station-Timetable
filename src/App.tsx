import Home from "./pages/Home";
import Trips from "./pages/Trips";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ToggleTheme from "./components/ToggleTheme";
import { Helmet } from "react-helmet";

function App(): React.ReactElement {
  return (
    <Router>
      <Helmet>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c"/>
          <meta name="theme-color" content="#ffffff"/>
          </Helmet>
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
