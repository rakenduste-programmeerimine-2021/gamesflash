import { Card, Comment, Tooltip, List, Layout, Form, Button, Input, message } from 'antd';
import { addComment, addSinglePost } from '../store/actions';
import { useContext, useState, useEffect } from "react";
import { Context } from "../store";

function DetailedPostPage() {
  const [state, dispatch] = useContext(Context);
  var postID = 332211112233;
  
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
        dispatch(addComment(data));
    }).catch((error) => {
        showError(error);
    })
  };

  const showError = (error) =>{
    message.error(error.toString());
  }; 

  
  console.log(state);

    const data = [
        {
          author: 'Oliver',
          content: (
            <p>
              WOW! That is crazyyyy!
            </p>
          ),
          datetime: (
            new Date("2021").toLocaleString()
          ),
        },

        {
          author: 'Andy',
          content: (
            <p>
              Congratulations man, really happy for you!!!!
            </p>
          ),
          datetime: (
            new Date("2021").toLocaleString()
          ),
        },

        {
            author: 'Enri',
            content: (
              <p>
                Haha for sure, enjoy it :)
              </p>
            ),
            datetime: (
              new Date("2021").toLocaleString()
            ),
          },

      ];
      

    return(
        <Layout style={{marginLeft: 50}}>
            <Card title="Post title HERE" style={{ width: 300 }}>
        <p>Post content</p>
        </Card>

        <List
        className="comment-list"
        header={`${data.length} replies`}
        itemLayout="horizontal"
        dataSource={data}
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

        <Form>
        <Form.Item name={['post', 'content']} label="Comment">
                    <Input.TextArea style={{ width: 300, height: 100 }} />
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