const header = document.querySelector('header');
const menuButton = document.querySelector('.menu-button');
const menuGallery = document.querySelector('.menu-gallery');
const showMoreBtn = document.querySelector('.menu-show-button');



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
    document.querySelector('.header-menu-wrapper').classList.toggle('header-nav__link');
    document.body.classList.toggle('disable-scroll');
    window.scrollBy(0, -100);

    if (document.querySelector('.nav-list-open')) {
        document.querySelector('.menu-button').classList.add('menu-button--open');
    }else{
        document.querySelector('.menu-button').classList.remove('menu-button--open');
    }

}


fetch('./products.json')
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
    fetch('./products.json')
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
        <div class="menu-gallery__item" id="${item.name}" data-number="${index + 1}">
            <div class="menu-gallery-wrapper">
                 <img class="menu-item_img" src="./img/${product}-${index + 1}.png" alt="${item.name}" >
            </div>
            <div class="menu-item-description">
                <h3 class="product-title-h3">${item.name}</h3>
                <p class="product-description">${item.description}</p>
                <div class="product-price">$${item.price}</div>
            </div>
         </div>
        `)
    })
    
}


function showButton(){
    if (window.innerWidth < 769 && document.querySelectorAll('.menu-gallery__item').length <= 4 ) {
        showMoreBtn.style.display = 'none';
    }else if (window.innerWidth < 769 && document.querySelectorAll('.menu-gallery__item').length > 4) {
        showMoreBtn.style.display = 'block';
    }
    if(window.innerWidth > 768) {
        showMoreBtn.style.display = 'none';
    }
    const cards = Array.from(document.querySelectorAll('.menu-gallery__item'));
    if (cards.every((item) => item.style.display == 'block')) {
        showMoreBtn.style.display = 'none';
    }
}


window.addEventListener('resize', showButton);

showMoreBtn.addEventListener('click', function(event){
    if (showMoreBtn.contains(event.target)){
        const cards = document.querySelectorAll('.menu-gallery__item');
        cards.forEach((item) => item.style.display = "block");
        showMoreBtn.style.display = "none";
    }
})


menuGallery.addEventListener('click', function(event){
    const cards = document.querySelectorAll('.menu-gallery__item');
    cards.forEach((item) => {
        if (item.contains(event.target)){
            fetch('./products.json')
            .then(response => response.json())
            .then(object => {
            createModal(object, item);
    })
        }
    })
})

function createModal(obj, item){
    const currentItem = obj.filter((elem) => elem.name == item.id)[0];
    const number = item.dataset.number;
    const modal = document.querySelector('.modal-window');
    const backgroundModal = document.querySelector('.modal-background');
    modal.innerHTML = "";
    modal.insertAdjacentHTML('beforeend', `
            <div class="modal__item">
            <div class="modal-photo-wrapper">
                <img class="modal-img" src="./img/${currentItem.category}-${number}.png" alt="${currentItem.name}">
            </div>
            <div class="modal-info">
                <h3 class="modal-title">${currentItem.name}</h3>
                <div class="modal-description">${currentItem.description}</div>
                <span class=span-size>Size</span>
                <div class="choose-size">
                    <button class="button-size button-size-s button-size--active" type="button" data-size-value="${currentItem.sizes.s['add-price']}">${currentItem.sizes.s.size}</button>
                    <button class="button-size button-size-m" type="button" data-size-value="${currentItem.sizes.m['add-price']}">${currentItem.sizes.m.size}</button>
                    <button class="button-size button-size-l" type="button" data-size-value="${currentItem.sizes.l['add-price']}">${currentItem.sizes.l.size}</button>
                </div>
                <span class="span-addivites">Addivites</span>
                <div class="choose-addivites">
                    <button class="button-addivites button-addivites-1" type="button" data-addivites-value="${currentItem.additives[0]['add-price']}">${currentItem.additives[0].name}</button>
                    <button class="button-addivites button-addivites-2" type="button" data-addivites-value="${currentItem.additives[1]['add-price']}">${currentItem.additives[1].name}</button>
                    <button class="button-addivites button-addivites-3" type="button" data-addivites-value="${currentItem.additives[2]['add-price']}">${currentItem.additives[2].name}</button>
                </div>
                <div class="total-price" data-basic-price="${currentItem.price}">
                    <span class="span-total">Total</span>
                    <span class="span-price-modal">$${currentItem.price}</span>
                </div>
                <div class="alert-section">
                    <object data="./img/info-empty.svg" type="image/svg+xml"></object>
                    <p class="alert-description">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
                </div>
                <button class="button-close-modal" type="button">Close</button>
            </div>
        </div>
    `)
    modal.style.display = 'block';
    backgroundModal.style.display = 'block';
    document.body.style.overflow = 'hidden';

}

document.body.addEventListener('click', function(event){
    if (document.querySelector('.modal-window').style.display == 'block' && (event.target.classList.contains('modal-background') || document.querySelector('.button-close-modal').contains(event.target))) {
        closeModal();
    }
    

})

function closeModal(){
        const modal = document.querySelector('.modal-window');
        const backgroundModal = document.querySelector('.modal-background');
        modal.innerHTML = "";
        modal.style.display = "none";
        backgroundModal.style.display = "none";
        document.body.style.overflow= "";
}

document.body.querySelector('.modal-window').addEventListener('click', function(event){
    const btns = document.querySelectorAll('.button-size');
    const btnsAdivites = document.querySelectorAll('.button-addivites');
    btns.forEach((item) => {     
        if (item.contains(event.target)) {
            if(item.classList.contains('button-size--active')){
                return;
            }
            btnsAdivites.forEach((elem) => {
                if (elem.classList.contains('button-addivites--active')) {
                    elem.classList.remove('button-addivites--active');
                }
            })
            document.querySelector('.button-size--active').classList.remove('button-size--active');
            item.classList.add('button-size--active');
            let basicPrice = document.querySelector('.total-price').dataset.basicPrice;
            let currentPrice = parseFloat(Number(`${basicPrice }`) + Number(document.querySelector('.button-size--active').dataset.sizeValue)).toFixed(2);
            document.querySelector('.span-price-modal').textContent = `$${currentPrice}`;
        }
    })
    
    btnsAdivites.forEach((item) => {
        if (item.contains(event.target)) {
            let resultPrice = document.querySelector('.span-price-modal').textContent.slice(1);
            item.classList.toggle('button-addivites--active');
            if (item.classList.contains('button-addivites--active')) {
                resultPrice = parseFloat(Number(resultPrice) + Number(item.dataset.addivitesValue)).toFixed(2);
                document.querySelector('.span-price-modal').textContent = `$${resultPrice}`;
            }else{
                resultPrice = parseFloat(Number(resultPrice) - Number(item.dataset.addivitesValue)).toFixed(2);
                document.querySelector('.span-price-modal').textContent = `$${resultPrice}`;
            }
        }
        
    })

})




