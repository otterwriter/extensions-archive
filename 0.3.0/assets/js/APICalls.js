const domain = 'www.otterwriter.com';
const API_PRD_URL = 'https://back-office-otterwriter.herokuapp.com';
const API_LOCAL_URL = 'http://localhost:8000';

const apiCalls = async (funcName) => {
    return chrome.cookies.getAll({ domain: `${domain}` }, async (cookies) => {
        if (cookies.length < 1) {
            return "error";
        }

        const u_i = await cookies.find(elm => elm.name == 'u_i').value;
        const api_key = await cookies.find(elm => elm.name == 'k').value;

        return execFunction(u_i, api_key, funcName)
    })
}

const execFunction = async (u_i, api_key, funcName) => {
    switch (funcName) {
        case "getAllTemplates":
            return sendRequest(u_i, api_key, '/templates');
    }
}

const sendRequest = async (u_i, api_key, req,) => {
    return await fetch(`${API_PRD_URL}/api/v1${req}?uid=${u_i}&k=${api_key}`).then(r => r.json()).then(result => {
        return result;
    })
}