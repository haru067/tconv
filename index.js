#!/usr/bin/env node

const { DateTime } = require('luxon');
let argv = require('minimist')(process.argv.slice(2));

function parse(text) {
    let dt = DateTime.fromISO(text);
    if (dt.isValid) return toUnixtime(dt);
    return toHumanReadableDate(text);
}

function toUnixtime(dateTime) {
    return Math.floor(dateTime / 1000);
}

function toHumanReadableDate(text) {
    const timeMsec = parseInt(text) * 1000;
    const dt = DateTime.fromMillis(timeMsec);
    return dt.toLocaleString(DateTime.DATETIME_HUGE_WITH_SECONDS);
}

if (argv._.length == 0) {
    // Unixtime: 1318781876
    console.log(toUnixtime(DateTime.local()));
    return;
}

for (let arg of argv._) {
    const parsed = parse(arg);
    console.log(parsed);
}
