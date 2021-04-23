const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];



searchBar.addEventListener('keyup', () =>{
    let search = searchBar.value.toLowerCase();
    let filteredData = hpCharacters.filter(el => {
        return el.name.toLowerCase().includes(search) || el.house.toLowerCase().includes(search)
    })
    displayCharacters(filteredData)
})


const loadCharacters = async () => {
    try {
        const res = await fetch('https://hp-api.herokuapp.com/api/characters');
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (data) =>{
    const htmlString = data.map(character => {
        return `
                <li class="character">
                    <h2>${character.name}</h2>
                    <p>${character.house}</p>
                    <img src="${character.image}"/>
                </li> 
               `;
    }).join();
    charactersList.innerHTML = htmlString
}

loadCharacters()