const getMeals = async () =>{
    console.log(window);
    console.log(window.location);
    console.log(window.location.search);

    const params = new URLSearchParams(window.location.search);
    console.log(params);
    
    const category = params.get('category');
    console.log(category);

    const {data} = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    console.log(data);

    return data;
}


const displayMeals = async () => {

    const loader = document.querySelector('.loader-container');
    loader.classList.add('active');

    try{
        const mealsData = await getMeals();
        const result = mealsData.meals.map(meal => {
            return `
                <div class="col-md-4 col-sm-6 col-12 mb-4 meal">
                    <div class="card h-100 shadow-sm">
                        <img src="${meal.strMealThumb}" class="card-img-top mealImg" alt="${meal.strMeal}">
                        <div class="card-body">
                            <h5 class="card-title"><strong>Name:</strong>  ${meal.strMeal}</h5>
                            <h5 class="card-text"><strong>ID:</strong> ${meal.idMeal}</h5>
                        </div>
                    </div>
                </div>
            `;
        }).join(' ');
        console.log(result);
        document.querySelector('.meals .row').innerHTML = result;
    }
    catch(error){
        console.error("error!!");
    }
    finally{
        loader.classList.remove('active');
    }
    
    
    // GSAP Animations
    gsap.from(".meal", {
        opacity: 0,
        x: (index) => (index % 2 === 0 ? -100 : 100),
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".row",
            start: "top bottom",
            end: "top center",
            toggleActions: "play none none none",
        }        
        });

}

displayMeals();
