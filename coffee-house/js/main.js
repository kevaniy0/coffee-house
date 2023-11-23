const anchors = document.querySelectorAll('a[href^="#"]');
anchors.forEach((elem) => {
    elem.addEventListener('click', function(e){
        e.preventDefault();
        const id = elem.getAttribute('href');
        document.querySelector(id).scrollIntoView({
            block: "start",
            behavior: "smooth"})
    })
})