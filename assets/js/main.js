const getCategories = async () => {
  try {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    console.log(response);
    return response.data.categories;
  } catch (error) {
    console.error("error!!");
    return [];
  }
};

// getCategories();
const displayCategories = async () => {
  const loader = document.querySelector(".loader-container");
  console.log(loader);
  loader.classList.add("active");

  let catResult = "";
  try {
    const categories = await getCategories();
    console.log(categories);
    catResult = categories
      .map((category) => {
        return `<div class="col-md-4 col-sm-6 col-6 meal">
                        <div class="card h-100">
                            <div class="card-body category-styling">
                                <div class='categoryImg'>
                                    <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
                                </div>
                                <div class='categoryIdentify d-flex gap-3'>
                                    <h2>${category.idCategory}</h2>
                                    <h2>${category.strCategory}</h2>
                                </div>
                                <p>${category.strCategoryDescription}</p>
                            </div>
                            <div class="card-footer">
                                <a href="categoryDetails.html?category=${category.strCategory}" class="btn btn-primary">View Details</a>
                            </div>
                        </div>
                    </div>`;
      })
      .join(" ");
    console.log(catResult);
  } catch (error) {
    console.error("error!!");
  } finally {
    loader.classList.remove("active");
  }

  document.querySelector(".row").innerHTML = catResult;

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
    },
  });


};

displayCategories();


const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'vertical',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
  