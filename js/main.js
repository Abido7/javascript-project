///////// new user data
let signUpName = document.getElementById("signUpName");
let signUpEmail = document.getElementById("signUpEmail");
let signUpPassword = document.getElementById("signUpPassword");
let logoutBtn = document.getElementById("logout");
///////// index data
let signInEmail = document.getElementById("signInEmail");
let signInPassword = document.getElementById("signInPassword");
//////// welcome data
let welcomeMsg = document.getElementById("wel");
var activeName = "";
/////////////////////////
//  h3ml array form path name as string
let pathArr = location.pathname.split("/");
//  h3ml var for get main path
let mainPath = "";
// pathArr.length-1 to get mainpath
for (let i = 0; i < pathArr.length - 1; i++) {
  // pathArr.length-1 to get main path only
  mainPath += "/" + pathArr[i];
}
// console.log(mainPath);
// console.log(pathArr);
//////////////////////////

let users = [];
if (localStorage.getItem("form") == null) {
  users = [];
} else {
  users = JSON.parse(localStorage.getItem("form"));
}
function empty() {
  if (signUpName.value == "" || signUpEmail.value == "") {
    return true;
  }
}
function exist() {
  for (let i = 0; i < users.length; i++) {
    if (users[i].userEmail.toLowerCase() == signUpEmail.value.toLowerCase()) {
      return true;
    }
  }
}
function reset() {
  signUpName.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
  signInEmail.value = "";
  signInPassword.value = "";
}
/////////////////////////////////// sign up
function signUp() {
  let passLength = Array.from(signUpPassword.value);
  if (empty()) {
    document.getElementById("alert").style.display = "block";
    document.getElementById("alert").innerHTML = "fill all inputs";
  } else if (passLength.length < 6) {
    document.getElementById("alert").style.display = "block";
    document.getElementById("alert").innerHTML =
      "password should more than 6 numbers or char";
  } else if (!isEmail(signUpEmail)) {
    document.getElementById("alert").style.display = "block";
    document.getElementById("alert").innerHTML = "not email";
  } else if (exist()) {
    document.getElementById("alert").style.display = "block";
    document.getElementById("alert").innerHTML = "email already exist";
  } else {
    user = {
      userName: signUpName.value,
      userEmail: signUpEmail.value,
      userPassword: signUpPassword.value,
    };
    users.push(user);
    localStorage.setItem("form", JSON.stringify(users));
    document.getElementById("alert").style.display = "block";
    document.getElementById("alert").innerHTML = "sucsess";
    setTimeout(() => {
      window.location.replace(mainPath + "/index.html");
    }, 700);
    reset();
  }
}
/////////////////////////////////// log in
function ismember(arr, signInEmail, signInPassword) {
  for (let i = 0; i < arr.length; i++) {
    if (
      arr[i].userEmail.toLowerCase() == signInEmail.value.toLowerCase() &&
      arr[i].userPassword.toLowerCase() == signInPassword.value.toLowerCase()
    ) {
      activeName = arr[i].userName;
      return true;
    }
  }
  /* 
  ///////////////////

  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! m4 henf3 a3ml forEach btrg3ly void m4 boolean !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  //////////////////
  */
}
//////////////////////////
function logIn() {
  if (ismember(users, signInEmail, signInPassword) == true) {
    localStorage.setItem("session", activeName);
    setTimeout(() => {
      window.location.replace(mainPath + "/welcome.html");
    }, 700);
  } else {
    document.getElementById("alert").style.display = "block";
    document.getElementById("alert").innerHTML = "wrong Email or password";
  }
  reset();
}
///////////////////////////////
////////////////////////////
function logout() {
  localStorage.removeItem("session");
  if (!localStorage.getItem("session")) {
    window.location = mainPath + "/index.html";
  }
}
///////////////////////////
/////// to get welcomed user
var activeUser = localStorage.getItem("session");
if (activeUser) {
  document.getElementById("welcomeMsg").innerHTML = "Welcome " + activeUser;
}
/////////////////////////////////
function smart() {
  document.getElementById("smart").href = mainPath + "/index.html";
}
//////////////////////////////////
function isEmail(input) {
  let inptArr = Array.from(input.value);
  if (inptArr.includes("@")) return true;
}
//////////////////////////////////
