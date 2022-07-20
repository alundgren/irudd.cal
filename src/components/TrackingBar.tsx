import { CSSProperties } from "react"
import './TrackingBar.scss';

export interface TrackingBarProps {
    currentValue: number,
    maxValue: number,
    onClick?: () => void
}
export default function TrackingBar({currentValue, maxValue, onClick}: TrackingBarProps) {
    let progressPercentActual = Math.round(100 * currentValue / maxValue)
    let isAboveMax = progressPercentActual > 100
    let progressPercent = isAboveMax ? 100 : progressPercentActual
    let remainingPercent = 100 - progressPercent

    let progressBarClasses = 'progress-bar' + (isAboveMax ? ' bg-warning' : ' bg-info')
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