let locale = 'sv-SE' //TODO: Support changing this in settings

const shortDateOptions : Intl.DateTimeFormatOptions = { dateStyle: "short"  };

export function formatShortDate(d: Date) {
    return d?.toLocaleDateString(locale, shortDateOptions)
}

export function formatShortTime(d: Date) {
    return d?.toLocaleTimeString(locale, { hour: '2-digit', minute:'2-digit' })
}

export function getYearMonthDay(d: Date) {
    return parseInt(`${d.getFullYear()}${d.getMonth().toString().padStart(2, '0')}${d.getDay().toString().padStart(2, '0')}`)
}

export function addDaysToDate(d: Date, nrOfDays: number) {
    let d2 = new Date(d.valueOf());
    d2.setDate(d2.getDate() + nrOfDays);
    return d2;
}