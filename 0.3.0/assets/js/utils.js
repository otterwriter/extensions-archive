const k = '65688d62-2536-432d-bbd2-23b80cc55a3c';
const domain = 'www.otterwriter.com';
const API_PRD_URL = 'https://back-office-otterwriter.herokuapp.com';
const API_LOCAL_URL = 'http://localhost:8080';
const API_URL = API_LOCAL_URL;

const greater = (a, b) => {
    const fa = a.toLowerCase(),
        fb = b.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
}

const getCurrentTemplate = async() => {
    const template = localStorage.getItem('currentResultTemplate');
    if (template === null) {
        return {};
    }
    return JSON.parse(template);
}

const saveCurrentTemplate = async(template) => {
    localStorage.setItem('currentResultTemplate', JSON.stringify(template));
}

const setCookie = async() => {
    await chrome.cookies.getAll({ domain: `.${domain}` }, async(cookies) => {
        if (cookies.length > 1) {
            const u_i = await cookies.find(elm => elm.name == 'u_i').value;
            const l_e = await cookies.find(elm => elm.name == 'l_e').value;

            if (k && u_i && u_i != "")
                document.getElementById('email').innerText = await l_e;

            else
                lock()
        } else
            lock()

    })
}

const lock = () => {
    document.getElementById('lock').style.display = 'block';
    document.getElementById('content').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", async() => {
    await setCookie()
});