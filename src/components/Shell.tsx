import Header from './Header';
import './Shell.scss';
import React from "react";

export interface ShellProps {
    activeMenuItem : ActiveMenuItemCode,
    children?: React.ReactNode
}

export type ActiveMenuItemCode = 'summary' | 'settings' | 'training-session'

export default function Shell({activeMenuItem, children}: ShellProps)  {
    return (
        <div className="container-fluid d-flex flex-column bg-light p-3 irudd-track-container">
            <Header activeMenuItem={activeMenuItem} />
            <div className="d-flex flex-grow-1 justify-content-center align-items-start">
                {children}
            </div>
        </div>
    )
}