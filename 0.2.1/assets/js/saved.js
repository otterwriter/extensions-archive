const templateName = document.getElementById('templates');
const editDiv = document.getElementById('edit');
const editForm = document.getElementById('editForm');
const name = document.getElementById('name');
const id = document.getElementById('id');
const result = document.getElementById('result');
const msg = document.getElementById('message');
const msg2 = document.getElementById('message2');
const removeBtn = document.getElementById('removeBtn');
const global = document.getElementById('global');

let templates = [];
let u_i_global = '';
let api_key = '';

if (templateName)
    templateName.addEventListener('change', (e) => {
        msg.style.display = "none";
        msg2.style.display = "none";
        const choosenTemplate = templates.filter(elm => elm._id == e.target.value)[0]
        editDiv.style.display = "block";
        id.value = choosenTemplate._id;
        name.value = choosenTemplate.name;
        result.value = choosenTemplate.text;
    })

const getTemplates = async () => {
    return fetch(`${API}/api/v1/profiles/templates?uid=${u_i_global}&k=${api_key}`).then(r => r.json()).then(result => {
        return result;
    })
}

const renderTemplates = async () => {
    const length = await templateName.options.length;
    for (i = length - 1; i >= 0; i--) {
        templateName.options[i] = null;
    }

    templates = await getTemplates();
    templates = await templates.sort((a, b) => greater(a.name, b.name));

    const startOpt = document.createElement("option");
    startOpt.text = '...';
    startOpt.value = '-';
    startOpt.disabled = true;
    startOpt.selected = true;
    templateName.append(startOpt);

    await templates.forEach(elm => {
        const option = document.createElement("option");
        option.text = elm.name;
        option.value = elm._id;
        templateName.append(option);
        lastElm = elm;
    })
}

editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await editTemplate();
    await renderTemplates();
})

removeBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    await removeTemplate();
    await renderTemplates();
})

const editTemplate = async () => {
    msg.style.display = "block";
    const data = {
        name: name.value,
        text: result.value,
        global: global.checked,
        email: l_e
    }

    await fetch(`${API}/api/v1/templates/edit/${id.value}?uid=${u_i_global}&k=${api_key}`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    editDiv.style.display = "none";
}

const removeTemplate = async () => {
    msg2.style.display = "block";
    const data = {
        name: name.value,
        text: result.value
    }

    await fetch(`${API}/api/v1/templates/remove/${id.value}?uid=${u_i_global}&k=${api_key}`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    editDiv.style.display = "none";
}

document.getElementById('vars').addEventListener('change', (e) => {
    insertAtCursor(result, e.target.value)
})

function insertAtCursor(myField, myValue) {
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
    } else {
        myField.value += myValue;
    }
}


const main = async () => {
    await chrome.cookies.getAll({ domain: `.${domain}` }, async (cookies) => {
        if (cookies.length > 1) {
            u_i_global = await cookies.find(elm => elm.name == 'u_i').value;
            l_e = await cookies.find(elm => elm.name == 'l_e').value;
            api_key = await cookies.find(elm => elm.name == 'k').value;
            await renderTemplates();
        }
    })
}

main()