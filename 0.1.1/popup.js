let templates = [], titles = [], subs = [], emailsSubs = [], commentsSubs = [], DMsSubs = [], reviewsSubs = [];
fetch('https://back-office-otterwriter.herokuapp.com/api/v1/templates').then(r => r.text()).then(result => {
  templates = JSON.parse(result);
  templates.map(elm => {
    titles.push(elm.name);
  })
})

fetch('https://back-office-otterwriter.herokuapp.com/api/v1/subs').then(r => r.text()).then(result => {
  subs = JSON.parse(result);
  subs.map(elm => {
    switch (elm.main) {
      case "Emails":
        emailsSubs.push(elm);
        break;

      case "Comments":
        commentsSubs.push(elm);
        break;

      case "DM's":
        DMsSubs.push(elm);
        break;

      case "Reviews":
        reviewsSubs.push(elm);
        break;
    }
  })
})

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("style", "cursor: pointer")
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this
      .parentNode
      .appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        document
          .getElementById("searchOptions")
          .style
          .display = "none";
        resetSelectedCategories()
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
          showResult(inp.value);
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x)
      x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x)
          x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x)
      return false;

    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length)
      currentFocus = 0;
    if (currentFocus < 0)
      currentFocus = (x.length - 1);

    /*add class "autocomplete-active":*/
    x[currentFocus]
      .classList
      .add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i]
        .classList
        .remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
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
  /*execute a function when someone clicks in the document:*/
  document
    .addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
}

autocomplete(document.getElementById("myInput"), titles);

const showResult = (title) => {
  const x = document.getElementById("result")
  let text = 'Waiting ...';
  templates.forEach(elm => {

    if (elm.name == title)
      text = elm.text
  })

  x.innerHTML = text;
}

const copyBtn = document.getElementById("btn");

const copyText = document.getElementById("result");

copyBtn.addEventListener("click", function (e) {
  myFunction()
});

function myFunction() {
  /* Get the text field */

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999);/*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");
}

document
  .getElementById("emails")
  .addEventListener("click", function (e) {
    selectedCategory("emails")
  });

document
  .getElementById("comments")
  .addEventListener("click", function (e) {
    selectedCategory("comments")
  });

document
  .getElementById("DMs")
  .addEventListener("click", function (e) {
    selectedCategory("DMs")
  });

document
  .getElementById("reviews")
  .addEventListener("click", function (e) {
    selectedCategory("reviews")
  });

const resetSelectedCategories = () => {
  const fontWeight = 400;
  const color = "black";
  const backgroundColor = "rgba(0, 0, 0, 0.05)";

  document
    .getElementById("tags-results")
    .style
    .display = "none";

  const emails = document.getElementById("emails");
  emails.style.fontWeight = fontWeight;
  emails.style.backgroundColor = backgroundColor;
  emails.style.color = color;

  const comments = document.getElementById("comments");
  comments.style.fontWeight = fontWeight;
  comments.style.backgroundColor = backgroundColor;
  comments.style.color = color;

  const DMs = document.getElementById("DMs");
  DMs.style.fontWeight = fontWeight;
  DMs.style.backgroundColor = backgroundColor;
  DMs.style.color = color;

  const reviews = document.getElementById("reviews");
  reviews.style.fontWeight = fontWeight;
  reviews.style.backgroundColor = backgroundColor;
  reviews.style.color = color;

  document
    .getElementById("templates")
    .innerHTML = '';
}

const selectedCategory = (name) => {
  const selected = document.getElementById(name);
  resetSelectedCategories()

  selected.style.fontWeight = "600";
  selected.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
  selected.style.color = "white";

  const subs = getSubsByCategory(name)

  if (subs.length) {
    document
      .getElementById("tags-results")
      .style
      .display = "block";

    const ul = document.getElementById("templates");

    subs.map(item => {
      const node = document.createElement("LI");
      const a = document.createElement("a");
      a.onclick = function () {
        selectedSub(item.name, name);
      };
      a.style.cursor = "pointer";
      const textnode = document.createTextNode(item.name);
      a.appendChild(textnode);
      node.appendChild(a);
      ul.appendChild(node)
    })
  }
}

const getSubsByCategory = (category) => {
  switch (category) {
    case "emails":
      return emailsSubs;
    case "comments":
      return commentsSubs;
    case "DMs":
      return DMsSubs;
    case "reviews":
      return reviewsSubs;
  }
}

const getTamplatesByCategory = (category) => {
  const temp = templates.filter(item => {
    return item.main.toLowerCase() == category;
  })

  return temp;
}

const selectedSub = (subName, main) => {
  let currentTemplates = [];
  if(main == "DMs")
    main = "DM's";
  currentTemplates = templates.filter(elm => elm.main.toLowerCase() == main.toLowerCase() && elm.sub.toLowerCase() == subName.toLowerCase());

  if (currentTemplates.length){
    document
      .getElementById("tags-results")
      .style
      .display = "block";
    const ul = document.getElementById("templates");

    ul.innerHTML = "";

    currentTemplates.map(item => {
      const node = document.createElement("LI");
      const a = document.createElement("a");
      a.onclick = function () {
        selectedTemplate(item._id);
      };
      a.style.cursor = "pointer";
      const textnode = document.createTextNode(item.name);
      a.appendChild(textnode);
      node.appendChild(a);
      ul.appendChild(node)
    })
  }

}

const selectedTemplate = (templateID) => {
  templates.forEach(elm => {

    if (elm._id == templateID)
      text = elm.text
  })
  document
    .getElementById("result")
    .innerHTML = text;

}

// =========================*******************++++++++++++++++ code for the
// reset button of the textarea


const resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", function () {
  document
    .getElementById("result")
    .innerHTML = '';
  document
    .getElementById("myInput")
    .value = '';
});


// code for the hambarger icon

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

// code for the hambarger icon end

document
  .getElementById("result")
  .addEventListener("input", function (e) {

    if (e.target.value.length < 1) {
      resetBtn
        .classList
        .remove("active");
    } else {
      resetBtn
        .classList
        .add("active");
    }
  })

document
  .getElementById("myInput")
  .addEventListener("input", function (e) {
    if (e.target.value.length) {
      resetBtn.classList.add("active")
    } else {
      resetBtn.classList.remove("active")
    }
  })