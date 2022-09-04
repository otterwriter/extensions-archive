const name = document.getElementById('name');
const text = document.getElementById('result');
const global = document.getElementById('global');
const form = document.getElementById('addTemplate');
const msg = document.getElementById('message');


form.addEventListener("submit", async (e) => {
    e.preventDefault();

    await chrome.cookies.getAll({ domain: `.${domain}` }, async (cookies) => {
        if (cookies.length > 1) {
            u_i = await cookies.find(elm => elm.name == 'u_i').value;
            l_e = await cookies.find(elm => elm.name == 'l_e').value;
            api_key = await cookies.find(elm => elm.name == 'k').value;
            
            const data = {
                name: name.value,
                text: text.value,
                global: global.checked,
                email: l_e
            };

            const response = await fetch(`${API_URL}/api/v1/templates/add?uid=${u_i}&k=${api_key}`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(data)
            }).then(() => {
                msg.style.display = "block";
                name.value = "";
                text.value = "";
                global.checked = false;
            })
        }
    })
});

document.getElementById('vars').addEventListener('change', (e) => {
    insertAtCursor(text, e.target.value)
})

const insertAtCursor = (myField, myValue) => {
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
