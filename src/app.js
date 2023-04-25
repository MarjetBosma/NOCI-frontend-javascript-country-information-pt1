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
    void fetchCountries();   // Aanroepen van de functie
}

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
                    <h3 class="${fetchRegion(country.region)}">${country.name.common}><h3> 
                    <p class="population">Has a population of ${country.population} people</p>
            </li>
           `
        }
    )}
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

// Koppelen van de opgehaalde data aan HTML-element
const searchResult = document.getElementById("search-result");

// Asynchrone functie schrijven

async function fetchCountryDetails(name) {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/all`);
        const countries = response.data;
        // console.log(countries);
        searchResult.innerHTML =
            `
        <article class="search-result-container">
        <span class="flag-name-container">
            <img id="flag-image" src="${countries[0].flags.svg}" alt="Flag of ${countries[0].name.common}"/>
            <h3 id="country-name">${countries[0].name.common}</h3>
                </span>
        <div id="country-description-container">
            <p class="country-description">${countries[0].name.common} is situated in ${countries[0].subregion}. It has a population of ${countries[0].population} people.</p> 
            <p class="country-description">The capital is ${countries[0].capital} and you can pay with ${countries[0].currencies}.</p>
             <p class="country-description">They speak ${countries.languages}.</p>
                 </div>
            </article>
            `
        console.log(countries[0]);
    } catch (e) {
        console.error(e);
    }
}
fetchCountryDetails()



