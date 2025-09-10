function changeMainColor(colorName) {
  // Change Main Color In webSite
  let valueOfCurrentColor = getComputedStyle(html).getPropertyValue(colorName),
    imgFavIcon = document.querySelector(`html link[rel="shortcut icon"]`);

  changeImage(colorName, imgFavIcon, "logo", "href");
  changeImage(colorName, Logo, "logo");

  correctImages.forEach((correctImage) => {
    changeImage(colorName, correctImage, "correct");
  });

  html.style.setProperty("--main-color", valueOfCurrentColor);
}

function changeImage(colorName, imgEle, commonName, typeDataImg = "src") {
  let currentName = colorName.split("-")[2];

  if (typeDataImg == "src") {
    let currentSrcArr = imgEle.src.split("/");
    currentSrcArr[
      currentSrcArr.length - 1
    ] = `${currentName}-${commonName}.png`;
    let newImageSrc = currentSrcArr.join("/");
    imgEle.src = newImageSrc;
  } else if (typeDataImg == "href") {
    let currentSrcArr = imgEle.href.split("/");

    currentSrcArr[
      currentSrcArr.length - 1
    ] = `${currentName}-${commonName}.png`;

    let newImageHref = currentSrcArr.join("/");

    imgEle.href = newImageHref;
  }
}

function nextSlider() {
  let currentSlider = document.querySelector(
      ".MA-carousel .MA-carousel-item.active"
    ),
    nextSlide =
      currentSlider.nextElementSibling ??
      document.querySelector(".MA-carousel .MA-carousel-item:first-child"),
    currentColorName = nextSlide.dataset.colorName;

  currentSlider.classList.remove("active", "show");
  nextSlide.classList.add("active", "show");
  changeMainColor(currentColorName);
}

function prevSlider() {
  let currentSlider = document.querySelector(
      ".MA-carousel .MA-carousel-item.active"
    ),
    prevSlide =
      currentSlider.previousElementSibling ??
      document.querySelector(".MA-carousel .MA-carousel-item:last-child"),
    currentColorName = prevSlide.dataset.colorName;

  currentSlider.classList.remove("active", "show");
  prevSlide.classList.add("active", "show");

  changeMainColor(currentColorName);
}

function openPopup(dataNameOfPopup, productId) {
  let popupNameEle = document.querySelector(
    `.popup[data-popup-name="${dataNameOfPopup}"]`
  );

  popupNameEle.classList.add("active");

  setTimeout(() => {
    popupNameEle.classList.add("show");

    setTimeout(() => {
      popupNameEle.firstElementChild.classList.add("show");
    }, 100);
  }, 1);

  document
    .querySelector(".popup.active .box")
    .addEventListener("click", (e) => {
      e.stopPropagation();
    });

  ///////////////////////////////////////////////////////////

  if (dataNameOfPopup == "product") {
    let boxPopupProduct = document.querySelector(
      `.popup[data-popup-name="${dataNameOfPopup}"] .box .body`
    );

    let productShow = products.filter((item) => {
      return item.id == productId;
    })[0];

    boxPopupProduct.innerHTML = `
            <div class="row">
            <div class="parts mb-3 mb-md-0 col-md-6">
              <div class="item">
                <div class="row product">
                  <div class="imgSelected col-12">
                    <img src="images/products/${
                      productShow.images[0]
                    }" alt="products shoes" class="img-fluid">
                  </div>

                  <div class="col-12">
                    <ul class="images d-flex p-0 mx-auto my-0" type="none">
                      ${createImagesLi(productShow)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="parts col-md-6 text-start">
              <div class="item">
                <h3 class="main-color">${productShow.name}</h3>
                  <div class="price d-flex">
                    <strong class="me-3">Price :</strong>
                    ${createPriceDiv(productShow.price, productShow.discount)}
                </div>
                <hr>
                <p>
                ${productShow.description}
                </p>
                <div class="sizes mt-2 d-flex">
                  <strong class="me-3">Size :</strong>
                  <ul type="none" class="d-flex p-0 m-0">
                      ${createSizesOfProduct(productShow)}
                  </ul>
                </div>                

              <div class="colors my-2 d-flex">
                <strong class="me-3">Color :</strong>
                <ul type="none" class="d-flex p-0 m-0">
                  ${createColorsOfProduct(productShow)}
                </ul>
              </div>

                <button class="btn main-border main-color mt-3">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        `;
  }
}

function closePopup() {
  let popupShowed = document.querySelector(`.popup.active`);

  popupShowed.firstElementChild.classList.remove("show");

  setTimeout(() => {
    popupShowed.classList.remove("show");

    setTimeout(() => {
      popupShowed.classList.remove("active");
    }, 300);
  }, 500);
}

function changeSelectedImage(that, typeImages = "src") {
  let srcImage = `images/products/`;

  console.log(typeImages);

  let currentSrcImage = that.firstElementChild.getAttribute(typeImages),
    imgSelected = that.closest(".product").querySelector(".imgSelected img");

  typeImages == "src"
    ? imgSelected.setAttribute("src", currentSrcImage)
    : typeImages == "data-index-image"
    ? imgSelected.setAttribute("src", srcImage + currentSrcImage)
    : false;
}

function changeActive(that) {
  let parentOfChildrenActives = that.parentElement,
    childActive = parentOfChildrenActives.querySelector(".active");

  childActive.classList.remove("active");
  that.classList.add("active");
}

function createPriceDiv(price, discount = 0) {
  return `
      <ul type="none" class="d-flex p-0 m-0">
        <li class="old-Price ${discount == 0 ? "d-none" : "d-block"}
           text-decoration-line-through text-danger me-2">
          ${price} <sup>$</sup>
        </li>
        <li class="new-Price fw-bold">
        ${(price * (1 - discount)).toFixed(2)} <sup>$</sup></li>
      </ul>
      `;
}

function createSizesOfProduct(product) {
  let sizesHTML = ``;

  for (let i = 0; i < product.sizes.length; i++) {
    sizesHTML += `

      <li  onclick="changeActive(this)"
       class=" ${i == 0 ? "active" : ""}  ${
      i != product.sizes.length - 1 ? "me-2" : ""
    }  main-border rounded-3">${product.sizes[i]}
    </li>    
    `;
  }
  return sizesHTML;
}

function createColorsOfProduct(product) {
  let colorsHTML = ``;

  for (let i = 0; i < product.colors.length; i++) {
    colorsHTML += `

      <li  onclick="changeActive(this)"
       class=" ${i == 0 ? "active" : ""}  ${
      i != product.colors.length - 1 ? "me-2" : ""
    }  rounded-3" 
    >
    <span 
    style="background-color: ${product.colors[i]}"
    ></span>
    
    
    
    </li>    
    `;
  }
  return colorsHTML;
}

function createImagesLi(product) {
  let imagesHTML = ``;

  for (let i = 0; i < product.images.length; i++) {
    imagesHTML += `
        <li
          class="active main-border rounded-3 mb-md-2 mx-2 me-2 me-md-0 py-2 px-2"
          onclick="changeSelectedImage(this)">
          <img
            src="images/products/${product.images[i]}"
            alt="products Shoes his ID is${product.images[i]}"
            class="img-fluid"
          />
        </li>`;
  }

  return imagesHTML;
}
