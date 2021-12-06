import React from 'react';
import { Context } from "../store";
import {
    Form,
    Input,
    Select,
    Button,
    Layout,
    message,
} from 'antd';
import '../components/App.css';

function RegistrationPage() {
    const { Option } = Select;
    
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    
        const [form] = Form.useForm();

        const onFinish = (values) => {
            const userData = {
                userName: values.userName,
                email: values.email,
                password: values.password
                
            }
            return(
                fetch("http://localhost:8081/api/auth/signup", {
                    method: "POST",
                    body: JSON.stringify(userData),
                    headers: {"Content-Type":"application/json"}
                }).then(response => {
                    if(response.ok){
                      let success = "Account successfully created!";
                      onSuccess(success);
                    } else {
                      throw new Error("Account creation failed!");
                    }
                }).catch((error) => {
                    showError(error);
                })
            );
        };

        const showError = (error) => {
            message.error(error.toString());
        };

        const onSuccess = (success) =>{
            message.success(success.toString());
            //setTimeout tuli stackoverflowist
            //https://stackoverflow.com/questions/1190642/how-can-i-pass-a-parameter-to-a-settimeout-callback
            setTimeout(() => { window.location.reload(); }, 1000);
            
        };
    
        return (
            <Layout style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: '100vh', minWidth: "100vw" }}>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                    data-testid="username"
                        name="userName"
                        label="Username"
                        rules={[
                            { 
                                required: true, 
                                message: 'Please input your username!', 
                                whitespace: true 
                            },
                            {
                                max: 20,
                                message: 'Username length must be less than 20!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        data-testid="email"
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid email!',
                            },
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                
                    <Form.Item
                    data-testid="password"
                        name="password"
                        label="Password"
                        rules={[
                            {
                                min: 8, 
                                required: true,
                                message: 'Your password must be 8 charaters long, include at least 1 upper and 1 lowercase letter and a symbol!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                
                    <Form.Item
                    data-testid="confrim_password"
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                        Register account
                        </Button>
                    </Form.Item>

                </Form>
            </Layout>
        );
}

export default RegistrationPage;