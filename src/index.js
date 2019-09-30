const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';

clearLocalStorage = () => {
  localStorage.clear();
}

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      var info = response.info;
      localStorage.setItem('next_fetch',info.next)
      const characters = response.results;
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  try{
    var API_NEXT_PAGE = localStorage.getItem('next_fetch');
    if(API_NEXT_PAGE == null){
      return await getData(API);
    }else{
      if(API_NEXT_PAGE == ''){
        let newItem = document.createElement('p');      
        newItem.innerHTML = "Ya no hay personajes...";
        $app.appendChild(newItem);
        intersectionObserver.unobserve($observe);
      } else {
        return await getData(API_NEXT_PAGE);
      }
    }
  } catch {
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);