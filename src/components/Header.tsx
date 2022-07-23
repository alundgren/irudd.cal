import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import './Header.scss';
import { useDispatch } from "react-redux";
import { changeDateSkew } from "../features/common/commonSlice";
import React from "react";
import { ActiveMenuItemCode } from "./Shell";

let containerStyle = {
    gap: 15
}
let logoStyle = {
    height: 45,
    width: 45
}

export interface HeaderProps {
    titleText: string,
    activeMenuItem : ActiveMenuItemCode
}

function Header({titleText, activeMenuItem}: HeaderProps) {
    let menuItemClasses = (n: string) => `dropdown-item ${activeMenuItem === n ? 'active' : ''}`
    const dispatch = useDispatch();
    
    let handleChangeDateSkew = (skew: number) => {
        return (evt : React.SyntheticEvent) => {
            evt.preventDefault();
            dispatch(changeDateSkew(skew));
        };
    }

    return (
        <div>
            <div className="navbar-light d-flex flex-row p-2 align-self-center fs-3 border-bottom" style={containerStyle}>
                <a href={'/'} style={logoStyle}><img src="/logo.svg" alt="Letter T" style={logoStyle} /></a>
                <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon icon={faMinus} onClick={handleChangeDateSkew(-1)}/>
                    <span>{titleText}</span>
                    <FontAwesomeIcon icon={faPlus} onClick={handleChangeDateSkew(1)} />
                </div>
                <Dropdown align='end' className="hamurger-menu">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        <FontAwesomeIcon icon={faBars} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <a href={'/'} data-rr-ui-dropdown-item="" className={menuItemClasses('Summary')}>Summary</a>
                        <a href={'/settings'} data-rr-ui-dropdown-item="" className={menuItemClasses('settings')}>Settings</a>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}

export default Header;