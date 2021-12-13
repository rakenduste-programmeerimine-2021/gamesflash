import { Layout, Menu, Breadcrumb, Descriptions } from 'antd';
import { useContext } from "react";
import { Context } from "../store";
import "../components/App.css";

function ProfilePage() {
    const { Header, Content, Footer, Sider } = Layout;
    const [state, dispatch] = useContext(Context);
    const date = new Date(state.auth.creationDate).toLocaleString();

    return (
            <Layout className="site-layout" style={{ fontFamily: "Roboto, sans-serif" }}>
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Profile</Breadcrumb.Item>
                        <Breadcrumb.Item>{state.auth.userName}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Descriptions title="User Info" layout="vertical">
                            <Descriptions.Item label="Username" style={{ fontWeight: "bold" }}>{state.auth.userName}</Descriptions.Item>
                            <span></span>
                            <Descriptions.Item label="Account creation date" style={{ fontWeight: "bold" }}>{date}</Descriptions.Item>
                            <Descriptions.Item label="Number of posts" style={{ fontWeight: "bold" }}>{state.auth.postCount}</Descriptions.Item>
                            <span></span>
                            <Descriptions.Item label="Number of comments" style={{ fontWeight: "bold" }}>{state.auth.commentCount}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </Content>
        </Layout>
    );
    
}

export default ProfilePage;