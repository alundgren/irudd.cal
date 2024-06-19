import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Dropdown } from "react-bootstrap";
import './Header.scss';
import { useDispatch, useSelector } from "react-redux";
import { CommonState, setDates, setViewDate } from "../features/common/commonSlice";
import React, { useEffect } from "react";
import { ActiveMenuItemCode } from "./Shell";
import DateService from "../services/DateService";
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
    let menuItemClasses = (n: ActiveMenuItemCode | null) => `dropdown-item ${activeMenuItem === n ? 'active' : ''}`
    const dispatch = useDispatch();
    const dateService = new DateService(useSelector((x: { common: CommonState }) => x.common));
    const navigate = useNavigate();

    let viewDate = dateService.viewDate;
    let actualDate = dateService.actualDate;

    const titleText = viewDate.equals(actualDate) ? 'Today' :  viewDate.toString();
    
    useEffect(() => {
        const FifteenMinutesAsMilliseconds = 15 * 1000 * 60;
        const ThirtySeconds = 60 * 1000;
        let lastChangeDate = dateService.getNow();
        let intervalId = setInterval(() => {
            let currentDate = dateService.getNow();
            let msElapsed = currentDate.valueOf() - lastChangeDate.valueOf();
            if(msElapsed > FifteenMinutesAsMilliseconds) {
                if(viewDate !== actualDate) {
                    //Reset time travel after 15 minutes
                    dispatch(setViewDate(actualDate.toString()));
                } else if(DateService.getYearMonthDay(lastChangeDate) !== DateService.getYearMonthDay(currentDate)) {
                    //Trigger an update if the date rolls over so the app isnt wierd "the morning after" if not restarted
                    dispatch(setDates(dateService.getToday().toString()));
                }
            }
        }, ThirtySeconds);
        return () => clearInterval(intervalId);
    });

    const isForwardTimeTravelAllowed = !viewDate.equals(actualDate);
    let handleChangeDateSkew = (skewChange: number) => {
        return (evt : React.SyntheticEvent) => {
            evt.preventDefault();
            if(skewChange > 0 && !isForwardTimeTravelAllowed) {
                return;
            }

            dispatch(setViewDate(viewDate.add({ days: skewChange }).toString()));
        };
    }
    
    let handleNewTrainingSessionClicked = (e : React.SyntheticEvent) => {
        e.preventDefault();

        let newTrainingSessionId = generateItemId();
        const now = dateService.getNow();
        dispatch(createTrainingSession({
            title: `Training`,
            id: newTrainingSessionId,
            yearMonthDay: DateService.getYearMonthDay(now),
            fullIsoDate: DateService.toIsoString(now),
            notes: []
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
                        <a href={'/'} data-rr-ui-dropdown-item="" className={menuItemClasses('summary')}>Summary</a>
                        <a href='/create-training-session' onClick={handleNewTrainingSessionClicked} data-rr-ui-dropdown-item="" className={menuItemClasses(null)}>New training session</a>
                        <a href={'/settings'} data-rr-ui-dropdown-item="" className={menuItemClasses('settings')}>Settings</a>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}

export default Header;