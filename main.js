
// Scroll navbar
let navbar = document.querySelector('.navbar');
let navLinks = document.querySelectorAll('.nav-link');
let logo = document.querySelector('#logo');
let navbarNav = document.querySelector('.navbar-nav');

window.addEventListener('scroll', ()=>{
    if(window.scrollY > 0){
        navbar.classList.remove('bgOne');
        navbar.classList.add('bgSecond');
        navbar.style.height = '80px';
        logo.src = './media/homeBlack.png';
        navLinks.forEach( (navLink)=> {
            navLink.style.color = 'var(--colorA)';
        });
        navbarNav.style.backgroundColor = 'var(--bgSecond)';
        
    }else if(window.scrollY == 0){
        navbar.classList.remove('bgSecond');
        navbar.classList.add('bgOne');
        navbar.style.height = '60px';
        logo.src = './media/homeWhite.png';
        navLinks.forEach( (navLink)=> {
            navLink.style.color = 'var(--colorB)';
        });
        navbarNav.style.backgroundColor = 'var(--bgOne)';
    }
});

//Add cards
let colWrapper = document.querySelector('#colWrapper');
let addButton = document.querySelector('#addButton');
let clearButton = document.querySelector('#clearButton');
let counter = 0;
clearButton.classList.add('d-none');

addButton.addEventListener('click', ()=>{

    clearButton.classList.remove('d-none');
    if(counter < 6){
        counter++;
        let div = document.createElement('div');
        div.classList.add('card-custom');
        div.innerHTML = `
            <h3 class="text-center my-3">Lorem</h3>
            <p class="lead p-custom">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit sapiente delectus explicabo aliquid, aperiam ducimus amet hic asperiores nesciunt repudiandae voluptate at eius ad. Doloremque error aut fugiat et nam.
            </p>
        `;    
        colWrapper.appendChild(div);
    }
    
    if(counter == 6){
        addButton.classList.add('d-none');
    }
});

clearButton.addEventListener('click', ()=>{

    clearButton.classList.add('d-none');
    colWrapper.innerHTML = '';
    counter = 0;
    addButton.classList.remove('d-none');

});

// numbers
let review = document.querySelector('#review');
let numberOne = document.querySelector('#numberOne');
let numberSecond = document.querySelector('#numberSecond');
let confirmC = true;
let confirmD = true;
function createIntervalC(n, time){

    numberOne.innerHTML = n;
    
    let interval= setInterval( ()=>{
        if(n > 0){
            n--;
            numberOne.innerHTML = n;
        }else{
            
            clearInterval(interval);
        }
    }, time);

    setTimeout( ()=>{
        confirmC = true;
    }, 6000);
    
}

function createIntervalD(n, time){

    let c = 0;
    let interval= setInterval( ()=>{
        if(c < n){
            c++;
            numberSecond.innerHTML = c;
        }else{
            clearInterval(interval);
        }
    }, time);

    setTimeout( ()=>{
        confirmD = true;
    }, 6000);
}


let observerC = new IntersectionObserver( (entries)=>{
    entries.forEach( (entrie)=>{

        if(entrie.isIntersecting && confirmC == true){
            createIntervalC(20,200);
            confirmC = false;
        }
    }); 
});
observerC.observe(numberOne);

let observerD = new IntersectionObserver ( (entries)=>{
    entries.forEach( (entrie)=>{
        if(entrie.isIntersecting && confirmD == true){
            createIntervalD(300, 10);
            confirmD = false;
        }
    });
});
observerD.observe(numberSecond);