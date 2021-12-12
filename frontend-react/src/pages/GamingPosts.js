import { Table, Tag, Space, Layout, Input, message, } from 'antd';
import React, { useEffect, useContext } from "react";
import { Context } from '../store';
import { addPost, emptyPost } from '../store/actions';
import { BrowserRouter, Link, Route, useHistory } from 'react-router-dom';


function GamingPosts() {
  const [state, dispatch] = useContext(Context);
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    fetch("http://localhost:8081/api/post/gaming", {
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

  const showError = (error) =>{
    message.error(error.toString());
  };

  let rows;   
  if(state.posts.data !== undefined){     
    const iteratedData = state.posts.data.map(row => ({       
      title: row.postTitle,
      postid: row.postID,
      user: row.userName,       
      date: Date(row.creationDate).toLocaleString(),        
    }))        
      rows = [       
        ...iteratedData     
      ];   
    } else {     
      rows = []   
    };

    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          render: (text, row) => <Link to={"/post/" + row.postid}>{text}</Link>,
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
      
      console.log(state);

      const data = [
        {
            key: toString(state.posts.data.postID),
            title: toString(state.posts.data.postTitle),
            postid: toString(state.posts.data.postID),
            user: toString(state.posts.data.userName),
            date: toString(state.posts.data.creationDate),
        },
      ];

      const { Search } = Input;
      
      const handleSearch = (event) => {
        setSearch(event.target.value);
        console.log(event.target.value);
        
      };

      console.log(data);
      console.log(state);
    

  return(
    <Layout style={{ fontFamily: "Roboto, sans-serif" }}>
        <h1 className="postCategoryLabel">GAMING</h1>
        <Search placeholder="Search a post..." onChange={handleSearch} style={{ width: 250, paddingBottom: 5 }} />
        <Table dataSource={
          rows.filter((json) =>
            json.title.toLowerCase().includes(search.toLowerCase())
          )
          //rows
        } columns={columns} size="middle" />
    </Layout>
  );
}


export default GamingPosts;