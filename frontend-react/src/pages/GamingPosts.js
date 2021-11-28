import { Table, Tag, Space, Layout, Search, Input } from 'antd';
import React from "react";

function GamingPosts() {
    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          render: text => <a>{text}</a>,
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
            key: '1',
            title: 'Whats up? I recently discovered this awesome game called Raid: Shadow Legends and I think some of you might be interested!',
            user: 'Oliver',
            date: new Date("1970").toLocaleString(),
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
        <h1 className="postCategoryLabel">GAMING</h1>
        <Search placeholder="Search a post..." onChange={handleSearch} style={{ width: 250, paddingBottom: 5 }} />
        <Table dataSource={
          data.filter((json) =>
            json.title.toLowerCase().includes(search.toLowerCase())
          )
        } columns={columns} size="middle" />
    </Layout>
  );
}


export default GamingPosts;