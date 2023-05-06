import axios from "axios";

// Eerste deel van de opdracht

// Asynchrone functie schrijven met try/catch blok

const errorMessage = document.getElementById('error');

async function fetchCountries() {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all")
        const countries = response.data
        const population = response.data.population

        // console.log(response.data[0])   // Ophalen van de informatie over het eerste land in de array, met indexnummer 0.

        // Landen sorteren op populatiegrootte van laag naar hoog
        countries.sort((a, b) => {
            return a.population - b.population;
        });

        // De gesorteerde lijst gaat in de functie om op de pagina geplaatst te kunnen worden. De functie wordt hier aangeroepen, maar staat verderop gedeclareerd.
        createListItems(countries);

    } catch (e) {
        // Errors afvangen in de console
        console.error(e);
        // Error communiceren in de UI
        if (e.response.status === 404) {
            errorMessage.textContent = "Page not found | 404"
        } else if (e.response.status === 500) {
            errorMessage.textContent = "Internal server error | 500"
        }
    }
}
void fetchCountries();   // Aanroepen van de functie

// Onderstaande functie wordt aangeroepen in het try-blok.

function createListItems(countries) {
    // Koppelen aan het bijbehorende HTML-element
    const countryList = document.getElementById('country-list');

    // Hieronder staat de data die in het list-element geïnjecteerd moet worden.

    // Een map-functie maken om door de hele lijst te gaan, en om de data van elk land met behulp van innerHTML als list-element op de pagina te plaatsen.
    countryList.innerHTML = countries.map((country) => {
            return `
            <li class="country-info">
                    <img src="${country.flags.svg}" alt="Vlag van ${country.name.common}" class="flag"/>
                    <h3 class="${fetchRegion(country.region)}">${country.name.common}<h3> 
                    <p class="population">Has a population of ${country.population} people</p>
                    </li>
                   `
        }
    ).join('')}  // Dit gebruik ik omdat er anders na elk list-item een komma komt te staan op de pagina.

// Het gedeelte fetch-region geeft geen tekst weer op de pagina, maar dit is om de naam van het land die daarachter wordt gedefinieerd in een bepaalde kleur die hoort bij die regio weer te geven.

// Deze functie haalt de data op van het continent waarop het land ligt m.b.v. switch statements.

function fetchRegion(currentRegion) {
    switch (currentRegion) {
        case 'Africa':
            return 'blue';
        case 'Americas':
            return 'green';
        case 'Asia':
            return 'red';
        case 'Europe':
            return 'yellow';
        case 'Oceania':
            return 'purple';
    }
}


// Tweede deel van de opdracht

const searchCountryForm = document.getElementById('search-query-form'); // Referentie naar zoekformulier
searchCountryForm.addEventListener('submit', searchCountry); // Plaatsen van een event listener, met als argumenten het submitten van de zoekopdracht en de functie die deze verwerkt

// Referentie naar zoekresultaat en error
const countryInfoContainer = document.getElementById('country-info-container'); // Referentie weergegeven zoekresultaat
const errorMessageContainer = document.getElementById('error-message'); // Referentie error message

function searchCountry(e) {  // Functie om de input uit het zoekveld te verwerken
    e.preventDefault();  // Pagina ververst hierdoor niet standaard
    const searchQueryField = document.getElementById('search-query-field'); // Referentie invoerveld
    fetchCountryDetails(searchQueryField.value); // Aanroepen onderstaande functie, met zoekterm als argument
    searchQueryfield.value = ''; // Maakt na zoeken invoerveld weer leeg
}
async function fetchCountryDetails(name) {  // Deze functie haalt de gevraagde gegevens op uit de API

    countryInfoContainer.innerHTML = ''; // Verwijdert het eventuele voorgaande zoekresultaat
    errorMessageContainer.innerHTML = ''; // Verwijdert eventuele error message van vorige zoekopdracht

    try {
        const response = await axios.get(
            `https://restcountries.com/v2/name/${name}`
        );
        const country = response.data; // 1 resultaat weergeven
        console.log(country);
        showCountry(country);  // Aanroepen van de functie hieronder, die de resultaten op de pagina zet
    } catch(e) {  // Dit wordt weergegeven als de zoekopdracht niet wordt herkend
        console.error(e);
        errorMessageContainer.innerHTML = `
        <p class=error-message>Country not found, try again.</p>
        `
    }
}

    function showCountry(country) {    // Geeft de informatie over het opgevraagde land weer op de pagina; wordt aangeroepen in try-blok hierboven, waar het country-object beschikbaar is
        countryInfoContainer.innerHTML = `
        <article class="search-result-container">
            <span class="flag-name-container">
                <img id="flag-image" src="${country.flag}" alt="Flag"/>
                <h3 id="country-name">${country.name}</h3>
                </span>
        <div id="country-description-container">
            <p class="country-description">${country.name} is situated in ${country.subregion}. It has a population of ${country.population} people.</p>
            <p class="country-description">The capital is ${country.capital} ${createCurrencyDescription(country.currencies)}.</p>
            <p class="country-description">They speak ${country.languages[0]}.</p>
            </div>
        </article>
        `;
    }

function createCurrencyDescription(currencies) { // Zorgt voor de juiste output in de tweede <p> hierboven, omdat currencies een array is.
    let output = 'and you can pay with ';

    if (currencies.length === 2) { // Dus als er twee currencies in de array staan
        return output + `${currencies[0].name} and ${currencies[1].name}'s`;
    }
    return output + `${currencies[0].name}'s`; // Als er één currency vermeld staat
}
