import { Form, Input, InputNumber, Button, Layout, Select, Radio, message } from 'antd';
import React, { useContext } from 'react';
import { Context } from '../store';
import "../components/App.css";

function UpdatePostPage() {
    const [state, dispatch] = useContext(Context);
    var link="http://localhost:3000/post/";
    var linkToRem ='http://localhost:3000/updatepost/'
    var wl = String(window.location.href);

    const onFinish = (values) => {

        var postIDraw = wl.replace(linkToRem, '');
        var postID = parseInt(postIDraw);
        console.log("olen post id "+postID)
        console.log("olen values")
        console.log(values.post.content)
        const newData = {
            content: values.post.content
        };

        fetch("http://localhost:8081/api/post/edit/"+postID, {
            method: "PUT",
            body: JSON.stringify(newData),
            headers: {"Content-Type":"application/json"}
        }).then(response => {
          console.log(response);
            if(response.ok){
              window.location = link + postID;
            } else {
              throw new Error("Couldn't edit this post!");
            }
        }).catch((error) => {
            showError(error);
        })
    }

    const showError = (error) => {
        message.error(error.toString());
    }

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
            <Form {...layout} name="nest-messages" validateMessages={validateMessages} onFinish = {onFinish}>

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