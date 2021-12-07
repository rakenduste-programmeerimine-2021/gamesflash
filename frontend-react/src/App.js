import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import { Layout } from "antd";
import AuthPage from "./pages/AuthPage";
import './components/App.css';
import CreatePostPage from "./pages/CreatePostPage";
import UpdatePostPage from "./pages/UpdatePostPage";
import SocialPosts from "./pages/SocialPosts";
import GamingPosts from "./pages/GamingPosts";
import DetailedPostPage from "./pages/DetailedPostPage";
import AdminPage from "./pages/AdminPage";

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
                  <Route path="/updatepost" component={UpdatePostPage} />
                  <Route exact path="/social" component={SocialPosts} />
                  <Route exact path="/gaming" component={GamingPosts} />
                  <Route path="/post" component={DetailedPostPage} />
                  <Route exact path="/adminpage" component={AdminPage} />
                </Switch>
              </Content>
          </div>
        
      </Layout>

    </BrowserRouter>
  );
}

export default App;
