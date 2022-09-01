const shareLink = document.getElementById('shareLink');
const reloadLink = document.getElementById('reloadLink');
const reloadBtn = document.getElementById('reloadBtn');
const msg = document.getElementById('message');
const copyBtn = document.getElementById("btn");

let u_i_global = "";
let api_key = "";


copyBtn.addEventListener("click", function (e) {
    shareLink.select();
    shareLink.setSelectionRange(0, 99999);

    document.execCommand("copy");
})

reloadBtn.addEventListener("click", function (e) {
    const regex = new RegExp('u=');
    const uid1 = reloadLink.value.slice(reloadLink.value.search(regex)+2);

    const response = fetch(`${API}/api/v1/share/templates?uid=${u_i_global}&uid1=${uid1}&k=${api_key}`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer'
    }).then(() => {
        msg.style.display = "block";
        reloadLink.value = "";
    })
})


const main = async () => {
    let url = "https://www.otterwriter.com/share?u=";
    await chrome.cookies.getAll({ domain: `.${domain}` }, async (cookies) => {
        if (cookies.length > 1) {
            u_i_global = await cookies.find(elm => elm.name == 'u_i').value;
            api_key = await cookies.find(elm => elm.name == 'k').value;
            url += u_i_global; 
            shareLink.value = url;
        }
    })
}

main();
