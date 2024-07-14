// side nav functionalities
var sideNav = $('.side-nav')
var sideWidth = sideNav.outerWidth();
var isOpen = false;
sideNav.animate({left:`-${sideWidth}`},0)

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "auto");
    })
});

$('.close').on('click', function(){
   sideToggle();
});

function sideToggle(){
    if(sideNav.offset().left == 0){
        isOpen = true;  
    }
    sideNav.animate({left: isOpen?`-${sideWidth}`:'0'}, 1000,function(){
    });
    $(this).toggleClass('fa-times fa-bars');
    $(this).toggleClass('fa-2xl fa-3x');
    for (let i = 0; i < 5; i++) {
        $('.links li').eq(i).animate({ 
            top:isOpen? 300:0
        }, (i + 5) * 140)}
    isOpen = !isOpen
}

// main page

// get all categories
var baseUrl = 'https://www.themealdb.com/';

async function getCategories(){
    $(".loading-screen").fadeIn(300)
    $('row').html = '';
    try{
     var res = await fetch(`${baseUrl}/api/json/v1/1/categories.php`);
    if(!res.ok){
     throw new Error('failed to getMeals' + res.status)
    }
    var data = await res.json()   
    $(".loading-screen").fadeOut(300)
     console.log(data.categories)
     displayCategories(data.categories)
    
    }
    catch (err){
     console.log(err);
    }
}
function displayCategories(arr){
    var string = '';
    for (let i = 0; i < arr.length; i++) {
        const description = arr[i].strCategoryDescription;
        const words = description.split(' '); // split into individual words
        const limitedWords = words.slice(0, 20); // limit to 20 words
        const limitedDescription = limitedWords.join(' '); // join back into a string
        
        string += `<div id = '${i}' class="meal col-md-3 position-relative overflow-hidden bg-op">
        <img class ="img-fluid rounded-2" src="${arr[i].strCategoryThumb}" alt="">
        <div class = "mealInfo bg-white bg-opacity-75 text-center position-absolute top-100 overflow-hidden p-3 rounded-2 z-2">
        <h3 id ='${i}'>${arr[i].strCategory}</h3>
        <p>${limitedDescription}</p>
        </div>
        </div>`
    }
    $('.row').html(string)
    $('.meal').on('click',function(){
        console.log(this);
        var id = $(this).attr('id');
        console.log(id);
        console.log(arr[id].strCategory);
        filterCategories(arr[id].strCategory)
    })
}
 $('#Categories').on('click',function(){
    getCategories()
    isOpen = false;
    sideToggle()
})

//  filter by category
async function filterCategories(filter){
    $(".loading-screen").fadeIn(300)
    try{
     var res = await fetch(`${baseUrl}/api/json/v1/1/filter.php?c=${filter}`);
    if(!res.ok){
     throw new Error('failed to getMeals' + res.status)
    }
    $(".loading-screen").fadeOut(300) 
    var data = await res.json()  
     data.meals.splice(20)  
     console.log(data.meals)  
     displayFilteredMeals(data.meals)
    }
    catch (err){
     console.log(err);
    }
}
function displayFilteredMeals(data){
    var string = '';

    for (let i = 0; i < data.length; i++) {
            string += `<div id = "${i}" class="meal col-md-3 position-relative overflow-hidden">
            <img class ="img-fluid rounded-2" src="${data[i].strMealThumb}"
            alt="">
            <div class = "mealInfo bg-white bg-opacity-75 d-flex align-items-center position-absolute top-100 w-100 overflow-hidden p-3 rounded-2 z-2">
            <h3>${data[i].strMeal}</h3>
            </div>
            </div>`
    }
    $('.row').html(string)
$('.meal').on('click',function(){
    var id =$(this).attr('id')
    console.log(id)
    getMealDetail(data[id].idMeal)
    console.log(data[id].idMeal);
})
}
//////////////////// end category////////////////////////////////////

