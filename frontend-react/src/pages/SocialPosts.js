import { Table, Tag, Space, Layout, Search, Input, message } from 'antd';
import React, { useEffect, useContext } from "react";
import { Context } from '../store';
import { addPost, emptyPost } from '../store/actions';
import { Link } from 'react-router-dom';

function SocialPosts() {
  const [state, dispatch] = useContext(Context);
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    fetch("http://localhost:8081/api/post/social", {
        method: "GET"
    }).then(response => {
        if(response.ok){
          return response.json();
        } else {
          throw new Error("Error getting social posts!");
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

      const { Search } = Input;

      const handleSearch = (event) => {
        setSearch(event.target.value);
      };


return(
    <Layout style={{ fontFamily: "Roboto, sans-serif", marginLeft: "20px", marginTop: "10px" }}>
        <h1 className="postCategoryLabel" style={{ marginLeft: "5px" }}>SOCIAL</h1>
        <Search placeholder="Search a post..." onChange={handleSearch} style={{ width: 250, paddingBottom: 5 }} />
        <Table dataSource={
          rows.filter((json) =>
            json.title.toLowerCase().includes(search.toLowerCase())
          )
        } columns={columns} size="middle" />
    </Layout>
    );
}


export default SocialPosts;