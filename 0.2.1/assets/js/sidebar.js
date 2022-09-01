
const hmbrgr_open = document.querySelector("#hmbrgr_open");
const hmbrgr_close = document.querySelector("#hmbrgr_close");
const sidePortion = document.querySelector("#side_portion");
const body = document.querySelector("body");
const user = document.querySelector("#side_portion .user");
const item = document.querySelector("#side_portion .item");
const searchResultSingelItem = document.querySelector("#myInputautocomplete-list");


hmbrgr_open.addEventListener("click", function () {
    sidePortion
        .classList
        .add("active")
    body
        .classList
        .add("overlay")
})

hmbrgr_close.addEventListener("click", function () {
    sidePortion
        .classList
        .remove("active")
    body
        .classList
        .remove("overlay")
})

user.addEventListener("click", function () {
    sidePortion
        .classList
        .remove("active")
    body
        .classList
        .remove("overlay")
})

item.addEventListener("click", function () {
    sidePortion
        .classList
        .remove("active")
    body
        .classList
        .remove("overlay")
})
