import { BrowserRouter, Route, Switch } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import { DatePicker } from "antd";
import { Layout } from "antd";
//import RegistrationPage from "./pages/RegistrationPage";
import AuthPage from "./pages/AuthPage";
import './components/App.css';
const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/login" component={AuthPage} />
        <Route exact path="/register" component={RegistrationPage} />
      </Switch>
    </Layout>
    </BrowserRouter>
  );
}

export default App;
