import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react"
import { Layout } from "antd";
import { Context } from "../store"; 
import UpdatePostPage from "./UpdatePostPage";

describe('Post updating page', () => {
    const context = {
        auth: {
            'userName': "testuser",
            "email": "testuser@gmail.com",
            "aCC": 873333
        },
    }
    const dispatch = jest.fn()
    
    it('Post content text is existing', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <BrowserRouter>
                    <UpdatePostPage />
                </BrowserRouter>
            </Context.Provider>
        ), Layout)
        const postContent = screen.queryByText(/Post content/i)
        expect(postContent).toBeTruthy();
    })
    it('Update post button text is existing', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <BrowserRouter>
                    <UpdatePostPage />
                </BrowserRouter>
            </Context.Provider>
        ), Layout)
        const updateButton = screen.queryByText(/Update post/i)
        expect(updateButton).toBeTruthy();
    })
    it('Delete post button text is existing', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <BrowserRouter>
                    <UpdatePostPage />
                </BrowserRouter>
            </Context.Provider>
        ), Layout)
        const deleteButton = screen.queryByText(/Delete post/i)
        expect(deleteButton).toBeTruthy();
    })

});