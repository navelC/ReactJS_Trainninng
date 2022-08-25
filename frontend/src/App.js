import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { routes } from "./const";
import { MainLayout } from "./layouts";
import { Header, Category } from "./components";

function App() {
  return (
    <MainLayout>
      <Router>
        <Header />
        <Category />
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </Router>
      <ToastContainer />
    </MainLayout>
  );
}

export default App;