// get area and filtering area
async function getArea(){
    $(".loading-screen").fadeIn(300)
    try{
     var res = await fetch(`${baseUrl}/api/json/v1/1/list.php?a=list`);
    if(!res.ok){
     throw new Error('failed to getMeals' + res.status)
    }
    var data = await res.json() 
    $(".loading-screen").fadeOut(300)    
     console.log(data.meals)     
     displayArea(data.meals)
    }
    catch (err){
     console.log(err);
    }
}
function displayArea(arr){
    var string = '';
    for (let i = 0; i < arr.length; i++) {

        string += `<div id = '${i}' class="meal col-md-3 text-white text-center pointer position-relative overflow-hidden">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3 id ='${i}' class = " w-auto">${arr[i].strArea}</h3>
        </div>`
    }
    $('.row').html(string)
    $('.meal').on('click',function(){
        console.log(this);
        var id = $(this).attr('id');
        console.log(id);
        console.log(arr[id].strArea);
        filterArea(arr[id].strArea)
    })
}
 $('#Area').on('click',function(){
    getArea()
    isOpen = false;
    sideToggle()
})

// filter by area
async function filterArea(filter){
    $(".loading-screen").fadeIn(300)
    try{
     var res = await fetch(`${baseUrl}/api/json/v1/1/filter.php?a=${filter}`);
    if(!res.ok){
     throw new Error('failed to filter area' + res.status)
    }
    var data = await res.json()
    $(".loading-screen").fadeOut(300)
    console.log(data)  
     data.meals.splice(20)  
     console.log(data.meals)  
     displayFilteredMeals(data.meals)
    }
    catch (err){
     console.log(err);
    }
}
//////////////////// end area//////////////////////////////////////

// get ingrediends and filtering
$('#Ingrediends').on('click',function(){
    getIngredients()
    isOpen = false;
    sideToggle()
})
async function getIngredients(){
    $(".loading-screen").fadeIn(300)
    try{
     var res = await fetch(`${baseUrl}/api/json/v1/1/list.php?i=list`);
    if(!res.ok){
     throw new Error('failed to getIngregients' + res.status)
    }
    var data = await res.json()
    $(".loading-screen").fadeOut(300)
    data.meals.splice(20)   
     console.log(data.meals)     
     displayIngredients(data.meals)
    }
    catch (err){
     console.log(err);
    }
}

function displayIngredients(arr){
    var string = '';
    for (let i = 0; i < arr.length; i++) {
        const description = arr[i].strDescription;
        console.log(description);
        const words = description.split(' '); // split into individual words       
        const limitedWords = words.slice(0, 20); // limit to 20 words
        const limitedDescription = limitedWords.join(' '); // join back into a string
        console.log(limitedDescription);
        string += `<div id = '${i}' class="meal col-md-3 text-white text-center pointer position-relative overflow-hidden">
        <i class="fas fa-drumstick-bite fa-4x"></i>
        <h3 id ='${i}' class = " w-auto">${arr[i].strIngredient}</h3>
        <p>${limitedDescription}</p>
        </div>`
    }
    $('.row').html(string)
    $('.meal').on('click',function(){
        console.log(this);
        var id = $(this).attr('id');
        console.log(id);
        console.log(arr[id].strIngredient);
        filterIngredient(arr[id].strIngredient)
    })
}

// filter by ingredient
async function filterIngredient(filter){
    $(".loading-screen").fadeIn(300)
    try{
     var res = await fetch(`${baseUrl}/api/json/v1/1/filter.php?i=${filter}`);
    if(!res.ok){
     throw new Error('failed to filter by ingredient' + res.status)
    }
    var data = await res.json()
    $(".loading-screen").fadeOut(300)
    console.log(data)  
     data.meals.splice(20)  
     console.log(data.meals)  
     displayFilteredMeals(data.meals)
    }
    catch (err){
     console.log(err);
    }
}
////////////////////////end /////////////////////////////////// 

