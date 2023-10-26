// console.log('loaded script')

//  DATA
// Menu data structure
// const menuLinks = [
//   { text: "about", href: "/about" },
//   { text: "catalog", href: "/catalog" },
//   { text: "orders", href: "/orders" },
//   { text: "account", href: "/account" },
// ];

const menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

// DOM steps - UI / view layer steps
// step 1.0 -> grab main
const mainEl = document.querySelector("main");
// 1.1 - change background of main
mainEl.style.backgroundColor = "var(--main-bg)";
// 1.2 - add content to the main element
mainEl.innerHTML = "<h1>SEI Rocks!</h1>";
// 1.3 - add a class using class api - classList
mainEl.classList.add("flex-ctr");

// 2.0 - target the nav element 3 top-menu
const topMenuEl = document.getElementById("top-menu");
// ... = document.querySelector('nav#top-menu')
// 2.1 - modify the height property of the element
topMenuEl.style.height = "100%";
// 2.2 - change bg color for nav
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
// 2.3 - add a class using class api - classList
topMenuEl.classList.add("flex-around");

// 3.1 - create an a element for each object in menuLinks
// add to topMenuEl

for (let linkObj of menuLinks) {
  // for of -> arrays
  // link -> variable -> actual value of the item in the array
  let navLinkEl = document.createElement("a");
  navLinkEl.setAttribute("href", linkObj.href);
  navLinkEl.textContent = linkObj.text;
  topMenuEl.appendChild(navLinkEl);
}

// 4.0 -> set a new variable - subMenuEl
const subMenuEl = document.getElementById("sub-menu");
// 4.1 -> set the height of sub to 100%;
subMenuEl.style.height = "100%";
// 4.2
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
// 4.3
subMenuEl.classList.add("flex-around");
// 4.4
subMenuEl.style.position = "absolute";
// 4.5 - align top of submenu with the top of the parent (topMenu)
subMenuEl.style.top = "0";
// absolute -> reference to body or main
// position of absolute -> set a fixed position relative to the next nearest relative element

// 5.1

// cache all current a tags in the main (top ) nav
const topMenuLinks = topMenuEl.querySelectorAll("a");

// store a variable (why? tbd )
let showingSubMenu = false;

// 5.2
// add a click handler to topMenu

topMenuEl.addEventListener("click", function (event) {
  event.preventDefault();
  // 1. prevent default -> a , nav -> preventDefault ()-> stop the link from doing its thing (navigate to another page)

  let currentTarget = event.target;
  if (currentTarget.tagName !== "A") {
    return;
  }
  // 2. check if the element clicked is NOT an 'a' tag -> return cancels the handler if we are not clicking on a link

  // check status of log
  // 3. console.log the content of the event.target.textContent
  // console.log(currentTarget);

  // 5.3
  // (inside handler) create a conditional - classList -> event.target.classList.contains('active') // true or false
  // remove the class from the target
  // update global variable to hide menu
  // reset the top of the subMenu back to 0
  // return -> stop the handler from running the rest of the code!

  if (currentTarget.classList.contains("active")) {
    currentTarget.classList.remove("active");
    showingSubMenu = false;
    subMenuEl.style.top = "0";
    return;
  }

  // clear the menu

  // 5.4
  // iterate over all links and remove active from any of the elements (classList)
  topMenuLinks.forEach(function(linkEl){
    // console.log("before clear", linkEl)
    linkEl.classList.remove('active')
    // console.log("after clear", linkEl)
  })

  // 5.5
  // event.target.classList.add('active')

  currentTarget.classList.add('active')

  // 5.6
  // update global variable <== // link object??? - [ {}, {}, ]
  let currentLink = menuLinks.find(function(linkObj){
    // console.log(linkObj)
    // console.log(currentTarget.textContent)
    // how does find work again? 
    return linkObj.text === currentTarget.textContent
  })

  if(currentLink.subLinks){
    showingSubMenu = true
  } else {
    showingSubMenu = false
  }
  // something to compare the content of the link > one of the objects in menuLinks -> find()

  if (showingSubMenu){
    buildSubMenu(currentLink.subLinks)
    subMenuEl.style.top = '100%'
  } else {
    subMenuEl.style.top = "0";
    mainEl.innerHTML  = '<h1>About!</h1>'
  }

  function buildSubMenu(linksArr){
    console.log(linksArr)
    subMenuEl.innerHTML = ""
    for(let linkObj of linksArr){
      const newLink = document.createElement('a')
      newLink.setAttribute('href', linkObj.href )
      newLink.textContent = linkObj.text
      subMenuEl.appendChild(newLink)
    }

  }
});


subMenuEl.addEventListener('click', function(event){
  // 6.0 -> repeat steps for exiting click handler if element is not a link 
  event.preventDefault()

  let currentTarget = event.target;
  if (currentTarget.tagName !== "A") {
    return;
  }
  // test link content
  // console.log(currentTarget.textContent)

  // 6.1 - reset submenu state on submenu click
  showingSubMenu = false
  subMenuEl.style.top = "0"

  topMenuLinks.forEach(function(linkEl){
    // console.log("before clear", linkEl)
    linkEl.classList.remove('active')
    // console.log("after clear", linkEl)
  })
  let pageName = currentTarget.textContent
  let pageContent = pageName[0].toUpperCase()+pageName.slice(1)
  mainEl.innerHTML = `<h1>${pageContent}!</h1>`
  // template literals - string interpolation

})