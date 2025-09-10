let html = document.querySelector("html"),
  nextBtnCarousel = document.querySelector(".MA-carousel .next"),
  prevBtnCarousel = document.querySelector(".MA-carousel .prev"),
  navLinks = document.querySelectorAll(".navbar .navbar-nav .nav-link"),
  navBarEle = document.querySelector(".navbar"),
  hightOfNavBar = navBarEle.clientHeight,
  correctImages = document.querySelectorAll(".correctImg"),
  popupEle = document.querySelector(".popup");

window.addEventListener("DOMContentLoaded", function () {
  let currentSlider = document.querySelector(
    ".MA-carousel .MA-carousel-item.active"
  );
  currentSlider.classList.add("show");

  Loading.classList.add("hide");

  setTimeout(() => {
    Loading.classList.add("d-none");
  }, 1000);
});

window.addEventListener("scroll", function () {
  let topOfWindow = window.scrollY;

  let sectionNames = ["Home", "Latest", "Featured"];

  for (let sectionName of sectionNames) {
    let section = document.querySelector(`#${sectionName}`),
      sectionId = section.id,
      topOfSection = section.offsetTop - hightOfNavBar,
      bottomOfSection = section.offsetTop + section.clientHeight;

    if (topOfWindow >= topOfSection && topOfWindow <= bottomOfSection) {
      let newSection = document.querySelector(
          `nav .nav-link[href="#${sectionId}"]`
        ),
        oldSection = document.querySelector(`nav .nav-link.active`);

      oldSection.classList.remove("active");
      newSection.classList.add("active");
    }
  }

  // check if user scroll at 1 add class active in navbarEle
  topOfWindow >= 1
    ? navBarEle.classList.add("active")
    : navBarEle.classList.remove("active"),
    1;
});

nextBtnCarousel.addEventListener("click", nextSlider);
prevBtnCarousel.addEventListener("click", prevSlider);

navLinks.forEach(function (navLink) {
  navLink.addEventListener("click", (e) => {
    e.preventDefault();
    let currentNavLink = document.querySelector(
        ".navbar .navbar-nav .nav-link.active"
      ),
      idOfCurrentSection = navLink.getAttribute("href"),
      currentSection = document.querySelector(`${idOfCurrentSection}`),
      currentSectionTop = currentSection.offsetTop - hightOfNavBar;

    window.scrollTo({
      top: currentSectionTop,
      left: 0,
    });

    currentNavLink.classList.remove("active");
    navLink.classList.add("active");
  });
});

latest.forEach(function (product, index) {


  productsDiv.innerHTML += `   
          <div class="product ${index != product.length - 1 ? "mb-3" : ""}" >
            <div
              class="row w-100 mx-auto mx-lg-0 bg-light py-3 px-2 rounded-3 main-border"
            >
              <div class="part1 mb-md-2 mb-lg-0 col-lg-6">
                <div class="item">
                  <div class="row">
                    <div class="part1 col-lg-3 col-xl-2 col-md-2">
                      <ul type="none" class="d-flex p-0">
                      ${createImagesLi(product)}
                      </ul>
                    </div>
                    <div class="part2 col-lg-9 col-xl-10 col-md-10">
                      <div class="imgSelected">
                        <img
                          src="images/products/${product.images[0]}"
                          alt="product show"
                          class="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="part2 col-lg-6">
                <div class="item">
                  <h3 class="main-color">${product.name}</h3>
                  <p>
                  ${product.description}
                  </p>
                  <div class="price d-flex">
                    <strong class="me-3">Price :</strong>
                    ${createPriceDiv(product.price, product.discount)}
                  </div>

                  <div class="sizes mt-2 d-flex">
                    <strong class="me-3">Size :</strong>
                    <ul type="none" class=" d-flex p-0 m-0">
                      ${createSizesOfProduct(product)}
                    </ul>
                  </div>


                  <button class="btn main-border main-color mt-3">
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
    `;
});

features.forEach(function (product) {
  let liActivesImages = ``;

  for (let i = 0; i < product.images.length; i++) {
    liActivesImages += `
      <li
        onclick="changeActive(this); changeSelectedImage(this , 'data-index-image')"
        
        class="main-border ${i == 0 ? "active" : ""} ${
      i != product.images.length - 1 ? "me-2" : ""
    }">
    <div data-index-image="${product.images[i]}"></div>
      </li>`;
  }

  productsFeatured.innerHTML += `
        <div class="ProductDiv col-sm-6 col-lg-3 mb-3">
          <div class=" product item bg-light rounded-3 py-4 px-3">
            <p class="${product.discount == 0 ? "d-none" : "d-block"}">-${
    product.discount * 100
  }%
            </p>
            <div class="imgSelected">
            <img
            src="images/products/${product.images[0]}"
            class="img-fluid"
            alt="products Featured"
            />
            </div>
            <div class="search">
              <i class="fas fa-search key" onclick="openPopup('product' , ${product.id})"></i>
            </div>        
            <ul class="indicators d-flex p-0" type="none">
              ${liActivesImages}
            </ul>       
            <h6>${product.name}</h6>
                  <div class="price d-flex">
                    ${createPriceDiv(product.price, product.discount)}
                  </div>
            </div>
        </div>
  `;
});