/////////////////////////search ///////////////////////////
function searchPage(){
    $('.row').html('') ;
    var string = `<div class="d-flex gap-4">
    <input id="searchName" class="form-control bg-transparent border-1 border-white text-white" type="text" placeholder ="Search by Name">
    <input id="searchLetter" maxlength="1" class="form-control bg-black border-1 border-white text-white" type="text"  placeholder ="Search by first letter">
    
</div>`;
    $('.searchPage').html(string);
    $(document).on('keyup', '#searchName', function() {
        const searchName = $(this).val();
        console.log(searchName);
        searchByName(searchName)
      });
    $(document).on('keyup', '#searchLetter', function() {

    const searchLetter = $(this).val();
    console.log(searchLetter);
    searchByLetter(searchLetter)
    });
    
}
$('#Search').on('click',function(){
    searchPage()
    isOpen = false;
    sideToggle()
})
async function searchByName(name){
    $(".loading-screen").fadeIn(300)
    try{
     var res = await fetch(`${baseUrl}/api/json/v1/1/search.php?s=${name}`);
    if(!res.ok){
     throw new Error('failed to search meal by name' + res.status)
    }
    var data = await res.json()
    $(".loading-screen").fadeOut(300)
    console.log(data)
    if(data.meals != null){
        data.meals.splice(20)
        displayFilteredMeals(data.meals)
    }else  $('.row').html('') ;

    console.log(data.meals)   
    }
    catch (err){
     console.log(err);
    }
}
async function searchByLetter(letter){
    $(".loading-screen").fadeIn(300)
    letter = letter || "a";;
    try{
     var res = await fetch(`${baseUrl}/api/json/v1/1/search.php?f=${letter}`);
    if(!res.ok){
     throw new Error('failed to search meal by letter' + res.status)
    }
    var data = await res.json()
    $(".loading-screen").fadeOut(300)
    console.log(data)
    if(data.meals != null){
        data.meals.splice(20)
        displayFilteredMeals(data.meals)
    }else  $('.row').html('') ;

    console.log(data.meals)   
    }
    catch (err){
     console.log(err);
    }
}
///////////////////////end search//////////////////////////////


async function getMealDetail(id){
    $(".loading-screen").fadeIn(300)
    try{
     var res = await fetch(`${baseUrl}/api/json/v1/1/lookup.php?i=${id}`);
    if(!res.ok){
     throw new Error('failed to getMealDetail' + res.status)
    }
    var data = await res.json()
    $(".loading-screen").fadeOut(300)  
     console.log(data)     
     displayMealDetails(data.meals[0])
    }
    catch (err){
     console.log(err);
    }
}
function displayMealDetails(data){
displayFilteredMeals('')
var string = ` `;
// creating the tags
var tags = ` `;
if(data.strTags){
    var tag = data.strTags.split(',')
    for(let i = 0 ; i < tag.length ;i++){
        tags += `<div class="badge bg-danger-subtle text-danger-emphasis me-2">${tag[i]}</div>`
    }
}


console.log(data);
string = `

     <div class="d-flex justify-content-between gap-5 text-white">
        <div class="col-md-4">
            <img class="img-fluid" src="${data.strMealThumb}" alt="">
            <h2>${data.strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${data.strInstructions}</p>
            <h2>Area: ${data.strArea}</h2>
            <h2>Category: ${data.strCategory}</h2>
            <h2>Recipes:</h2>
            <div class="ingregients my-4">
            ${Object.keys(data).filter(key => key.startsWith('strIngredient') && data[key] != '' && data[key] != null).map(key => {
                return `<div class="badge bg-info me-1 mb-3">${data[key]}</div>`
              }).join('')}
            </div>
            <h2>Tags:</h2>
            <div class="tags mt-4">
            ${tags}
            </div>
            <div class="buttons mt-4">
                <div class="btn btn-success"><a class="" href="${data.strSource}">source</a></div>
            <div class="btn btn-danger"><a href="${data.strYoutube}">youtube</a></div>
            </div>
        </div>
     </div>
`

$('.row').html(string)
}




// contact

$('#Contact').on('click',function(){
    showContacts()
})
function showContacts() {

displayFilteredMeals('');
var string = ` `
string = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div>  `
    $('body').html(string);

    submitBtn = document.getElementById("submitBtn");


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
