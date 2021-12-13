import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react"
import { Layout } from "antd";
import { Context } from "../store"; 
import AdminPage from "./AdminPage";

describe('Admin page', () => {
    const context = {
        auth: {
            'userName': "testuser",
            "email": "testuser@gmail.com",
            "aCC": 873333
        },
        users: {
            data: [
                {
                    'userName': "testuser",
                    "email": "testuser@gmail.com"
                }
            ]
            
        },
        posts: {
            data: [
                {
                    "userName": "testuser",
                    'postTitle': "Test title",
                    "postID": 3222222,
                    "content": "Test content",
                    "category": "gaming"
                }
            ]
        }
    }
    const dispatch = jest.fn()
    
    it('All posts text is existing', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <BrowserRouter>
                    <AdminPage />
                </BrowserRouter>
            </Context.Provider>
        ), Layout)
        const allPosts = screen.queryByText(/ALL POSTS/i)
        expect(allPosts).toBeTruthy();
    })
    it('All users text is existing', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <BrowserRouter>
                    <AdminPage />
                </BrowserRouter>
            </Context.Provider>
        ), Layout)
        const allUsers = screen.queryByText(/ALL USERS/i)
        expect(allUsers).toBeTruthy();
    })

});