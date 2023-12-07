"use strict";

const header = document.querySelector('header');
const menuButton = document.querySelector('.menu-button');

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
