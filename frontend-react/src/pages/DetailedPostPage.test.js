import react from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react"
import DetailedPostPage from "./DetailedPostPage"
import { Layout } from "antd";

import { Context } from "../store"; 



describe('Detailed post page', () => {
    const context = {
        auth: {
            'userName': null,
            'email': null
        },
        post: {
            'category': 'social',
            'content': 'This post is made to test fome functions',
            'creationDate': '2021-11-26T14:08:19.134Z',
            'postID': 332211112233,
            'postTitle': 'Test post under social',
            'userName': 'posttester'
        },
        comments: {
            data: [
                {
                    'commentContent': 'YOO THIS IS A WICKED COMMENT',
                    'commentDate': '2021-11-26T16:01:54.819Z',
                    'commentID': 123123,
                    'postID': 332211112233,
                    'userName': 'usermen'
                },
                {
                    'commentContent': 'YOO THIS IS A SICK COMMENT222212',
                    'commentDate': '2021-11-26T16:02:43.829Z',
                    'commentID': 22222,
                    'postID': 332211112233,
                    'userName': 'dabber'
                }
            ]
            
        }
    }
    const dispatch = jest.fn()
    it('Post title', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <BrowserRouter>
                    <DetailedPostPage />
                </BrowserRouter>
            </Context.Provider>
        ), Layout)
        const title = screen.queryByText(/Test post under social/i)
        expect(title).toBeTruthy();
    })
    it('Content', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <BrowserRouter>
                    <DetailedPostPage />
                </BrowserRouter>
            </Context.Provider>
        ), Layout)
        const Content = screen.queryByText(/This post is made to test fome functions/i)
        expect(Content).toBeTruthy();
    })
    it('Comment content', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <BrowserRouter>
                    <DetailedPostPage />
                </BrowserRouter>
            </Context.Provider>
        ), Layout)
        const commentContent = screen.queryByText(/YOO THIS IS A WICKED COMMENT/)
        expect(commentContent).toBeTruthy();
    })
    it('Comment button', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <BrowserRouter>
                    <DetailedPostPage />
                </BrowserRouter>
            </Context.Provider>
        ), Layout)
        const CommentButton = screen.queryByText(/Add new comment/i)
        expect(CommentButton).toBeTruthy();
    })
});