export const setCookie_clientside = (name: string, value: string, days: number) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ""}${expires}; path=/`;
};

export const getCookie_clientside = (name: string) => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

export const FormatDate = (date: string): string => {
    let weekdays = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag']
    let months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']

    let milliseconds = Date.parse(date)
    let new_date = new Date(milliseconds)

    let weekday = new_date.getUTCDay()
    let monthday = new_date.getUTCDate()
    let month = new_date.getUTCMonth()
    let year = new_date.getUTCFullYear()

    return `${weekdays[weekday]} ${monthday} ${months[month]} ${year}`
}