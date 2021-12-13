import react from "react";
import { render, screen, act } from "@testing-library/react"
import { Layout } from "antd";
import { Context } from "./store";
import App from './App';
import { BrowserRouter } from "react-router-dom";

describe('Logged in account', () => {
    const context = {
        auth: {
            'userName': "test",
            'email': "test@test.ee",
            'token': "1gj5kj343hdgk5436",
            'aCC': 0
        }
    }
    const dispatch = jest.fn()
  it('App routes', () => {  
      act(() => {
          render((
              <Context.Provider value={[context, dispatch]}>
                  <BrowserRouter>
                      <App />
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
describe('Logged out account', () => {
  const context = {
      auth: {
          'userName': null,
          'email': null,
          'token': null,
          'aCC': 0
      }
  }
  const dispatch = jest.fn()
  it('App routes', () => {  
      act(() => {
          render((
              <Context.Provider value={[context, dispatch]}>
                  <BrowserRouter>
                      <App />
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
describe('Admin account', () => {
  const context = {
      auth: {
          'userName': "test",
          'email': "test@test.tlu",
          'token': "something31231",
          'aCC': 873333
      }
  }
  const dispatch = jest.fn()
  it('App routes', () => {  
      act(() => {
          render((
              <Context.Provider value={[context, dispatch]}>
                  <BrowserRouter>
                      <App />
                  </BrowserRouter>
              </Context.Provider>
          ), Layout)
      });
      const admin = screen.queryByText(/Admin view/i)
      expect(admin).toBeTruthy();    
  })
});

