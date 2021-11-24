import { Form, Input, InputNumber, Button, Layout, Select, Radio } from 'antd';
import React from 'react';
import "../components/App.css";

function UpdatePostPage() {
    const layout = {
        labelCol: {
        span: 8,
        },
        wrapperCol: {
        span: 16,
        },
    };
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };



    return (
        <Layout style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: '100vh', minWidth: "100vw" }}>
            <Form {...layout} name="nest-messages" validateMessages={validateMessages}>

                <Form.Item name={['post', 'content']} label="Post content">
                    <Input.TextArea style={{ width: 500, height: 200 }} />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Update post
                    </Button>
                    <Button type="primary" danger style={{ marginLeft: 5 }}>
                        Delete post
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    );

}

export default UpdatePostPage;