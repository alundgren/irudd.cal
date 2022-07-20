let locale = 'sv-SE' //TODO: Support changing this in settings

const shortDateOptions : Intl.DateTimeFormatOptions = { dateStyle: "short"  };

export function formatShortDate(d: Date) {
    return d?.toLocaleDateString(locale, shortDateOptions)
}