var data = {
  init: ['Select Your Size', 'S', 'Small', 'M', 'Medium', 'L', 'Large'],
  'S': ['Select Your Sauce', 'SMar', 'Hearty Marinara Sauce', 'SAlf', 'Alfredo Sauce'],
  'SMar': ['Select your Specialty', 'S3', '3 Cheese Blend', 'SPep', 'Peperoni', 'SHaw',
    'Hawaiian'
  ],
  'SAlf': ['Select Your Speciality', 'SSpin', 'Spinach & Feta', 'SChi', 'Chicken Parmessan'],
  'M': ['Select Your Sauce', 'MMar', 'Hearty Marinara Sauce', 'MAlf', 'Alfredo Sauce'],
  'MMar': ['Select your Specialty', 'M3', '3 Cheese Blend', 'MPep', 'Peperoni', 'MHaw',
    'Hawaiian'
  ],
  'MAlf': ['Select Your Speciality', 'MSpin', 'Spinach & Feta', 'MChi', 'Chicken Parmessan'],
  'L': ['Select Your Sauce', 'LMar', 'Hearty Marinara Sauce', 'LAlf', 'Alfredo Sauce'],
  'LMar': ['Select your Specialty', 'L3', '3 Cheese Blend', 'LPep', 'Peperoni', 'LHaw',
    'Hawaiian'
  ],
  'LAlf': ['Select Your Speciality', 'LSpin', 'Spinach & Feta', 'LChi', 'Chicken Parmessan']



}

//global variable that determines if form should load
var done = false;
var choice = "You chose: "

const formDiv = document.getElementById('pizza-form');

//test if cookies are enabled

let cookies = navigator.cookieEnabled;


createSelect('init');


function removeAll(parent) {
  while (parent.nextSibling) {
    parent.nextSibling.remove();
  }
}


function createSelect(value) {
  //create select element
  var selectList = document.createElement("select");
  selectList.id = value;
  formDiv.appendChild(selectList);
  var valArray = data[value];
  var thisSelect = document.getElementById(value);

  //event listener that checks when value is updated and adds next select or updates the choice
  thisSelect.addEventListener('change', function() {
    let selectValue = thisSelect.value;
    const isIndex = (element) => element == selectValue;
    var index = valArray.findIndex(isIndex) - 1;


    removeAll(thisSelect);
    //will only add new select if a continuation will continue
    if (data[valArray[index]] == undefined && index != -1) { //only done if the next value has no question and the default option isn't selected
      done == true;
      createForm(cookies);

      let children = formDiv.childNodes;
      for (const node of children) {
        if (node.value != null) {
          choice = choice + node.value + ", ";
        }

      }
      //removes comma and space
      choice = choice.slice(0, -2);

    } else if (data[valArray[index]] == undefined) {
      //pass
      if (document.getElementById("dynamic-form") != null) {
        document.getElementById("dynamic-form").remove();
      }
    } else {
      choice = "You chose: ";
      //if form exists delete it
      if (document.getElementById("dynamic-form") != null) {
        document.getElementById("dynamic-form").remove();
      }
      createSelect(valArray[index]);
    }

  });


  //Create and append the options
  for (var i = 0; i < valArray.length; i++) {
    if (i % 2 == 0 || i == 0) {
      var option = document.createElement("option");
      option.value = valArray[i];
      option.text = valArray[i];
      selectList.appendChild(option);
    }

  }
}


//creates the form after all choices have been finalized
function createForm(cookies) {

  // Create a form dynamically
  var form = document.createElement("form");
  form.setAttribute("method", "post");
  form.id = "dynamic-form";

  // Create first name input
  var FN = document.createElement("input");
  FN.setAttribute("type", "text");
  FN.setAttribute("name", "fName");
  FN.setAttribute("placeholder", "First Name");
  FN.id = 'fName';

  // Create last name input
  var LN = document.createElement("input");
  LN.id = 'lName';
  LN.setAttribute("type", "text");
  LN.setAttribute("name", "lName");
  LN.setAttribute("placeholder", "Last Name");


  // Create email input
  var EM = document.createElement("input");
  EM.id = 'email';
  EM.setAttribute("type", "email");
  EM.setAttribute("name", "email");
  EM.setAttribute("placeholder", "Email Address");

  // Create  button
  var s = document.createElement("button");
  s.setAttribute("type", "button");
  s.textContent = "Submit";
  if (cookies == true) {
    s.setAttribute("onclick", "storeCookie()")
  } else {
    s.setAttribute("onclick", "storeLocal()")
  }


  // Append inputs to the form
  form.append(FN);
  form.append(LN);
  form.append(EM);
  form.append(s);

  document.getElementById("online-order").appendChild(form);
}



//save data to local storage

function storeLocal() {
  var inputFName = document.getElementById("fName");
  var inputLName = document.getElementById("lName");
  var inputEmail = document.getElementById("email");
  localStorage.setItem("fName", inputFName.value);
  localStorage.setItem("lName", inputLName.value);
  localStorage.setItem("email", inputEmail.value);
}


function storeCookie() {
  var today = new Date();
  var expiry = new Date(today.getTime() + 30 * 24 * 3600 * 1000); // plus 30 days
  var inputFName = document.getElementById("fName");
  var inputLName = document.getElementById("lName");
  var inputEmail = document.getElementById("email");
  document.cookie = "fName" + "=" + escape(inputFName.value) + "; path=/; expires=" + expiry.toGMTString();
  document.cookie = "lName" + "=" + escape(inputLName.value) + "; path=/; expires=" + expiry.toGMTString();
  document.cookie = "email" + "=" + escape(inputEmail.value) + "; path=/; expires=" + expiry.toGMTString();
}