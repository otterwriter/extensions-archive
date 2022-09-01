const templateName = document.getElementById('templates');
const credit = document.getElementById('credit');
const username = document.getElementById('username');
const result = document.getElementById('result');
const copyBtn = document.getElementById("btn");
const resetBtn = document.getElementById("reset");

let templates = [];

templateName.addEventListener('change', (e) => {
    const choosenTemplate = templates.filter(elm => elm.id == e.target.value)[0]
    result.value = choosenTemplate.text;
    username.innerHTML = choosenTemplate.author.username;
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


const getTemplates = async () => {
    return fetch('http://localhost:1337/templates').then(r => r.json()).then(result => {
        return result;
    })
}

const sortTemplates = async (templates) => {
    const sortedTemplates = await templates.sort((a, b) => {
        let fa = a.author.username.toLowerCase(),
            fb = b.author.username.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
    return sortedTemplates;
}

const main = async () => {

    templates = await getTemplates();

    templates = await sortTemplates(templates);
    console.log(templates[0].id)

    let optgroup;

    let lastElm = {
        author: { firstname: '' }
    };

    await templates.forEach(elm => {
        if (elm.author.username != lastElm.author.username) {
            optgroup = document.createElement("optgroup");
            optgroup.label = elm.author.username;
            templateName.add(optgroup);
        }

        const option = document.createElement("option");
        option.text = elm.title;
        option.value = elm.id;
        optgroup.append(option);
        lastElm = elm;
    })
}

main();