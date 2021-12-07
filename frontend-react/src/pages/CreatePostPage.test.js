import react from "react";
import { render, screen } from "@testing-library/react"
import CreatePostPage from "./CreatePostPage";
import { Layout } from "antd";
import { Context } from "../store";

describe('Create post Page', () => {
    const context = {
            auth: {
                'userName': null,
                'email': null
            }
        }
        const dispatch = jest.fn()
    it('Post title input', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <CreatePostPage />
            </Context.Provider>
        ), Layout)
        const titleInput = screen.queryByText(/Post title/i)
        expect(titleInput).toBeTruthy();
    })
    it('Category radio', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <CreatePostPage />
            </Context.Provider>
        ), Layout)
        const CategoryRadioSocial = screen.queryByText(/Social/i)
        const CategoryRadioGaming = screen.queryByText(/Gaming/i)
        expect(CategoryRadioSocial).toBeTruthy();
        expect(CategoryRadioGaming).toBeTruthy();
    })
    it('Post content input', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <CreatePostPage />
            </Context.Provider>
        ), Layout)
        const postContent = screen.queryByText(/Post Content/i)
        expect(postContent).toBeTruthy();
    })
    it('Submit button', () => {
        render((
            <Context.Provider value={[context, dispatch]}>
                <CreatePostPage />
            </Context.Provider>
        ), Layout)
        const submitButton = screen.getByText(/Create new post/i)
        expect(submitButton).toBeTruthy();
    })

});
