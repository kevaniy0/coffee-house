const header = document.querySelector('header');
const menuButton = document.querySelector('.menu-button');
const menuGallery = document.querySelector('.menu-gallery');


header.addEventListener('click', function(event){
    if (menuButton.contains(event.target)){
        openBurger();
    }
    if (document.querySelector('.nav-list').classList.contains('nav-list-open') 
    && event.target.classList.contains('header-nav__link')){
        openBurger();
    }
})

function openBurger(){
    document.querySelector('.nav-list').classList.toggle('nav-list-open');
    document.querySelector('.header-menu-wrapper').classList.toggle('header-menu--burger');
    document.body.classList.toggle('disable-scroll');
    window.scrollBy(0, -100);
    
    if (document.querySelector('.nav-list-open')) {
        document.querySelector('.menu-button').classList.add('menu-button--open');
    }else{
        document.querySelector('.menu-button').classList.remove('menu-button--open');
    }
    
}


fetch('products.json')
    .then(response => response.json())
    .then(object => {
        createMenu(object);
    })

const menuSection = document.querySelector('.section-menu-title');
menuSection.addEventListener('click', function(event){
    const tabs = document.querySelectorAll('.tabs-btn');
    
    tabs.forEach((item) => {
        if (item.contains(event.target)) {
            if (item.classList.contains('tabs-btn--active')){
               return;
            }
            document.querySelector('.tabs-btn--active').classList.remove('tabs-btn--active');
            item.classList.add('tabs-btn--active');
            
        }
    })
    fetch('products.json')
    .then(response => response.json())
    .then(object => {
        createMenu(object);
        showButton();
    })
    
    
    
})


function createMenu(obj){
    const product = document.querySelector('.tabs-btn--active').textContent.toLowerCase().trim();
    const currentType = obj.filter((item) => item.category == product);
    menuGallery.innerHTML = "";
    currentType.forEach((item, index) => {
        menuGallery.insertAdjacentHTML('beforeend', `
        <div class="menu-gallery__item">
            <div class="menu-gallery-wrapper">
                 <img class="menu-item_img" src="./img/${product}-${index + 1}.png" alt="${item.name}" >
            </div>
            <div class="menu-item-description">
                <h3 class="product-title-h3">${item.name}</h3>
                <p class="product-description">${item.description}</p>
                <div class="product-price">${item.price}</div>
            </div>
         </div>
        `)
    })
    
}


function showButton(){
    if (window.innerWidth < 769 && document.querySelectorAll('.menu-gallery__item').length <= 4 ) {
        document.querySelector('.menu-show-button').style.display = 'none';
    }else if (window.innerWidth < 769 && document.querySelectorAll('.menu-gallery__item').length > 4) {
        document.querySelector('.menu-show-button').style.display = 'block';
    }
    if(window.innerWidth > 768) {
        document.querySelector('.menu-show-button').style.display = 'none';
    }
    const cards = Array.from(document.querySelectorAll('.menu-gallery__item'));
    if (cards.every((item) => item.style.display == 'block')) {
        document.querySelector('.menu-show-button').style.display = 'none';
    }
}


window.addEventListener('resize', showButton);

document.querySelector('.menu-show-button').addEventListener('click', function(event){
    if (document.querySelector('.menu-show-button').contains(event.target)){
        const cards = document.querySelectorAll('.menu-gallery__item');
        cards.forEach((item) => item.style.display = "block");
        document.querySelector('.menu-show-button').style.display = "none";
    }
})


//  TODO: решить вопрос с разными JS файлами

