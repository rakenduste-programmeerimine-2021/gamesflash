import { Form, Input, Button, message, Layout } from 'antd';
import { useContext } from "react";
import { Context } from "../store";
import { loginUser } from "../store/actions";
import React from 'react';
import '../components/App.css'

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

  //STATE log
  console.log(state);

  const showError = (error) =>{
    message.error(error.toString());
  };  

 
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: '100vh', minWidth: "100vw" }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        //initialValues={{ remember: true }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        //style={{ display: "flex", justifyContent: "center", alignItems: "center"}}
      >
        <Form.Item
          label="Username"
          name="userName"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login!
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
}

export default AuthPage;