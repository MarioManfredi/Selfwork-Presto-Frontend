
fetch('./annunci.json').then( (response)=> response.json() ).then( (data)=>{

    // Annunci ordiaìnati in ordine crescente di prezzo
    data.sort((a, b)=> a.price - b.price);
    
    let categoryWrapper = document.querySelector('#categoryWrapper');
    let cardWrapper = document.querySelector('#cardWrapper');
    
    //Lista categoria filtri
    function allCategory(){
        let category = data.map( (annuncio)=> annuncio.category );
        
        let uniqueCategory = Array.from( new Set(category) );
        
        uniqueCategory.forEach( (categoria)=>{
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `
                <input class="form-check-input" type="radio" name="category" id="${categoria}">
                <label class="form-check-label" for="radioDefault1">
                ${categoria}
                </label>
            `;
            categoryWrapper.appendChild(div);
        });
    }
    allCategory();
    
    

    function troncaWord(string){
        if(string.length > 13){
            return string.split(' ')[0] + '...';

        }else{
            return string;
        }
    }
    //Annunci
    function card(array){
        cardWrapper.innerHTML = '';
        array.forEach( (annuncio, i)=>{
            let div = document.createElement('div');
            div.classList.add('bodyCard-custom');
            div.innerHTML = `
                <img src="https://picsum.photos/${300 + i}" class="img-fluid" alt="Random image">
                <h2 class="h2" title="${annuncio.name}">${troncaWord(annuncio.name)}</h2>
                <h3 class="card-text">${annuncio.category}</h3>
                <p class="lead">${annuncio.price} €</p>
                <p class="lead">${annuncio.type}</p>
            `;
            cardWrapper.appendChild(div);
        });
    }
    card(data);
    
    
    let radioButtons = document.querySelectorAll('.form-check-input');
    // categoria filtri
    function filterByCategory(array){
        
        let button = Array.from(radioButtons).find( (button)=> button.checked );
        let categoria = button.id;
        
        if(categoria == 'All'){
            return array;
            
        }else{
            let filtered = array.filter( (annuncio)=> annuncio.category == categoria);
            return filtered;
        }
    }
    
    radioButtons.forEach( (button)=> {
        button.addEventListener('click', ()=>{
            setPrice();
            allFilter();
        });
    });
    
    // categoria prezzi
    let range = document.querySelector('#range');
    let rangevalue = document.querySelector('#rangeValue')
    function setPrice(){
    
        let price = filterByCategory(data).map( (annuncio)=> Number(annuncio.price));
        price.sort( (a, b)=> a - b);
        let maxPrice = Math.ceil(price.pop());
        range.max = maxPrice;
        range.value = maxPrice;
        rangeValue.innerHTML = maxPrice;
    }
    setPrice();

    function filterByPrice(array){
        let filtered = array.filter( (annuncio)=> Number(annuncio.price) <= range.value);
        return filtered;
    }

    range.addEventListener('input', ()=>{
        rangevalue.innerHTML = range.value;
        allFilter();
    });

    // categoria parola
    let wordInput = document.querySelector('#wordInput');
    function filterByWord(array){
        let filtered = array.filter( (annuncio)=> annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()) );
        return filtered;
    }

    wordInput.addEventListener('input', ()=>{
        allFilter();
    });

    // lista categoria tipo
    let radioFormButton = document.querySelector('#radioFormButton');
    
    function allType(){

        let tipo = data.map((annuncio)=> annuncio.type);
        let uniqueType = Array.from(new Set(tipo));
        
        uniqueType.forEach( (unique)=>{
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `
                <input class="form-check-input buttonType" type="radio" name="tipo" id="${unique}">
                <label class="form-check-label" for="radioDefault1">
                ${unique}
                </label>
            `;
            radioFormButton.appendChild(div);
        });        
    }
    allType();

    // categoria tipo
    let buttonType = document.querySelectorAll('.buttonType'); 
    function filterByType(array){

        let button = Array.from(buttonType).find( (button)=> button.checked);
        let tipo = button.id;
        
        if(tipo == 'AllType'){
            return array;
        }else{
            let filtered = array.filter( (annuncio)=> annuncio.type == tipo);
            return filtered;
        }
    }

    buttonType.forEach( (button)=>{
        button.addEventListener('click', ()=>{
            allFilter();
        });
    });


    function allFilter(){
        let filteredCategory = filterByCategory(data);
        let filteredPrice = filterByPrice(filteredCategory);
        let filteredWord = filterByWord(filteredPrice);
        let filteredType = filterByType(filteredWord); 
        card(filteredType); 
    }
});