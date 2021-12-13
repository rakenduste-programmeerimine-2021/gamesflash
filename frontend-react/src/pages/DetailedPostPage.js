import { Card, Comment, Tooltip, List, Layout, Form, Button, Input, message } from 'antd';
import { addComment, addSinglePost, emptyComment } from '../store/actions';
import { useContext, useState, useEffect } from "react";
import { Context } from "../store";
import UpdatePostPage from './UpdatePostPage';
import { Link } from 'react-router-dom';

function DetailedPostPage() {
  const [state, dispatch] = useContext(Context);
  const [commentInput, setCommentInput] = useState("");
  var linkToRem ='http://localhost:3000/post/'
  var wl = String(window.location.href);
  //see .replace() tuli stackoverflowist, sest otsisin kuidas olemasolevast stringist kindlaid andmeid kustutada!
  var postIDraw = wl.replace(linkToRem, '');
  var postID = parseInt(postIDraw);
  
  useEffect(() => {
    console.log("olen postid " + postID)
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
        getComments(postID);
    }).catch((error) => {
        showError(error);
    })
  }, [])

  const getComments = (postID) => {
    fetch("http://localhost:8081/api/comment/comments/"+postID, {
        method: "GET"
    }).then(response => {
        if(response.ok){
          return response.json();
        } else {
          throw new Error("Error getting comments!");
        }
    }).then(data => {
        dispatch(emptyComment());
        dispatch(addComment(data));
    }).catch((error) => {
        showError(error);
    })
  };

  const showError = (error) =>{
    message.error(error.toString());
  }; 

  const handleSubmit = (e) => {
    addNewComment();
    setCommentInput("");
  };

  const addNewComment = () => {
    const newComment = {
      commentID: Date.now(),
      postID: state.post.postID,
      userName: state.auth.userName,
      commentContent: commentInput
    };

    fetch("http://localhost:8081/api/comment/postcomment/", {
            method: "POST",
            body: JSON.stringify(newComment),
            headers: {"Content-Type":"application/json"}
        }).then(response => {
          console.log("FETCHI SEES");
            if(response.ok){
              getComments(postID);
            } else {
              throw new Error("Error adding comment to DB!");
            }
        }).catch((error) => {
            showError(error);
        })
  }

  let rows;   
  if(state.comments.data !== undefined){     
    const iteratedData = state.comments.data.map(row => ({       
      postid: row.postID,
      author: row.userName,       
      content: row.commentContent,       
      datetime: row.commentDate,        
    }))        
      rows = [       
        ...iteratedData     
      ];   
    } else {     
      rows = []   
    };

    console.log(state);

    return(
        <Layout style={{ marginLeft: 50, fontFamily: "Roboto, sans-serif", marginLeft: "20px", marginTop: "10px" }}>
            <Card title={state.post.postTitle} style={{ width: 300 }}>
        <p>{state.post.content}</p>
        </Card>

        <Button type="primary" style={{ width: 300, marginTop: 10 }}>
          <Link to={"/updatepost/" + postID}>Update post</Link>
        </Button>

        <List
        className="comment-list"
        header={`${rows.length} replies`}
        itemLayout="horizontal"
        dataSource={rows}
        renderItem={item => (
        <li>
            <Comment
            author={item.author}
            content={item.content}
            datetime={item.datetime}
            />
        </li>
        )}
        />

        <Form onFinish={handleSubmit}>
          <Form.Item name={['post', 'content']} label="Comment" style={{ marginTop: "50px" }}>
                      <Input.TextArea value={commentInput} onChange={(e) => setCommentInput(e.target.value)} style={{ width: 375, height: 100, marginTop: "30px", marginLeft: "-75px" }} />
                  </Form.Item>

                  <Form.Item>
                      <Button type="primary" htmlType="submit">
                          Add new comment
                      </Button>
                  </Form.Item>
        </Form>
        </Layout>
    );
}

export default DetailedPostPage;