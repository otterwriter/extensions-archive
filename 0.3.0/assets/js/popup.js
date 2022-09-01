const templateName = document.getElementById("templatesDrop");
const favoritesTemplates = document.getElementById("favoritesTemplates");
const mineTemplates = document.getElementById("mineTemplates");
const credit = document.getElementById("credit");
const username = document.getElementById("username");
const result = document.getElementById("result");
const copyBtn = document.getElementById("btn");
const author = document.getElementById("author");
const resetBtn = document.getElementById("reset");
const search_tab = document.getElementById("search_tab");
const all_tab = document.getElementById("all_tab");
const favorites_tab = document.getElementById("favorites_tab");
const mine_tab = document.getElementById("mine_tab");
const views = document.querySelectorAll('input[name="view"]');
const searchInput = document.getElementById("myInput");
// const saveToFavoritesBtn = document.getElementById("saveToFavoritesBtn");

let userTemplates = [];
let vars = {};
let templatesTitle = [];

// saveToFavoritesBtn.addEventListener('click', async () => {
//     saveToFavorites()
// })

views[0].addEventListener('change', async (e) => {
    await tabsOff()
    search_tab.style.display = 'block';
})

views[1].addEventListener('change', async (e) => {
    await tabsOff()
    mine_tab.style.display = 'block';
})

views[2].addEventListener('change', async (e) => {
    await tabsOff()
    favorites_tab.style.display = 'block';
})

views[3].addEventListener('change', async (e) => {
    await tabsOff()
    all_tab.style.display = 'block';
})

templateName.addEventListener('change', (e) => {
    x(e);
})

favoritesTemplates.addEventListener('change', (e) => {
    x(e);
})

mineTemplates.addEventListener('change', (e) => {
    y(e);
})

const x = (e) => {
    let choosenTemplate = templates.filter(elm => elm._id == e.target.value)[0];
    if (choosenTemplate) {
        saveCurrentTemplate(choosenTemplate);
        username.innerHTML = choosenTemplate.sub;
        if (choosenTemplate.author.name != 'Global') {
            author.innerHTML = `Template by ${choosenTemplate.author.name}`;
            author.style.display = 'block';
        } else
            author.style.display = 'none';
    }
    else {
        choosenTemplate = userTemplates.filter(elm => elm.id == e.target.value)[0];
        username.innerHTML = 'My Templates';
        if (choosenTemplate.author != undefined) {
            author.innerHTML = `Template by ${choosenTemplate.author}`;
            author.style.display = 'block';
        } else
            author.style.display = 'none';
    }
    setResult(choosenTemplate.text);
    credit.style.display = 'block';
}

const y = (e) => {
    const choosenTemplate = userTemplates.filter(elm => elm.id == e.target.value)[0];
    setResult(choosenTemplate.text);
}


const tabsOff = async () => {
    all_tab.style.display = 'none';
    search_tab.style.display = 'none';
    favorites_tab.style.display = 'none';
    mine_tab.style.display = 'none';
    reset();
}

const reset = async () => {
    templateName.value = '-';
    favoritesTemplates.value = '-';
    mineTemplates.value = '-';
    searchInput.value = '';
    result.value = '';
    credit.style.display = 'none';
}

const autocomplete = (inp, arr) => {
    let currentFocus;
    inp.addEventListener("input", function (e) {
        var a,
            b,
            i,
            val = this.value;
        closeAllLists();
        if (!val || val.length < 3) {
            return false;
        }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("style", "cursor: pointer")
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this
            .parentNode
            .appendChild(a);
        let index = -1;
        let countResults = 0;
        let date = new Date();
        date.setDate(date.getDate() - 14);
        for (i = 0; i < arr.length; i++) {
            const templateName = arr[i].name;
            index = templateName.toLowerCase().indexOf(val.toLowerCase());
            if (index > -1) {
                countResults++;
                document
                    .getElementById("searchOptions")
                    .style
                    .display = "none";
                b = document.createElement("DIV");
                b.innerHTML += templateName.substr(0, index);
                b.innerHTML += "<strong>" + templateName.substr(index, val.length) + "</strong>";
                b.innerHTML += templateName.substr(index + val.length);
                if (date < new Date(arr[i].date)) {
                    b.innerHTML += " <span class='badge badge-sm badge-danger' style='font-size: 10px; background-color: #a39bcb; color: white;'>New<span>"
                }
                b.innerHTML += "<input type='hidden' value='" + templateName + "'>";
                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();

                    const lastIndex = inp.value.lastIndexOf("(");

                    const title = inp.value.substring(0, lastIndex - 1);
                    showResult(title);
                });
                a.appendChild(b);
            }
        }

        if (!countResults) {
            closeAllLists();
        }
    });

    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x)
            x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x)
                    x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        if (!x)
            return false;

        removeActive(x);
        if (currentFocus >= x.length)
            currentFocus = 0;
        if (currentFocus < 0)
            currentFocus = (x.length - 1);

        x[currentFocus]
            .classList
            .add("autocomplete-active");
    }

    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i]
                .classList
                .remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i]
                    .parentNode
                    .removeChild(x[i]);
            }
        }
        document
            .getElementById("searchOptions")
            .style
            .display = "block";

    }
    
    document
        .addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
}

