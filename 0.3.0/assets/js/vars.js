const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const company = document.getElementById('company');
const title = document.getElementById('title');
const email = document.getElementById('email_address');
const phone = document.getElementById('phone');
const form = document.getElementById('varsForm');
const msg = document.getElementById('message');
const resetBtn = document.getElementById('reset');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const vars = {
        firstName: firstName.value,
        lastName: lastName.value,
        company: company.value,
        title: title.value,
        email: email.value,
        phone: phone.value
    };

    const vars_serialized = JSON.stringify(vars);
    localStorage.setItem("vars", vars_serialized);

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
    const vars = await getUserVars();

    firstName.value = vars.firstName ? vars.firstName : null;
    lastName.value = vars.lastName ? vars.lastName : null;
    company.value = vars.company ? vars.company : null;
    title.value = vars.title ? vars.title : null;
    email.value = vars.email ? vars.email : null;
    phone.value = vars.phone ? vars.phone : null;
}

const main = async () => {
    await renderVars();
}

main();
