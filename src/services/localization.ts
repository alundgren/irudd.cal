let locale = 'sv-SE' //TODO: Support changing this in settings

const shortDateOptions : Intl.DateTimeFormatOptions = { dateStyle: "short"  };

export function formatShortDate(d: Date) {
    return d?.toLocaleDateString(locale, shortDateOptions)
}

export function formatShortTime(d: Date) {
    return d?.toLocaleTimeString(locale, { hour: '2-digit', minute:'2-digit' })
}