autocomplete(searchInput, templatesTitle);

const showResult = async (title) => {
    const x = document.getElementById("result")
    let text = 'Waiting ...';
    templates.forEach(elm => {

        if (elm.name == title) {
            saveCurrentTemplate(elm);
            text = elm.text
        }
    })

    x.innerHTML = await setResult(text);
}

const setResult = async (choosenTemplate) => {
    result.value = await changeVars(choosenTemplate);
}

const changeVars = async (text) => {
    if (vars.firstName && vars.lastName)
        text = await replaceAll(text, '[your_name]', `${vars.firstName} ${vars.lastName}`);

    if (vars.firstName)
        text = await replaceAll(text, '[first_name]', vars.firstName);

    if (vars.lastName)
        text = await replaceAll(text, '[last_name]', vars.lastName);

    if (vars.company)
        text = await replaceAll(text, '[company]', vars.company);

    if (vars.title)
        text = await replaceAll(text, '[title]', vars.title);

    if (vars.email)
        text = await replaceAll(text, '[your_email]', vars.email);

    if (vars.phone)
        text = await replaceAll(text, '[your_phone]', vars.phone);

    if (vars.phone && vars.email)
        text = text
            .replace('[contact_information]', vars.phone ? `Email: ${vars.email} | Phone: ${vars.phone}` : vars.email);
    return text;
}

const replaceAll = async (text, replacement, value) => {
    text = text
        .replace(replacement, value)
        .replace(replacement, value)
        .replace(replacement, value)
        .replace(replacement, value)

    return text;
}

copyBtn.addEventListener("click", function (e) {
    result.select();
    result.setSelectionRange(0, 99999);

    document.execCommand("copy");
})

const getGlobalTemplates = async () => {
    return fetch(`https://back-office-otterwriter.herokuapp.com/api/v1/templates?uid=sdlMdkL8inN8arfYFXUMhWoKdPk2&k=65688d62-2536-432d-bbd2-23b80cc55a3c`).then(r => r.json()).then(result => {
        return result;
    })
}

const saveToFavorites = async () => {
    const currentTemplate = await getCurrentTemplate();
    const favoritesTemplatesArray = await getFavorites();
    const found = await favoritesTemplatesArray.find(elm => elm._id === currentTemplate._id);
    if (!found) {
        const templates = [...favoritesTemplatesArray, currentTemplate];
        localStorage.setItem('favoritesTemplates', JSON.stringify(templates));
        createNewOption(favoritesTemplates, currentTemplate);
    }

}

const getFavorites = async () => {
    const templates = localStorage.getItem('favoritesTemplates');
    if (templates === null) {
        return [];
    }
    return JSON.parse(templates);
}

const createNewOption = (optgroup, elm) => {
    const option = document.createElement("option");
    option.text = elm.name;
    let date = new Date();
    date.setDate(date.getDate() - 14);
    if (date < new Date(elm.createdAt)) {
        option.text =  option.text + ' 👋';
    }
    option.value = elm._id;
    optgroup.append(option);
}

const createNewOptionGroup = async (optgroup, subject) => {
    optgroup.label = subject;
    templateName.add(optgroup);
}

const displayFirstTabsOff = async () => {
    all_tab.style.display = 'none';
    favorites_tab.style.display = 'none';
    mine_tab.style.display = 'none';
}

const sortTemplatesByName = async (templates) => templates.sort((a, b) => greater(a.name, b.name));
const sortTemplatesBySub = async (templates) => templates.sort((a, b) => greater(a.sub, b.sub));

const setTemplateTitles = async (templates) => {
    for (const template of templates) {
        templatesTitle.push({ name: `${template.name} (${template.sub})`, date: template.createdAt });
    }
}

const getAllTemplates = async () => {
    let templates = await getGlobalTemplates();
    templates = await sortTemplatesByName(templates);
    templates = await sortTemplatesBySub(templates);
    return templates;
}

(async () => {
    await displayFirstTabsOff();

    templates = await getAllTemplates();
    vars = await getUserVars();

    userTemplates = await getUserTemplates();
    userTemplates = await sortTemplatesByName(userTemplates);

    await setTemplateTitles(templates)

    let optgroup;

    let lastElm = {
        sub: ''
    };

    if (templateName) {
        await templates.forEach(elm => {
            if (elm.sub != lastElm.sub) {
                optgroup = document.createElement("optgroup");
                createNewOptionGroup(optgroup, elm.sub);
            }
                createNewOption(optgroup, elm);
                lastElm = elm;
        })
    }

    favorites = await getFavorites();
    favorites = await await sortTemplatesByName(favorites);

    if (favoritesTemplates) await favorites.forEach(elm => createNewOption(favoritesTemplates, elm));

    if (mineTemplates) {
        await userTemplates.forEach(elm => {
            const newElm = {
                name: elm.name,
                _id: elm.id
            }
            createNewOption(mineTemplates, newElm);
        })
    }
})()
