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

function getProduct(productId) {
  return products.filter((item) => {
    return item.id == productId;
  })[0];
}

function showProductInToPopup(productId, dataNameOfPopup) {
  let boxPopupProduct = document.querySelector(
    `.popup[data-popup-name="${dataNameOfPopup}"] .box .body`
  );

  let productShow = getProduct(productId);

  let isProductInToCart = cartProducts.filter((item) => {
    return item.id == productShow.id;
  })[0];

  boxPopupProduct.innerHTML = `
          <div class="row product" data-product-id="${
            productShow.id
          }"  data-selected-sizes="${
    productShow.sizes[0]
  }" data-selected-colors="${productShow.colors[0]}"  >
          <div class="parts mb-3 mb-md-0 col-md-6">
            <div class="item">
              <div class="row ">
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
                    ${createSizesOfProduct(
                      productShow.sizes,
                      isProductInToCart
                    )}
                </ul>
              </div>                

            <div class="colors my-2 d-flex">
              <strong class="me-3">Color :</strong>
              <ul type="none" class="d-flex p-0 m-0">
                ${createColorsOfProduct(productShow.colors, isProductInToCart)}
              </ul>
            </div>

                  ${
                    isProductInToCart == undefined
                      ? `<button  data-type-btn="add" onclick="addToCart(this,${productShow.id})" class="btnAdd btn main-border main-color mt-3">Add To Cart </button>`
                      : `<button  data-type-btn="remove" onclick="addToCart(this,${productShow.id})" class="btnAdd btn remove main-border main-color mt-3">Remove From Cart </button>`
                  } 
            </div>
          </div>
        </div>
      `;
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

  if (dataNameOfPopup == "shop") {
    checkCartShop();

    let rowOfProducts = document.querySelector(
      ".popup.active .isHaveAnyOrder .products .row"
    );

    rowOfProducts.innerHTML = ``;

    cartProducts.forEach((cartProduct) => {
      let product = getProduct(cartProduct.id);

      rowOfProducts.innerHTML += `
                <div class="product mb-3 col-md-4 col-sm-6">
                  <div class="item bg-light rounded-3 py-4 px-4 text-start"
                      data-product-id="${product.id}" 
                      data-selected-sizes="${cartProduct.size}"  
                      data-selected-colors="${cartProduct.color}" >
                    <img
                      src="images/products/${product.images[0]}"
                      alt="products in shop"
                      class="img-fluid"
                    />
                    <h5 class="my-2">${product.name.slice(0, 15)}...</h5>
                    <div class="price my-2 d-flex">
                      <strong class="me-3"><span>Price :</span></strong>
                      ${createPriceDiv(product.price, product.discount)}
                    </div>

                    <div class="sizes my-2 d-flex">
                      <strong class="me-3">Size :</strong>
                      <ul type="none" class="d-flex p-0 m-0">
                        <li class="active me-2 main-border rounded-3">${
                          cartProduct.size
                        }</li>
                      </ul>
                    </div>

                    <div class="colors my-2 d-flex">
                      <strong class="me-3">Color :</strong>
                      <ul type="none" class="d-flex p-0 m-0">
                      <li data-selected-colors="${
                        cartProduct.color
                      }" class="active rounded-3">
                        <span style="background-color: ${cartProduct.color}">
                        </span>
                      </li>
                      </ul>
                    </div>
                    <button 
                    class="btn btn-danger w-100 mt-1"
                    onclick="removeProductFromCart(${cartProduct.id})"
                    >Remove</button>
                  </div>
                </div>
      `;
    });
  } else if (dataNameOfPopup == "product") {
    showProductInToPopup(productId, dataNameOfPopup);
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

function createSizesOfProduct(sizes, isProductInToCart) {
  let sizesHTML = ``;

  for (let i = 0; i < sizes.length; i++) {
    if (isProductInToCart == undefined) {
      sizesHTML += `
      
      <li  onclick="changeActive(this); updateSize(this)"
      data-selected-sizes="${sizes[i]}"
      class=" ${i == 0 ? "active" : ""}  ${
        i != sizes.length - 1 ? "me-2" : ""
      }  main-border rounded-3">${sizes[i]}
        </li>    
        `;
    } else {
      sizesHTML += `
      
        <li  onclick="changeActive(this); updateSize(this)"
        data-selected-sizes="${sizes[i]}"
        class=" ${sizes[i] == isProductInToCart.size ? "active" : ""}  
        ${i != sizes.length - 1 ? "me-2" : ""}  
        main-border rounded-3">${sizes[i]}
          </li>    
          `;
    }
  }
  return sizesHTML;
}

function createColorsOfProduct(colors, isProductInToCart) {
  let colorsHTML = ``;

  for (let i = 0; i < colors.length; i++) {
    if (isProductInToCart == undefined) {
      colorsHTML += `
      <li  onclick="changeActive(this) , updateColor(this , '${colors[i]}')"
        data-selected-colors="${colors[i]}"
        class=" ${i == 0 ? "active" : ""}  ${
        i != colors.length - 1 ? "me-2" : ""
      }  rounded-3" 
          >
          <span 
          style="background-color: ${colors[i]}">
          </span>
          </li>    
          `;
    } else {
      colorsHTML += `
      <li  onclick="changeActive(this) , updateColor(this , '${colors[i]}')"
        data-selected-colors="${colors[i]}"
        class=" ${colors[i] == isProductInToCart.color ? "active" : ""}  ${
        i != colors.length - 1 ? "me-2" : ""
      }  rounded-3" 
          >
          <span 
          style="background-color: ${colors[i]}">
          </span>
          </li>    
          `;
    }
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

function ToggleProductCart(that, productId) {
  if (that.dataset.typeBtn == "remove") {
    let firstLiSizes = that
      .closest(".product")
      .querySelector(".sizes li:first-child");
    let firstLiColors = that
      .closest(".product")
      .querySelector(".colors li:first-child");

    that.dataset.typeBtn = "add";
    that.textContent = "Add To Cart";
    that.classList.remove("remove");
    cartProducts = cartProducts.filter((cartProduct) => {
      return cartProduct.id != productId;
    });

    updateLocalStorage();

    changeActive(firstLiSizes);

    changeActive(firstLiColors);

    updateSize(firstLiSizes);

    updateColor(firstLiSizes);
  } else if (that.dataset.typeBtn == "add") {
    that.dataset.typeBtn = "remove";
    that.classList.add("remove");
    that.textContent = "Remove From Cart";
    updateLocalStorage();
  }
}

function updateLocalStorage() {
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
}

function updateSize(that) {
  that
    .closest(".product")
    .setAttribute("data-selected-sizes", that.textContent.trim());
}

function updateColor(that, colorSpan) {
  let activeColor = (document.querySelector(
    ".colors li.active span"
  ).style.backgroundColor = `${colorSpan}`);

  that.closest(".product").setAttribute("data-selected-colors", activeColor);
}

function addToCart(that, productId) {
  let product = getProduct(productId),
    productEle = document.querySelector(
      `.product[data-product-id="${product.id}"]`
    ),
    selectedSize = productEle.getAttribute("data-selected-sizes"),
    selectedColor = productEle.getAttribute("data-selected-colors"),
    cartProduct = {
      id: product.id,
      size: selectedSize,
      color: selectedColor,
    };

  cartProducts.push(cartProduct);

  ToggleProductCart(that, productId);
}

function checkCartShop() {
  if (cartProducts != "") {
    document
      .querySelector(".box .body .isNotHaveAnyOrder")
      .classList.add("d-none");
    document
      .querySelector(".box .body .isHaveAnyOrder")
      .classList.remove("d-none");
  } else {
    document
      .querySelector(".box .body .isNotHaveAnyOrder")
      .classList.remove("d-none");
    document
      .querySelector(".box .body .isHaveAnyOrder")
      .classList.add("d-none");
  }
}

function removeProductFromCart(productId) {
  cartProducts = cartProducts.filter((cartProduct) => {
    return cartProduct.id != productId;
  });

  let rowOfProducts = document.querySelector(
    ".popup.active .isHaveAnyOrder .products .row"
  );

  rowOfProducts.innerHTML = ``;

  cartProducts.forEach((cartProduct) => {
    let product = getProduct(cartProduct.id);

    rowOfProducts.innerHTML += `
              <div class="product mb-3 col-md-4 col-sm-6">
                <div class="item bg-light rounded-3 py-4 px-4 text-start"
                    data-product-id="${product.id}" 
                    data-selected-sizes="${cartProduct.size}"  
                    data-selected-colors="${cartProduct.color}" >
                  <img
                    src="images/products/${product.images[0]}"
                    alt="products in shop"
                    class="img-fluid"
                  />
                  <h5 class="my-2">${product.name.slice(0, 15)}...</h5>
                  <div class="price my-2 d-flex">
                    <strong class="me-3"><span>Price :</span></strong>
                    ${createPriceDiv(product.price, product.discount)}
                  </div>

                  <div class="sizes my-2 d-flex">
                    <strong class="me-3">Size :</strong>
                    <ul type="none" class="d-flex p-0 m-0">
                      <li class="active me-2 main-border rounded-3">${
                        cartProduct.size
                      }</li>
                    </ul>
                  </div>

                  <div class="colors my-2 d-flex">
                    <strong class="me-3">Color :</strong>
                    <ul type="none" class="d-flex p-0 m-0">
                    <li data-selected-colors="${
                      cartProduct.color
                    }" class="active rounded-3">
                      <span style="background-color: ${cartProduct.color}">
                      </span>
                    </li>
                    </ul>
                  </div>
                  <button 
                  class="btn btn-danger w-100 mt-1"
                  onclick="removeProductFromCart(${cartProduct.id})"
                  >
                  Remove
                  </button>
                </div>
              </div>
    `;
  });
  checkCartShop();

  updateLocalStorage();

    let firstLiSizes = document.querySelector(`.product[data-product-id="${productId}"] .sizes li:first-child`)
    let firstLiColors = document.querySelector(`.product[data-product-id="${productId}"] .colors li:first-child`)
    let btnAddCartINHomePage = document.querySelector(`.product[data-product-id="${productId}"] .btnAdd`)
    
  btnAddCartINHomePage.dataset.typeBtn = "add";
  btnAddCartINHomePage.textContent = "Add To Cart";
  btnAddCartINHomePage.classList.remove("remove");

  changeActive(firstLiSizes);

  changeActive(firstLiColors);

  updateSize(firstLiSizes);

  updateColor(firstLiSizes);
}
