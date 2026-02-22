export const getTimeAfterPost = (date: number) => {
    let minutes = 0, hours = 0, seconds = 0;
    const actual = new Date().getTime() - date;

    seconds = actual / 1000;

    if (seconds >= 3600) {
        hours = Math.floor(seconds / 3600);
        return hours + 'h'
    }

    if (seconds >= 60) {
        minutes = Math.floor(seconds / 60);
        return minutes + 'm'
    }

    return Math.floor(seconds) + 's'
}