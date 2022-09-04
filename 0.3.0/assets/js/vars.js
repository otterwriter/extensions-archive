const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const company = document.getElementById('company');
const title = document.getElementById('title');
const email = document.getElementById('email_address');
const phone = document.getElementById('phone');
const form = document.getElementById('varsForm');
const msg = document.getElementById('message');
const resetBtn = document.getElementById('reset');

let vars = null;
let u_i_global = "";
let api_key = "";

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        vars: {
            firstName: firstName.value,
            lastName: lastName.value,
            company: company.value,
            title: title.value,
            email: email.value,
            phone: phone.value
        }
    };

    await fetch(`${API}/api/v1/profiles/vars?uid=${u_i_global}&k=${api_key}`, {
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

    msg.style.display = "block";
});

resetBtn.addEventListener('click', (e) => {
    firstName.value = '';
    lastName.value = '';
    company.value = '';
    title.value = '';
    email.value = '';
    phone.value = '';
})

const renderVars = async () => {
    fetch(`${API_URL}/api/v1/profiles/vars?uid=${u_i_global}&k=${api_key}`).then(r => r.json()).then(vars => {
        firstName.value = vars.firstName ? vars.firstName : null;
        lastName.value = vars.lastName ? vars.lastName : null;
        company.value = vars.company ? vars.company : null;
        title.value = vars.title ? vars.title : null;
        email.value = vars.email ? vars.email : null;
        phone.value = vars.phone ? vars.phone : null;
    })

}

const main = async () => {
    await chrome.cookies.getAll({ domain: `.${domain}` }, async (cookies) => {
        if (cookies.length > 1) {
            u_i_global = await cookies.find(elm => elm.name == 'u_i').value;
            api_key = await cookies.find(elm => elm.name == 'k').value;
            await renderVars();
        }
    })
}

main();
