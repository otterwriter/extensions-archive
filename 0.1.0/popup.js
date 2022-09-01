/* ========================================== */
//               Templates
/* ========================================== */

//templates-array
const templates =
  [{
    id: "1",
    category: "DMs",
    title: "Introduction",
    text:
      `Hi [name],

I hope this email finds you well.
        
My name is [your name] and I spoke with [insert shared connection name here] and [he/she] suggested that we should make a connection regarding [description of reason for getting in touch].
        
I would appreciate speaking to you more about it over the phone. When are you available in the coming days?
        
Let me know and let’s be in touch, I can make my schedule work around you.
        
Best,
[your name]`
  },
  {
    id: "2",
    category: "DMs",
    title: "Collaboration",
    text:
      `Hi [name],

I came across your profile on IntroMe and I wanted to reach out to you.

My name is [your name] and I believe I have an interesting opportunity in the field of [description of field of interest] that you may be interested in. Based on your profile, I believe we could have potential for a great collaboration. 

If you are interested, let’s set up a call so I can discuss more with you on the phone. Give me some times you are available and let’s speak!

Thank you,
[your name]`
  },
  {
    id: "3",
    category: "DMs",
    title: "Ventures",
    text:
      `Hi [name],

My name is [your name] and I am [position] at [company] where we focus on [company mission]. I was recently turned on to [their company] by a colleague and I love what you guys are doing.

I want to discuss with you the possibility of a joint venture with regards to my company’s offerings. Please let me know a time you are available for a phone call so I can discuss more in-depth with you.

All the best,
[your name]`
  },
  {
    id: "4",
    category: "DMs",
    title: "Join Us",
    text:
      `Hi [name],

I hope this email finds you well.

I am [position] at [company] where we focus on [company mission] .

I came across your profile on IntroMe and think you could be a great addition to our company. Please let me know a time you would be available for a phone call in the coming days so I can speak with you more about this opportunity.

Thanks,
[your name]`
  },
  {
    id: "5",
    category: "reviews",
    title: "Investment",
    text:
      `Hi [name],

My name is [your name] and I am [position] at [company] where we focus on [company mission].  I hope this email finds you well.

We are [description of the reason for an investment opportunity, ie: starting an investment round] and I would like to speak with you about an investment opportunity.  I saw your profile on IntroMe and thought you would be interested in our company’s offerings.

Let me know a convenient time to speak on the phone so I can discuss this with you further.

Best,
[your name]`
  },
  {
    id: "6",
    category: "DMs",
    title: "Introduce",
    text:
      `Hi [name],

My name is [your name] and I am [position] at [company] where we focus on [company mission].

I saw that you know a lot of [profession of desired connection, ie: AI specialists, patent attorneys] and that you specifically know [name of desired connection] and I would love it if you could introduce me to him/her.

I have a potential opportunity that they could be interested in.

Thanks,
[your name]`
  }
  ]


const titles = templates.map(elm => elm.title);


function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("style", "cursor: pointer")
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        document.getElementById("searchOptions").style.display = "none";
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
    if (x) x = x.getElementsByTagName("div");
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
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
    document.getElementById("searchOptions").style.display = "block";
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

autocomplete(document.getElementById("myInput"), titles);

const showResult = (title) => {
  const x = document.getElementById("result")
  let text = 'Waiting ...';
  templates.forEach(elm => {

    if (elm.title == title) text = elm.text
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
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");
}


document.getElementById("emails").addEventListener("click", function (e) {
  selectedCategory("emails")
});

document.getElementById("comments").addEventListener("click", function (e) {
  selectedCategory("comments")
});

document.getElementById("DMs").addEventListener("click", function (e) {
  selectedCategory("DMs")
});

document.getElementById("reviews").addEventListener("click", function (e) {
  selectedCategory("reviews")
});

const resetSelectedCategories = () => {
  const fontWeight = 500;

  document.getElementById("tags-results").style.display = "none";
  document.getElementById("emails").style.fontWeight = fontWeight;
  document.getElementById("comments").style.fontWeight = fontWeight;
  document.getElementById("DMs").style.fontWeight = fontWeight;
  document.getElementById("reviews").style.fontWeight = fontWeight;

  document.getElementById("templates").innerHTML = '';
}

const selectedCategory = (name) => {
  // document.getElementById("search-bar").style.display = "none";
  const selected = document.getElementById(name);
  resetSelectedCategories()
  selected.style.fontWeight = "600";
  const t = getTamplatesByCategory(name);
  if (t.length) {
    document.getElementById("tags-results").style.display = "block";
    const ul = document.getElementById("templates");

    t.map(item => {
      const node = document.createElement("LI");
      const a = document.createElement("a");
      a.onclick = function () { selectedTemplate(item.id) };
      a.style.cursor = "pointer";
      const textnode = document.createTextNode(item.title);
      a.appendChild(textnode);
      node.appendChild(a);
      ul.appendChild(node)
    })
  }
}

const getTamplatesByCategory = (category) => {
  const temp = templates.filter(item => {
    return item.category == category;
  })
  return temp;
}

const selectedTemplate = (templateID) => {
  templates.forEach(elm => {

    if (elm.id == templateID) text = elm.text
  })
  document.getElementById("result").innerHTML = text;

}