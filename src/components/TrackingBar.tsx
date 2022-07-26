import { CSSProperties } from "react"
import './TrackingBar.scss';

export interface TrackingBarProps {
    currentValue: number,
    maxValue: number,
    onClick?: () => void
    moreIsBetter?: boolean,
    noWarnings?: boolean
}
export default function TrackingBar({currentValue, maxValue, onClick, moreIsBetter, noWarnings}: TrackingBarProps) {
    let progressPercentActual = Math.round(100 * currentValue / maxValue)
    let isAboveMax = progressPercentActual > 100
    let isBelowMaxButAboveZero = progressPercentActual > 0 && progressPercentActual < 100;
    let isWarningLevel = noWarnings 
        ? false 
        : ((moreIsBetter && isBelowMaxButAboveZero) || (!moreIsBetter && isAboveMax));
    let progressPercent = isAboveMax ? 100 : progressPercentActual;
    let remainingPercent = 100 - progressPercent;

    let progressBarClasses = 'progress-bar' + (isWarningLevel ? ' bg-warning' : ' bg-info')
    let progressLabelStyle : CSSProperties = {
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'black'
    }
    return (
        <div onClick={onClick}>
            <div className='progress-container'>
                <div className="progress">
                    <div className={progressBarClasses} role="progressbar" style={{ width: `${progressPercent}%` }} aria-valuenow={remainingPercent} aria-valuemin={0} aria-valuemax={100}>
                        <span style={progressLabelStyle}>{`${currentValue}/${maxValue}`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}