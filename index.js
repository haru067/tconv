#!/usr/bin/env node

const { DateTime } = require('luxon');
const argv = require('minimist')(process.argv.slice(2));

function parse(text) {
    text = text.toString().replace(/\//g, '-').replace(/ /g, 'T'); // to ISO format
    const dt = DateTime.fromISO(text);
    if (dt.isValid) return unixtime(dt);
    if (text && text.toString().length == 12) {
        const src = text.toString();
        const y = parseInt(src.substr(0, 4));
        const m = parseInt(src.substr(4, 2));
        const d = parseInt(src.substr(6, 2));
        const h = parseInt(src.substr(8, 2));
        const min = parseInt(src.substr(10, 2));
        return unixtime(DateTime.local(y, m, d, h, min))
    }

    if (text && text.toString().length == 14) {
        const src = text.toString();
        const y = parseInt(src.substr(0, 4));
        const m = parseInt(src.substr(4, 2));
        const d = parseInt(src.substr(6, 2));
        const h = parseInt(src.substr(8, 2));
        const min = parseInt(src.substr(10, 2));
        const s = parseInt(src.substr(12, 2));
        return unixtime(DateTime.local(y, m, d, h, min, s))
    }

    return humanReadableDate(text);
}

function unixtime(dateTime) {
    return Math.floor(dateTime / 1000);
}

function humanReadableDate(text) {
    const timeMsec = parseInt(text) * 1000;
    const dt = DateTime.fromMillis(timeMsec);
    const wd = getJapanseWeekday(dt.weekday);
    const displayDate = `${dt.year}年${dt.month}月${dt.day}日（${wd}）${dt.hour}時${dt.minute}分${dt.second}秒`;
    return displayDate;
    // return dt.toLocaleString(DateTime.DATETIME_HUGE_WITH_SECONDS);
}

function getJapanseWeekday(weekday) {
    const jp = ['?', '月', '火', '水', '木', '金', '土', '日'];
    return jp[weekday] || '?';
}

if (argv._.length == 0) {
    // Unixtime: 1318781876
    console.log(unixtime(DateTime.local()));
    return;
}

for (let arg of argv._) {
    const parsed = parse(arg);
    console.log(parsed);
}
