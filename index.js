const searchBox=document.querySelector(".SearchBox");
const searchBtn=document.querySelector(".searchbutton");
const recipe=document.querySelector(".searchbutton");
const reciepiContainer=document.querySelector('.recipe-container');
const recipeDetailsContent=document.querySelector('.recipe-details-content');
const recipeCloseButton=document.querySelector('.recipe-close-btn');

//  function to get recipe

const fetchRecipes= async (query)=>{
    reciepiContainer.innerHTML="<h2>Fetching Recipes.....</h2>";
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);//return the data in the form of the promise 
    //  data-> json
    const response=await data.json();
    reciepiContainer.innerHTML="";

     response.meals.forEach(meal=>{

       const reciepiDiv=document.createElement('div');
       reciepiDiv.classList.add('recipe');
       reciepiDiv.innerHTML=`<img src="${meal.strMealThumb}"> <h3>${meal.strMeal}</h3> <p><span>${meal.strArea}</span> Belongs to </p><span> <p>${meal.strCategory}</span></p>`;
       const button=document.createElement('button');
       button.textContent="View Recipe";
       reciepiDiv.appendChild(button);
    //    Adding event Listner
    button.addEventListener('click',()=>{
       openRecipePopUp(meal);
    });

       reciepiContainer.appendChild(reciepiDiv);
       
     });

};

searchBtn.addEventListener('click',(e)=>{
    if(searchBox.value===""){
        alert("please Enter a valid Recipe");
        }
        else{
e.preventDefault();
const searchInput=searchBox.value.trim();
fetchRecipes(searchInput);
        }

});
const fetchIngredients=(meal)=>{
// console.log(meal);

let ingredientsList="";
for(let i=1;i<=20;i++){
const ingredient=meal[`strIngredient${i}`];
if(ingredient)
{
    const measure=meal[`strMeasure${i}`];
    ingredientsList+=`<li>${measure}${ingredient}</li>`
}
else{
    break;
}
}
return ingredientsList;
}
const openRecipePopUp=(meal)=>{
    recipeDetailsContent.innerHTML=`<h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="IngredientList">${fetchIngredients(meal)}</ul>
     <div class="recipeInstructions">
        <h3>Instructions:</h3>
        <p >${meal.strInstructions}</p>
        </div>

    `
    const recipeInstructions=document.querySelector('.recipeInstructions');

    recipeCloseButton.parentElement.style.display="block";
    
    recipeDetailsContent.parentElement.style.display="block";
}
recipeCloseButton.addEventListener('click',(e)=>{
reciepiContainer.parentElement.style.display="none";
});
