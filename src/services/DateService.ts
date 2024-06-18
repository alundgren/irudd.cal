import { Temporal } from "temporal-polyfill";
import { CommonState } from "../features/common/commonSlice";

export default class DateService {
    constructor(private common: CommonState) {
        this.viewDate = Temporal.PlainDate.from(this.common.viewDate);
        this.actualDate = Temporal.PlainDate.from(this.common.actualDate);
        this.dateSkew = -this.viewDate.until(this.actualDate).days;
    }

    viewDate: Temporal.PlainDate;
    actualDate: Temporal.PlainDate;
    dateSkew: number;

        
    getActiveDate() {
        return DateService.addDaysToDate(this.getNow(), this.dateSkew);
    }

    getNow() {
        return new Date();
    }
    
    static getYearMonthDay(d: Date) {
        return parseInt(`${d.getFullYear()}${(d.getMonth()+1).toString().padStart(2, '0')}${d.getDate().toString().padStart(2, '0')}`);
    }

    static addDaysToDate(d: Date, nrOfDays: number) {
        let d2 = new Date(d.valueOf());
        d2.setDate(d2.getDate() + nrOfDays); //TODO: Verify rollover correctly
        return d2;
    }
    
    static toIsoString(d: Date) {
        return d.toISOString();
    }
    
    static getAbsoluteMillisecondsBetweenDates(d1: Date, d2: Date) {
        return Math.abs(d1.getTime() - d2.getTime());
    }
    
    static getItemsForDate<T extends DatedItem>(allItems: T[], todayDate: Date) {
        let today = DateService.getYearMonthDay(todayDate);
        return allItems.filter(x =>  x.yearMonthDay === today);
    }
    
    static getItemsForWeek<T extends DatedItem>(allItems: T[], todayDate: Date) {
        let today = DateService.getYearMonthDay(todayDate);
        const aWeekAgo = DateService.getYearMonthDay(DateService.addDaysToDate(todayDate, -7));
        return allItems.filter(x => x.yearMonthDay >= aWeekAgo && x.yearMonthDay < today);
    }

    static getItemsForMonth<T extends DatedItem>(allItems: T[], todayDate: Date, includeToday = false) {
        let today = DateService.getYearMonthDay(todayDate);
        const aMonthAgo = DateService.getYearMonthDay(DateService.addDaysToDate(todayDate, -30));
        return allItems.filter(x => x.yearMonthDay >= aMonthAgo && ((x.yearMonthDay < today && !includeToday) || (x.yearMonthDay <= today && includeToday)));
    }
    
    static getUniqueDateCount(items: DatedItem[]) {
        return new Set(items.map(x => x.yearMonthDay)).size;
    }
}

export interface DatedItem {
    id: string
    fullIsoDate: string
    yearMonthDay: number
}