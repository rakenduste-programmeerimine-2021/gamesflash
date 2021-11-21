import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import { DatePicker } from "antd";
import { Layout } from "antd";
import AuthPage from "./pages/AuthPage";
import './components/App.css';
import Sider from "antd/lib/layout/Sider";

function App() {
  const { Content, Footer } = Layout;

  return (
    <BrowserRouter>
      <Layout>
        <Route path="/" component={Header} />
            <div id="container">
              <Content>
                <Switch>
                  <Route exact path="/login" component={AuthPage} />
                  <Route exact path="/register" component={RegistrationPage} />
                  <Route exact path="/profile" component={ProfilePage} />
                </Switch>
              </Content>
          </div>
        
      </Layout>
    </BrowserRouter>
  );
}

export default App;
