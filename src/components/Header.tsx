import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Dropdown } from "react-bootstrap";
import './Header.scss';
import { useDispatch, useSelector } from "react-redux";
import { setDateSkew, CommonState } from "../features/common/commonSlice";
import React, { useEffect } from "react";
import { ActiveMenuItemCode } from "./Shell";
import DateService from "../services/DateService";
import { formatShortDate } from "../services/localization";
import generateItemId from "../services/generateItemId";
import { createTrainingSession } from "../features/training/trainingSlice";
import { useNavigate } from "react-router-dom";

let containerStyle = {
    gap: 15
}
let logoStyle = {
    height: 45,
    width: 45
}

export interface HeaderProps {
    activeMenuItem : ActiveMenuItemCode
}

function Header({activeMenuItem}: HeaderProps) {
    let menuItemClasses = (n: string) => `dropdown-item ${activeMenuItem === n ? 'active' : ''}`
    const dispatch = useDispatch();
    const dateSkew = useSelector((x: { common: CommonState }) => x.common.dateSkew);
    const navigate = useNavigate();

    const dateService = new DateService(dateSkew);
    const titleText = dateSkew === 0 ? 'Today' :  formatShortDate(dateService.getNow());    
    
    useEffect(() => {
        const FifteenMinutesAsMilliseconds = 15 * 1000 * 60;
        /*
        * PWA seem to basically never restart on iOS so if we dont
        * manually reset the time-travel a bit every time a new day happens there is this wierd behaviour.
        * To combat this we reset to no skew after a short time with the intent that the user will "always"
        * open the app with today selected.
        */
        if(dateSkew !== 0) {
            const timer = setTimeout(() => {
                dispatch(setDateSkew(0));    
            }, FifteenMinutesAsMilliseconds);
            return () => clearTimeout(timer);            
        }
    }, [dateSkew, dispatch]);

    const isForwardTimeTravelAllowed = dateSkew < 0;    
    let handleChangeDateSkew = (skewChange: number) => {
        return (evt : React.SyntheticEvent) => {
            evt.preventDefault();
            if(skewChange > 0 && !isForwardTimeTravelAllowed) {
                return;
            }
            const newDateSkew = dateSkew + skewChange;
            dispatch(setDateSkew(newDateSkew));
        };
    }
    
    let handleNewTrainingSessionClicked = (e : React.SyntheticEvent) => {
        e.preventDefault();

        let now = dateService.getNow();
        let newTrainingSessionId = generateItemId();
        dispatch(createTrainingSession({ 
            id: newTrainingSessionId,
            yearMonthDay: DateService.getYearMonthDay(now),
            fullIsoDate: DateService.toIsoString(now),
            journalText: ''
         }));

        navigate(`/training-session/${newTrainingSessionId}`);
    }
    
    return (
        <div>
            <div className="navbar-light d-flex flex-row p-2 align-self-center fs-3 border-bottom" style={containerStyle}>
                <a href={'/'} style={logoStyle}><img src="/logo.svg" alt="Letter T" style={logoStyle} /></a>
                <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                    <Button variant='outline-secondary' size='sm' style={{marginRight:3}}>
                        <FontAwesomeIcon icon={faMinus} onClick={handleChangeDateSkew(-1)}/>
                    </Button>                    
                    <span>{titleText}</span>
                    <Button variant='outline-secondary' size='sm' style={{marginLeft:3}} disabled={!isForwardTimeTravelAllowed} onClick={handleChangeDateSkew(1)}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </div>
                <Dropdown align='end' className="hamurger-menu">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        <FontAwesomeIcon icon={faBars} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <a href={'/'} data-rr-ui-dropdown-item="" className={menuItemClasses('Summary')}>Summary</a>
                        <a href='/create-training-session' onClick={handleNewTrainingSessionClicked} data-rr-ui-dropdown-item="" className={menuItemClasses('')}>New training session</a>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}

export default Header;