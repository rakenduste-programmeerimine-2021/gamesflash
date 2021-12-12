import { Table, Tag, Space, Layout, Search, Input, message } from 'antd';
import React, { useEffect, useContext } from "react";
import { Context } from '../store';
import { addPost, addUser, removeUser, emptyPost, emptyUser } from '../store/actions';
import { Link } from 'react-router-dom';

function AdminPage() {
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
    fetch("http://localhost:8081/api/post/gaming", {
        method: "GET"
    }).then(response => {
        if(response.ok){
          return response.json();
        } else {
          throw new Error("Error getting gaming posts!");
        }
    }).then(data => {
        dispatch(addPost(data));
    }).catch((error) => {
        showError(error);
    })
    fetch("http://localhost:8081/api/auth/allusers", {
        method: "GET"
    }).then(response => {
        if(response.ok){
          return response.json();
        } else {
          throw new Error("Error getting all user data!");
        }
    }).then(data => {
      dispatch(emptyUser());
      dispatch(addUser(data));
  }).catch((error) => {
      showError(error);
  })
  }, [])
  
  const showError = (error) =>{
    message.error(error.toString());
  };

  let postRows;   
  if(state.posts.data !== undefined){     
    const iteratedData = state.posts.data.map(row => ({       
      title: row.postTitle,
      postid: row.postID,
      user: row.userName,       
      date: Date(row.creationDate).toLocaleString(),        
    }))        
      postRows = [       
        ...iteratedData     
      ];   
    } else {     
      postRows = []   
    };

  let userRows;   
  if(state.users.data !== undefined){     
    const iteratedData = state.users.data.map(row => ({       
      user: row.userName,               
    }))        
      userRows = [       
        ...iteratedData     
      ];   
    } else {     
      userRows = []   
    };
    console.log(state);

    const postColumns = [
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
        {
          title: 'Delete post',
          dataIndex: 'delete',
          key: 'delete',
          render: (text, row) => <Link to={"/post/delete/" + row.postid}>DELETE</Link>,
        },
      ];

    const userColumns = [
        {
          title: 'User',
          dataIndex: 'user',
          key: 'user',
        },
        {
          title: 'Delete user',
          dataIndex: 'delete',
          key: 'delete',
          render: (text, row) => <a onClick={() => deleteUser(row.user)}>DELETE</a>,
        },
      ];
      
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

      const deleteUser = (userName) => {
        fetch("http://localhost:8081/api/auth/delete/", {
                method: "POST",
                body: JSON.stringify({userName: userName, aCC: state.auth.aCC}),
                headers: {"Content-Type":"application/json"}
            }).then(response => {
                if(response.ok){
                    message.success("User successfully deleted!")
                    dispatch(removeUser(userName));
                } else {
                  throw new Error("Couldn't delete this user!");
                }
            }).catch((error) => {
                showError(error);
            })
      }

    return(
        <Layout style={{ fontFamily: "Roboto, sans-serif" }}>
        <h1 className="postCategoryLabel">ALL POSTS</h1>
        <Search placeholder="Search a post..." onChange={handleSearch} style={{ width: 250, paddingBottom: 5 }} />
        <Table dataSource={
            postRows.filter((json) =>
            json.title.toLowerCase().includes(search.toLowerCase())
        )
          //rows
        } columns={postColumns} size="middle" />
        <h1 className="allUsersLabel">ALL USERS</h1>
        <Search placeholder="Search a user..." onChange={handleSearch} style={{ width: 250, paddingBottom: 5 }} />
        <Table dataSource={
            userRows.filter((json) =>
            json.user.toLowerCase().includes(search.toLowerCase())
        )
          //rows
        } columns={userColumns} size="middle" />
    </Layout>
    )
}

export default AdminPage;