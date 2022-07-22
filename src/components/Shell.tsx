import Header from './Header';
import './Shell.scss';
import React from "react";

export interface ShellProps {
    activeMenuItem : ActiveMenuItemCode,
    titleText: string
    children?: React.ReactNode
}

export type ActiveMenuItemCode = 'day' | 'week' | 'settings'

export default function Shell({activeMenuItem, titleText, children}: ShellProps)  {
    return (
        <div className="container-fluid d-flex flex-column bg-light p-3 irudd-track-container">
            <Header titleText={titleText} activeMenuItem={activeMenuItem} />
            <div className="d-flex flex-grow-1 justify-content-center align-items-start">
                {children}
            </div>
        </div>
    )
}