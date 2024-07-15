const SUPERHERO_TOKEN = 'ae4a41dcf84825994808fc582b87ef8b';
const BASE_URI = `https://www.superheroapi.com/api.php/${SUPERHERO_TOKEN}`;

const heroBtnDiv = document.getElementById('heroBtn');
const heroImageDiv = document.getElementById('heroImage');
const searchBtn = document.getElementById('search');
const searchInput = document.getElementById('searchInput');
const searchResultDiv = document.getElementById('searchResult');

const getSuperHero = (id) => {
  fetch(`${BASE_URI}/${id}`)
    .then(response => response.json())
    .then(json => {
      //console.log(json);
    //   getStatsHTML(json)
      const name = `<h2>${json.name}</h2>`
      const intelligence = `<p>Intelligence: ${json.powerstats.intelligence}</p>`
      const strength = `<p>Strength: ${json.powerstats.strength}</p>`
      heroImageDiv.innerHTML = `${name}
        <img src="${json.image.url}" style="height: 300px; width: 300px;"/>
      ${intelligence}${strength}`
    })
    .catch(error => {
      console.error('Error fetching superhero:', error);
    });
};

// const getStatsHTML = (character) =>{
//     for (stat in character.powerstats){
//         console.log(stat)
//     }

// }

const getSearchedSuperHero = (name) => {
  fetch(`${BASE_URI}/search/${name}`)
    .then(response => response.json())
    .then(json => {
      if (json.response === 'success') {
        const hero = json.results[0];
        searchResultDiv.innerHTML = `
          <img src="${hero.image.url}" style="height: 300px; width: 300px;"/>
        `;
      } else {
        searchResultDiv.innerText = 'Superhero not found!';
      }
    })
    .catch(error => {
      console.error('Error fetching superhero:', error);
    });
}

const randomHero = () => {
  const numberOfHeroes = 731;
  return Math.floor(Math.random() * numberOfHeroes) + 1;
}

heroBtnDiv.onclick = () => {
  getSuperHero(randomHero());
};

searchBtn.onclick = () => {
  const heroName = searchInput.value.trim();
  if (heroName) {
    getSearchedSuperHero(heroName);
  } else {
    searchResultDiv.innerText = 'Please enter a superhero name!';
  }
};

