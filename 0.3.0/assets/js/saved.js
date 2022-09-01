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


if (templateName)
    templateName.addEventListener('change', (e) => {
        msg.style.display = "none";
        msg2.style.display = "none";
        const choosenTemplate = templates.filter(elm => elm.id == e.target.value)[0]
        editDiv.style.display = "block";
        name.value = choosenTemplate.name;
        result.value = choosenTemplate.text;
    })

const renderTemplates = async () => {
    const length = await templateName.options.length;
    for (i = length - 1; i >= 0; i--) {
        templateName.options[i] = null;
    }

    templates = await getUserTemplates();
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
        option.value = elm.id;
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

    const currentTemplates = await getUserTemplates();
    const index = await currentTemplates.findIndex(elm => elm.id == templateName.value);
    
    currentTemplates[index].name = await name.value;
    currentTemplates[index].text = await result.value;

    await saveUserTemplates(currentTemplates);
    
    editDiv.style.display = "none";
}

const removeTemplate = async () => {
    msg2.style.display = "block";
    let currentTemplates = await getUserTemplates();
    const templateToRemoveID = await templateName.value;
    currentTemplates = await currentTemplates.filter(template => template.id != templateToRemoveID);
    await saveUserTemplates(currentTemplates);
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

(async () => {
    await renderTemplates();
})()