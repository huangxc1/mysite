import dayjs from "dayjs";

/**
 * 
 * @param {Number} date  时间戳
 */
export function getDateFormat(date,showTime = false) {
    let str = dayjs(+date).format("YYYY-MM-DD")
    if (showTime) {
        str = dayjs(+date).format("YYYY-MM-DD HH:mm:ss")
    }
    return str
}



