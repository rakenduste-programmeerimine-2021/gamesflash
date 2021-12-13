import { Form, Input, InputNumber, Button, Layout, Select, Radio, message } from 'antd';
import React, { useContext, useEffect } from 'react';
import { Context } from '../store';
import { addSinglePost } from '../store/actions';
import "../components/App.css";

function UpdatePostPage() {
    const [state, dispatch] = useContext(Context);
    var link="http://localhost:3000/post/";
    var linkToMain="http://localhost:3000/"
    var linkToRem ='http://localhost:3000/updatepost/'
    var wl = String(window.location.href);
    //see .replace() tuli stackoverflowist, sest otsisin kuidas olemasolevast stringist kindlaid andmeid kustutada!
    var postIDraw = wl.replace(linkToRem, '');
    var postID = parseInt(postIDraw);

    useEffect(() => {
        fetch("http://localhost:8081/api/post/post/"+postID, {
            method: "GET"
        }).then(response => {
            if(response.ok){
              return response.json();
            } else {
              throw new Error("This post does not exist!");
            }
        }).then(data => {
            dispatch(addSinglePost(data));
        }).catch((error) => {
            showError(error);
        })
      }, [])

    const onFinish = (values) => {

        
        const newData = {
            content: values.post.content
        };
        if(state.post.userName == state.auth.userName){
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
        } else {
            message.error("You are not the owner of this post!")
        }
    };

    const deletePost = () => {
        if(state.auth.userName == state.post.userName){
            fetch("http://localhost:8081/api/post/delete/", {
                method: "POST",
                body: JSON.stringify({ postID: postID, aCC: state.auth.aCC }),
                headers: {"Content-Type":"application/json"}
            }).then(response => {
            console.log(response);
                if(response.ok){
                    message.success("Post successfully deleted!")
                    setTimeout(() => { window.location=linkToMain; }, 2000);
                } else {
                throw new Error("Couldn't delete this post!");
                }
            }).catch((error) => {
                showError(error);
                
            })
        } else {
            message.error("You are not the owner of this post!");
        }
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
        <Layout style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: '100vh', minWidth: "100vw", fontFamily: "Roboto, sans-serif" }}>
            <Form {...layout} name="nest-messages" validateMessages={validateMessages} onFinish = {onFinish}>

                <Form.Item name={['post', 'content']} label="Post content">
                    <Input.TextArea style={{ width: 500, height: 200 }} />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Update post
                    </Button>
                    
                </Form.Item>
            </Form>
                <Button type="primary" danger style={{ marginLeft: 0 }} onClick={() => deletePost()}>
                    Delete post
                </Button>
        </Layout>
    );

}

export default UpdatePostPage;