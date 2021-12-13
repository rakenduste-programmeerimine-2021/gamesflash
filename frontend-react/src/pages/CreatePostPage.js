import { Form, Input, Button, Layout, Radio, message } from 'antd';
import { useContext } from "react";
import { Context } from "../store";
import { Link } from 'react-router-dom';
import React from 'react';
import "../components/App.css";

function CreatePostPage() {
    const [state, dispatch] = useContext(Context);
    var cpostID;

    const onFinish = (values) => {
        var cat;
        if(value == 1) {
            cat = "social"
        } else {
            cat = "gaming"
        }
        if(state.auth.userName == null || state.auth.userName == undefined ){
            message.error("You need to be logged in to create a post!");
        } else {        
            cpostID = Date.now()
            const newPost = {
                userName: state.auth.userName,
                postID: cpostID,
                postTitle: values.title,
                content: values.content,
                category: cat
            };
            postFetch(newPost);
        };
        
    };

    const postFetch = (newPost) => {
        return (
        fetch("http://localhost:8081/api/post/create", {
            method: "POST",
            body: JSON.stringify(newPost),
            headers: {"Content-Type":"application/json", "Access-Control-Expose-Headers":"Authorization"}
        }).then(response => {
            if(response.ok){
                let success = "Post successfully created!";
                onSuccess(success);
            } else {
                throw new Error("Failed to create post!");
            }
        }).catch((error) => {
            showError(error);
        })
        );
    }
    const showError = (error) => {
        message.error(error.toString());
    };

    const onSuccess = (success) =>{
        message.success(success.toString());
        return (
            <Link to= {"/post/"+cpostID} />
        )
    };

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
        setValue(e.target.value);
    };


    return (
        <Layout style={{ fontFamily: "Roboto, sans-serif", marginTop: "30px", marginLeft: "-85px" }}>
            <Form {...layout} name="nest-messages" validateMessages={validateMessages} onFinish={onFinish}>
                <Form.Item
                    name='title'
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

                <Form.Item name='content' label="Post content">
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