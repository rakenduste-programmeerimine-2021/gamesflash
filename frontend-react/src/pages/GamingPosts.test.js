import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react"
import { Layout } from "antd";
import { Context } from "../store"; 
import GamingPosts from "./GamingPosts";

describe('Social posts exist', () => {
    const context = {
        auth: {
            'userName': null,
            'email': null
        },
        posts: {
            data: [
                {
                'category': 'gaming',
                'content': 'This post is cool',
                'creationDate': '2021-11-26T14:08:19.134Z',
                'postID': 3311221133,
                'postTitle': 'Test post under social',
                'userName': 'posttester'
                },
                {
                'category': 'gaming',
                'content': 'beep boop',
                'creationDate': '2021-11-26T14:08:19.134Z',
                'postID': 332211112233,
                'postTitle': 'Im a post lol',
                'userName': 'testaccount'
                },
                {
                'category': 'gaming',
                'content': 'f1 racecars go wroooom',
                'creationDate': '2021-11-26T14:08:19.134Z',
                'postID': 1256515632,
                'postTitle': 'Im ma muddaf-kin P.I.M.P - 50 Cent',
                'userName': 'testdude'
                }
            ]
            
        }
    }
    const dispatch = jest.fn()
    it('is showing title of all 3', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <BrowserRouter>
                    <GamingPosts />
                </BrowserRouter>
            </Context.Provider>
        ), Layout)
        const title = screen.queryByText(/Test post under social/i)
        const secondtitle = screen.queryByText(/Im a post lol/i)
        const thirdtitle = screen.queryByText(/Im ma muddaf-kin P.I.M.P - 50 Cent/i)
        expect(title).toBeTruthy();
        expect(secondtitle).toBeTruthy();
        expect(thirdtitle).toBeTruthy();
    })
    it('is showing the postid of all 3', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <BrowserRouter>
                    <GamingPosts />
                </BrowserRouter>
            </Context.Provider>
        ), Layout)
        const postid = screen.queryByText(/3311221133/i)
        const secondpostid = screen.queryByText(/332211112233/i)
        const thirdpostid = screen.queryByText(/1256515632/i)
        expect(postid).toBeTruthy();
        expect(secondpostid).toBeTruthy();
        expect(thirdpostid).toBeTruthy();
    })
    it('Date place', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <BrowserRouter>
                    <GamingPosts />
                </BrowserRouter>
            </Context.Provider>
        ), Layout)
        const date = screen.queryByText(/Date/i)
        expect(date).toBeTruthy();
    })
    it('Showing all of the users', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <BrowserRouter>
                    <GamingPosts />
                </BrowserRouter>
            </Context.Provider>
        ), Layout)
        const user = screen.queryByText(/posttester/i)
        const seconduser = screen.queryByText(/testaccount/i)
        expect(user).toBeTruthy();
        expect(seconduser).toBeTruthy();

    })
});