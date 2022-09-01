const k = '65688d62-2536-432d-bbd2-23b80cc55a3c';

const domain = 'www.otterwriter.com';
const API = 'https://back-office-otterwriter.herokuapp.com';
const LOCAL = 'http://localhost:8000';

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


const getUserTemplates = async () => {
    const templates = localStorage.getItem('templates');
    if (templates === null) {
        return [];
    }
    return JSON.parse(templates);
}

const saveUserTemplates = async (templates) => {
    localStorage.setItem('templates', JSON.stringify(templates));
}

const getCurrentTemplate = async () => {
    const template = localStorage.getItem('currentResultTemplate');
    if (template === null) {
        return {};
    }
    return JSON.parse(template);
}

const saveCurrentTemplate = async (template) => {
    localStorage.setItem('currentResultTemplate', JSON.stringify(template));
}

const getUserVars = async () => {
    const templates = localStorage.getItem('vars');
    if (templates === null) {
        return {};
    }
    return JSON.parse(templates);
}