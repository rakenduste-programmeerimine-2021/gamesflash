import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react"
import { Layout } from "antd";
import { Context } from "../store"; 
import Header from "./Header";
import { act } from "react-dom/test-utils";

describe('Logged in users header', () => {
    const context = {
        auth: {
            'userName': "test",
            'email': "test@test.ee",
            'token': "1gj5kj343hdgk5436",
            'aCC': 0
        }
    }
    const dispatch = jest.fn()
    it('Header stuff', () => {  
        act(() => {
            render((
                <Context.Provider value={[context, dispatch]}>
                    <BrowserRouter>
                        <Header />
                    </BrowserRouter>
                </Context.Provider>
            ), Layout)
        });
        
        const logbtn = screen.queryByText(/Logout/i)
        const profile = screen.queryByText(/Your profile/i)
        const post = screen.queryByText(/Create new post/i)
        const social = screen.queryByText(/Social/i)
        const gaming = screen.queryByText(/Gaming/i)
        expect(logbtn).toBeTruthy();
        expect(profile).toBeTruthy();
        expect(post).toBeTruthy();
        expect(social).toBeTruthy();
        expect(gaming).toBeTruthy();    
    })
});
describe('Logged out users header', () => {
    const context = {
        auth: {
            'userName': null,
            'email': null,
            'token': null,
            'aCC': 0
        }
    }
    const dispatch = jest.fn()
    it('Header stuff', () => {  
        act(() => {
            render((
                <Context.Provider value={[context, dispatch]}>
                    <BrowserRouter>
                        <Header />
                    </BrowserRouter>
                </Context.Provider>
            ), Layout)
        });
        const login = screen.queryByText(/Login/i)
        const logout = screen.queryByText(/Register/i)
        const post = screen.queryByText(/Create new post/i)
        const social = screen.queryByText(/Social/i)
        const gaming = screen.queryByText(/Gaming/i)
        expect(login).toBeTruthy();
        expect(logout).toBeTruthy();
        expect(post).toBeTruthy();
        expect(social).toBeTruthy();
        expect(gaming).toBeTruthy();    
    })
});
describe('Admins header', () => {
    const context = {
        auth: {
            'userName': "test",
            'email': "test@test.tlu",
            'token': "something31231",
            'aCC': 873333
        }
    }
    const dispatch = jest.fn()
    it('Header stuff', () => {  
        act(() => {
            render((
                <Context.Provider value={[context, dispatch]}>
                    <BrowserRouter>
                        <Header />
                    </BrowserRouter>
                </Context.Provider>
            ), Layout)
        });
        const admin = screen.queryByText(/Admin view/i)
        expect(admin).toBeTruthy();    
    })
});