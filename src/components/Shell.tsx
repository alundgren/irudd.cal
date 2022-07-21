import Header from './Header';
import './Shell.scss';

export interface ShellProps {
    activeMenuItem : ActiveMenuItemCode,
    titleText: string
    children?: React.ReactNode,
    dateSkew: number, 
    setDateSkew: React.Dispatch<React.SetStateAction<number>>
}

export type ActiveMenuItemCode = 'day' | 'week' | 'settings'

export default function Shell({activeMenuItem, titleText, children, dateSkew, setDateSkew}: ShellProps)  {
    return (
        <div className="container-fluid d-flex flex-column bg-light p-3 irudd-track-container">
            <Header titleText={titleText} activeMenuItem={activeMenuItem} dateSkew={dateSkew} setDateSkew={setDateSkew} />
            <div className="d-flex flex-grow-1 justify-content-center align-items-start">
                {children}
            </div>
        </div>
    )
}