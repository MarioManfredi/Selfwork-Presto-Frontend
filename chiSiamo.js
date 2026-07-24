
let peoples = [
    {name: 'Mario', description: 'Docente 1° anno', url: "https://picsum.photos/300"},
    {name: 'Matteo', description: 'Docente 2° anno', url: "https://picsum.photos/301"},
    {name: 'Giada', description: 'Docente 3° anno', url: "https://picsum.photos/302"},
    {name: 'Selene', description: 'Docente ultimo anno', url: "https://picsum.photos/303"}
] // immagini di prova casuali

let slidewrapper = document.querySelector('#slidewrapper');

peoples.forEach( (people)=>{
    let div = document.createElement('div');
    div.classList.add('swiper-slide', 'shows');
    div.innerHTML = `
        <img src="${people.url}" class="img-fluid" alt="Docente">
        <div class="mostra">
            <h2 class="textShow my-2 h2">${people.name}</h2>
            <p class="lead my-3 textShow">${people.description}</p>
        </div>
    `;
    slidewrapper.appendChild(div);
});

let shows = document.querySelectorAll('.shows');
shows.forEach( (show)=>{
    show.addEventListener('click', ()=>{
        let box = show.querySelector('.mostra');
        box.classList.toggle('active');
        show.classList.toggle('open');
    });
});

// swiper
var swiper = new Swiper('.mySwiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
    rotate: 70,
    stretch: 20,
    depth: 200,
    modifier: 3,
    slideShadows: false,
    }
});

