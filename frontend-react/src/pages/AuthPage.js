import { Form, Input, Button, message, Layout } from 'antd';
import { Context } from "../store";
import { loginUser } from "../store/actions";
import React, { useContext } from 'react';
import 'antd/dist/antd.css';
import '../components/App.css';
//kui kasutame järgnevat, siis:
//saadud stack overflowist! https://stackoverflow.com/questions/57101831/react-router-how-do-i-update-the-url-without-causing-a-navigation-reload
//setTimeout(() => { window.history.replaceState(null, "profile", "/profile"); }, 1000);

function AuthPage() {
  const [state, dispatch] = useContext(Context);

    const onFinish = (values) => {
      const userData = {   
        userName: values.userName,
        password: values.password,
        
    };
      return(
        fetch("http://localhost:8081/api/auth/login", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {"Content-Type":"application/json"}
        }).then(response => {
          console.log(response);
            if(response.ok){
              return response.json();
            } else {
              throw new Error("This username or password doesnt exist!");
            }
        }).then(data => {
            dispatch(loginUser(data))
        }).catch((error) => {
            showError(error);
        })
    );

  };

  const showError = (error) =>{
    message.error(error.toString());
  };  

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  if(state.auth.userName == null || state.auth.userName == undefined){
    return (
    <Layout style={{ fontFamily: "Roboto, sans-serif", marginTop: "30px", marginLeft: "20px" }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          data-testid="username"
          label="Username"
          name="userName"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          data-testid="password"
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }} data-testid="loginButton">
          <Button type="primary" htmlType="submit">
            Login!
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
  } else {
    return (
      <Layout>
        <p>You are logged in!</p>
      </Layout>
    )
  }
  
}

export default AuthPage;