import { Form, Input, InputNumber, Button, Layout, Select, Radio } from 'antd';
import React from 'react';
import "../components/App.css";

function CreatePostPage() {
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
    const [value, setValue] = React.useState(1);
    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    return (
        <Layout style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: '100vh', minWidth: "100vw" }}>
            <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
                <Form.Item
                    name={['post', 'title']}
                    label="Post title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <label className="categoryLabel">Category:</label>
                <Radio.Group onChange={onChange} value={value} style={{ display: "flex", marginLeft: -25, marginBottom: 70, marginTop: -22, justifyContent: "center" }}>
                    <Radio value={1}>Social</Radio>
                    <Radio value={2}>Gaming</Radio>
                </Radio.Group>

                <Form.Item name={['post', 'content']} label="Post content">
                    <Input.TextArea style={{ width: 500, height: 200 }} />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Create new post
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    );

}

export default CreatePostPage;