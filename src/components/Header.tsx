import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import './Header.scss';

let containerStyle = {
    gap: 15
}
let logoStyle = {
    height: 45,
    width: 45
}

export interface HeaderProps {
    titleText: string,
    activeMenuItem : 'day' | 'week' | 'settings'
}

function Header({titleText, activeMenuItem}: HeaderProps) {
    let menuItemClasses = (n: string) => `dropdown-item ${activeMenuItem === n ? 'active' : ''}`

    return (
        <div>
            <div className="navbar-light d-flex flex-row p-2 align-self-center fs-3 border-bottom" style={containerStyle}>
                <a href={'/'} style={logoStyle}><img src="/logo.svg" alt="Letter T" style={logoStyle} /></a>
                <div className="flex-grow-1 d-flex justify-content-center"><span>{titleText}</span></div>
                <Dropdown align='end' className="hamurger-menu">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        <FontAwesomeIcon icon={faBars} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <a href={'/'} data-rr-ui-dropdown-item="" className={menuItemClasses('day')}>Day</a>
                        <a href={'/week'} data-rr-ui-dropdown-item="" className={menuItemClasses('week')}>Week</a>
                        <a href={'/settings'} data-rr-ui-dropdown-item="" className={menuItemClasses('settings')}>Settings</a>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}

export default Header;