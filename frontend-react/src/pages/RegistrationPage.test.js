import React from "react";
import { render, screen, fireEvent } from "@testing-library/react"
import RegistrationPage from "./RegistrationPage";
import { Layout } from "antd";


it('Checks if username input exist and its value is null', () => {

    const userNameInput = screen.queryByTestId("username")
    render(<RegistrationPage />, Layout)
    expect(userNameInput).toBeNull()
    expect(screen.getByText('Username'))

})
it('Checks if password input exist and its value is null', () => {

    const passwordInput = screen.queryByTestId("password")
    render(<RegistrationPage />, Layout)
    expect(passwordInput).toBeNull()

    expect(screen.getByText('PW'))

    
})
it('Checks if confirm password input exist and its value is null', () => {

    const confirmInput = screen.queryByTestId("confirm_password")
    render(<RegistrationPage />, Layout)
    expect(confirmInput).toBeNull()

    expect(screen.getByText('Confirm PW'))

    
})
it('Checks if email input exist and its value is null', () => {

    const emailInput = screen.queryByTestId("email")
    render(<RegistrationPage />, Layout)
    expect(emailInput).toBeNull()
    expect(screen.getByText('E-mail'))
    
})