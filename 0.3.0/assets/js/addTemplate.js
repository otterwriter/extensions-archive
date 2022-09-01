const name = document.getElementById('name');
const text = document.getElementById('result');
const global = document.getElementById('global');
const form = document.getElementById('addTemplate');
const msg = document.getElementById('message');

const saveTemplate = async (template) => {
    const currentTemplates = await getUserTemplates();
    await currentTemplates.push(template);
    await saveUserTemplates(currentTemplates);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const template = {
        name: name.value,
        text: text.value,
        id: (new Date()).getTime()
    };
    await saveTemplate(template);
    msg.style.display = "block";
    name.value = "";
    text.value = "";
    global.checked = false;
});

document.getElementById('vars').addEventListener('change', (e) => {
    insertAtCursor(text, e.target.value)
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
