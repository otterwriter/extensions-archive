const templateName = document.getElementById('templates');
const credit = document.getElementById('credit');
const username = document.getElementById('username');
const result = document.getElementById('result');
const copyBtn = document.getElementById("btn");
const author = document.getElementById("author");
const resetBtn = document.getElementById("reset");

let templates = [];
let userTemplates = [];
let vars = {};


if (templateName)
    templateName.addEventListener('change', (e) => {
        let choosenTemplate = templates.filter(elm => elm._id == e.target.value)[0];
        if (choosenTemplate) {
            username.innerHTML = choosenTemplate.sub;
            if (choosenTemplate.author.name != 'Global') {
                author.innerHTML = `Template by ${choosenTemplate.author.name}`;
                author.style.display = "block";
            } else
                author.style.display = "none";
        }
        else {
            choosenTemplate = userTemplates.filter(elm => elm._id == e.target.value)[0];
            username.innerHTML = 'My Templates';
            if (choosenTemplate.author) {
                author.innerHTML = `Template by ${choosenTemplate.author}`;
                author.style.display = "block";
            } else
                author.style.display = "none";
        }

        let text = choosenTemplate.text;

        if (vars.firstName && vars.lastName)
            text = text
                .replace('[your_name]', `${vars.firstName} ${vars.lastName}`)
                .replace('[your_name]', `${vars.firstName} ${vars.lastName}`)
                .replace('[your_name]', `${vars.firstName} ${vars.lastName}`)
                .replace('[your_name]', `${vars.firstName} ${vars.lastName}`)

        if (vars.firstName)
            text = text
                .replace('[first_name]', vars.firstName)
                .replace('[first_name]', vars.firstName)
                .replace('[first_name]', vars.firstName)
                .replace('[first_name]', vars.firstName)


        if (vars.lastName)
            text = text
                .replace('[last_name]', vars.lastName)
                .replace('[last_name]', vars.lastName)
                .replace('[last_name]', vars.lastName)
                .replace('[last_name]', vars.lastName)



        if (vars.company)
            text = text
                .replace('[company]', vars.company)
                .replace('[company]', vars.company)
                .replace('[company]', vars.company)
                .replace('[company]', vars.company)


        if (vars.title)
            text = text
                .replace('[title]', vars.title)
                .replace('[title]', vars.title)
                .replace('[title]', vars.title)
                .replace('[title]', vars.title)


        if (vars.email)
            text = text
                .replace('[your_email]', vars.email)
                .replace('[your_email]', vars.email)
                .replace('[your_email]', vars.email)
                .replace('[your_email]', vars.email)


        if (vars.phone)
            text = text
                .replace('[your_phone]', vars.phone)
                .replace('[your_phone]', vars.phone)
                .replace('[your_phone]', vars.phone)
                .replace('[your_phone]', vars.phone)


        if (vars.phone && vars.email)
            text = text
                .replace('[contact_information]', vars.phone ? `Email: ${vars.email} | Phone: ${vars.phone}` : vars.email);
        result.value = text;
        credit.style.display = "block";

    })

copyBtn.addEventListener("click", function (e) {
    result.select();
    result.setSelectionRange(0, 99999);

    document.execCommand("copy");
})

resetBtn.addEventListener("click", function (e) {
    result.value = "";
})


const getGlobalTemplates = async (u_i, api_key) => {
    return fetch(`${API}/api/v1/templates?uid=${u_i}&k=${api_key}`).then(r => r.json()).then(result => {
        return result;
    })
}

const getUserTemplates = async (u_i, api_key) => {
    return fetch(`${API}/api/v1/profiles/templates?uid=${u_i}&k=${api_key}`).then(r => r.json()).then(result => {
        return result;
    })
}

const getVars = async (u_i, api_key) => {
    return fetch(`${API}/api/v1/profiles/vars?uid=${u_i}&k=${api_key}`).then(r => r.json()).then(result => {
        return result;
    });
}

const main = async () => {
    await chrome.cookies.getAll({ domain: `${domain}` }, async (cookies) => {
        if (cookies.length > 1) {
            const u_i = await cookies.find(elm => elm.name == 'u_i').value;
            const api_key = await cookies.find(elm => elm.name == 'k').value;
            try {
                templates = await getGlobalTemplates(u_i, api_key);
                vars = await getVars(u_i, api_key);
            }
            catch {
                lock()
            }
            templates = await templates.sort((a, b) => greater(a.name, b.name));

            templates = await templates.sort((a, b) => greater(a.sub, b.sub));

            userTemplates = await getUserTemplates(u_i, api_key);

            let optgroup;

            let lastElm = {
                sub: ''
            };

            if (templateName) {
                if (userTemplates.length) {
                    optgroup = document.createElement("optgroup");
                    optgroup.label = 'My Templates';
                    templateName.add(optgroup);
                    await userTemplates.forEach(elm => {
                        const option = document.createElement("option");
                        option.text = elm.name;
                        option.value = elm._id;
                        optgroup.append(option);
                    })
                }
                await templates.forEach(elm => {
                    if (elm.sub != lastElm.sub) {
                        optgroup = document.createElement("optgroup");
                        optgroup.label = elm.sub;
                        templateName.add(optgroup);
                    }

                    const option = document.createElement("option");
                    option.text = elm.name;
                    option.value = elm._id;
                    optgroup.append(option);
                    lastElm = elm;
                })
            }
        }
    })
}

main();