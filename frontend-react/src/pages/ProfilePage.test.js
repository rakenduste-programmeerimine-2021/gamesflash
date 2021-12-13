import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react"
import { Layout } from "antd";
import { Context } from "../store"; 
import ProfilePage from "./ProfilePage";

describe('Profile page', () => {
    const context = {
        auth: {
            'userName': "testuser",
            'creationDate': "currentDate",
            "postCount": 12,
            "commentCount": 13
        },
    }
    const dispatch = jest.fn()
    
    it('creationDate equals currentDate', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <BrowserRouter>
                    <ProfilePage />
                </BrowserRouter>
            </Context.Provider>
        ), Layout)
        const creationDate = screen.queryByText(/Account creation date/i)
        expect(creationDate).toBeTruthy();
    })
    it('postCount equals 12', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <BrowserRouter>
                    <ProfilePage />
                </BrowserRouter>
            </Context.Provider>
        ), Layout)
        const postCount = screen.queryByText(/12/i)
        expect(postCount).toBeTruthy();
    })
    it('commentCount equals 13', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <BrowserRouter>
                    <ProfilePage />
                </BrowserRouter>
            </Context.Provider>
        ), Layout)
        const commentCount = screen.queryByText(/13/i)
        expect(commentCount).toBeTruthy();
    })

});