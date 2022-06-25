const getCurrentTime = () => {
    let pad = function(num) { return ('00'+num).slice(-2) };
    let date = new Date();
    date = date.getFullYear()         + '-' +
        pad(date.getMonth() + 1)  + '-' +
        pad(date.getDate())       + ' ' +
        pad(date.getHours())      + ':' +
        pad(date.getMinutes())    + ':' +
        pad(date.getSeconds());
    return date;
};

const getCurrentTimeWithoutSeconds = () => {
    let pad = function(num) { return ('00'+num).slice(-2) };
    let date = new Date();
    date = date.getFullYear()         + '-' +
        pad(date.getMonth() + 1)  + '-' +
        pad(date.getDate())       + ' ' +
        pad(date.getHours())      + ':' +
        pad(date.getMinutes());
    return date;
}

module.exports = {
    getCurrentTime,
    getCurrentTimeWithoutSeconds
};