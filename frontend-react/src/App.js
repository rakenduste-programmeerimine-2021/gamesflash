import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import { DatePicker } from "antd";
import { Layout } from "antd";
import AuthPage from "./pages/AuthPage";
import './components/App.css';
import Sider from "antd/lib/layout/Sider";
import CreatePostPage from "./pages/CreatePostPage";
import UpdatePostPage from "./pages/UpdatePostPage";

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
                  <Route exact path="/createpost" component={CreatePostPage} />
                  <Route exact path="/updatepost" component={UpdatePostPage} />
                </Switch>
              </Content>
          </div>
        
      </Layout>

    </BrowserRouter>
  );
}

export default App;
