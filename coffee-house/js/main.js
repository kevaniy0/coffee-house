"use strict";

const header = document.querySelector('header');
const menuButton = document.querySelector('.menu-button');
const sliderSection = document.querySelector('.section-favorite');
const btns = document.querySelectorAll('.slider-button');
const sliderWrapper = document.querySelector('.slider-wrapper')
let indexImg = 1;
let sliderPosition = 0;
let timer = 5000;
let interval;
let remain = timer;
let startTime;




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

sliderSection.addEventListener('click', function(event){
    const nextBtn = document.querySelector('.slider-button-right');
    const prevBtn = document.querySelector('.slider-button-left');
    if (nextBtn.contains(event.target)) {
            showNextSlide();
    }
    if (prevBtn.contains(event.target)) {
            showPrevSlide();
    }
})


function changeCurrentPosition(){
    const position = `${-sliderPosition * 100}%`;
    document.querySelector('.slider-common-wrapper').style.transform = `translateX(${position})`;  
    clearInterval(interval);
    startTime = Date.now();
    remain = timer;
    interval = setInterval(showNextSlide, remain);
    document.querySelector('.slider-span-active').classList.remove('slider-span-active');
    document.querySelector(`.slider-span-${sliderPosition + 1}`).classList.add('slider-span-active');

}

function showNextSlide(){
    sliderPosition++;
    if (sliderPosition == 3) {
        sliderPosition = 0;
    }
    changeCurrentPosition();
}

function showPrevSlide(){
    if (sliderPosition == 0) {
        sliderPosition = 3;
    }
    sliderPosition--;
    changeCurrentPosition();
}


function runInterval(){
    interval = setInterval(showNextSlide, remain)
    startTime = Date.now();
}

function pauseInterval(){
    clearInterval(interval);
    remain = remain - (Date.now() - startTime);
}


sliderWrapper.addEventListener('mouseenter', function(event){
        pauseInterval();
})

sliderWrapper.addEventListener('mouseleave', function(event){
        runInterval();
})


runInterval();