import React, { useContext, useDebugValue } from "react";
import { render, screen } from "@testing-library/react"
import AuthPage from "./AuthPage";
import { Layout } from "antd";
import { Context } from "../store";
import { loginUser, USER_LOGIN } from "../store/actions";
//Contextiga seotud errori fixi saime siit (Also aitäh Annelile!):
//https://stackoverflow.com/questions/66856814/react-jest-testing-error-object-of-usecontext-not-defined

  //SIDENOTE
  //Teha pigem isLoggedIn: true/false peale (äkki lahendab selle setting state jama)(?)


describe('Logged in users login page', () => {
    const context = {
            auth: {
                'userName': 'test',
                'email': 'test@test.ee'
            }
        }
        const dispatch = jest.fn()
    it('Checks if username input exists', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <AuthPage />
            </Context.Provider>
        ), Layout)
        const userNameInput = screen.queryByText("Username:")
        expect(userNameInput).toBeNull()
    })
    it('Checks if password input exists', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <AuthPage />
            </Context.Provider>
        ), Layout)
        const passwordInput = screen.queryByText("Password:")
        expect(passwordInput).toBeNull()
    })
    it('Checks if login button exists', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <AuthPage />
            </Context.Provider>
        ), Layout)
        const loginButton = screen.queryByText("Login!")
        expect(loginButton).toBeNull()
    })
    it('you are logged in text', () => {
        render((
            <Context.Provider value={[context, dispatch]}>
                <AuthPage />
            </Context.Provider>
        ), Layout)
        const loginButton = screen.getByText(/You are logged in!/i)
        expect(loginButton).toBeTruthy();
    })

});

describe('Logged out users page', () => {
    const context = {
            auth: {
                'userName': null,
                'email': null
            }
        }
        const dispatch = jest.fn()
    it('Checks if username input exists', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <AuthPage />
            </Context.Provider>
        ), Layout)
        const userNameInput = screen.getByText(/Username/i)
        expect(userNameInput).toBeTruthy();
    })
    it('Checks if password input exists', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <AuthPage />
            </Context.Provider>
        ), Layout)
        const passwordInput = screen.getByText(/Password/i)
        expect(passwordInput).toBeTruthy();
    })
    it('Checks if login button exists', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <AuthPage />
            </Context.Provider>
        ), Layout)
        const loginButton = screen.getByText(/Login!/i)
        expect(loginButton).toBeTruthy();
    })

});
