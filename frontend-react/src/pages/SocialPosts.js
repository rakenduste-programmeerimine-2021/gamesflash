import { Table, Tag, Space, Layout, Search, Input, message } from 'antd';
import React, { useEffect, useContext } from "react";
import { Context } from '../store';
import { addPost, emptyPost } from '../store/actions';
import { Link } from 'react-router-dom';

function SocialPosts() {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    fetch("http://localhost:8081/api/post/social", {
        method: "GET"
    }).then(response => {
        if(response.ok){
          return response.json();
        } else {
          throw new Error("Error getting gaming posts!");
        }
    }).then(data => {
        dispatch(emptyPost());
        dispatch(addPost(data));
    }).catch((error) => {
        showError(error);
    })
  }, [])
  
  /* siin testisin kas töötab. Kasutada hiljem editimises ja post viewis -egr

  var neww = window.location + "/" + 3322;
  console.log(neww);

  */

  let rows;   
  if(state.posts.data !== undefined){     
    const iteratedData = state.posts.data.map(row => ({       
      title: row.postTitle,
      postid: row.postID,
      user: row.userName,       
      date: row.creationDate,        
    }))        
      rows = [       
        ...iteratedData     
      ];   
    } else {     
      rows = []   
    };

  const showError = (error) =>{
    message.error(error.toString());
  };

    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Post ID',
          dataIndex: 'postid',
          key: 'postid',
        },
        {
          title: 'User',
          dataIndex: 'user',
          key: 'user',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
          defaultSortOrder: 'descend',
          sorter: (a, b) => new Date(a.date) - new Date(b.date),
        },
      ];
      
      const data = [
        {
          key: state.posts.data.postID,
          title: state.posts.data.postTitle,
          postid: state.posts.data.postID,
          user: state.posts.data.userName,
          date: new Date(state.posts.data.creationDate).toLocaleString(),
        },
        {
          key: '2',
          title: 'Hey how can I install Minecraft mods on version 1.16.2? I have tried everything but it cant seem to work',
          user: 'Enri',
          date: new Date("1999").toLocaleString(),
        },
        {
          key: '3',
          title: 'WOW! CS:GO is such a fun time! I dont remember the last time I was so dissapointed in a game!!',
          user: 'Ander',
          date: new Date("2020").toLocaleString(),
        },
        {
          key: '4',
          title: 'Yesterday I won a game of Dota and got rankup, 10/10 very nice',
          user: 'Andy',
          date: new Date("2021").toLocaleString(),
        },
      ];

      const { Search } = Input;

      const [search, setSearch] = React.useState("");
      const handleSearch = (event) => {
        setSearch(event.target.value);
        console.log(event.target.value);
      };


return(
    <Layout>
        <h1 className="postCategoryLabel">SOCIAL</h1>
        <Search placeholder="Search a post..." onChange={handleSearch} style={{ width: 250, paddingBottom: 5 }} />
        <Table dataSource={
          /*data.filter((json) =>
            json.title.toLowerCase().includes(search.toLowerCase())
          )*/
          rows
        } columns={columns} size="middle" onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              console.log("Tabeli onclick töötab!");
              <Link to="localhost:3000/post/:postid" />
            }, // click row
          };
        }} />
    </Layout>
    );
}


export default SocialPosts;