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

// Referentie maken naar het zoekformulier
const searchCountryForm = document.getElementById('search-query-form');
// Plaatsen van een event listener met submit als event en de functie die het event object gaat ontvangen
searchCountryForm.addEventListener('submit', searchCountry);

// Referentie naar zoekresultaat en error
const countryInfoContainer = document.getElementById('country-info-container');
const errorMessageContainer = document.getElementById('error-message');

// Functie voor ontvangen event-object
function searchCountry(e) {
    e.preventDefault();  // De pagina wordt hiermee niet ververst na submitten
    const searchQueryField = document.getElementById('search-query-field') // Referentie naar zoekveld

    fetchCountryDetails(searchQueryField.value); // fetchCountryDetails asynchrone functie aanroepen met zoekterm als parameter. Dit lijkt echt niet goed te gaan.
    searchQueryField.value = ''; // Zoekveld weer leegmaken na submitten zoekopdracht
}




// Asynchrone functie schrijven. De functie verwacht een zoekopdracht met de naam van een land, en gebruikt de find-methode om een object in de landen-array te vinden dat hetzelfde is.

async function fetchCountryDetails(name) {

    countryInfoContainer.innerHTML = ''; // Verwijdert het eventuele voorgaande zoekresultaat
    errorMessageContainer.innerHTML = ''; // Verwijdert eventuele error message

    try {
        const response = await axios.get(`https://restcountries.com/v2/name/${name}`);
        const country = response.data;
        console.log(country);

        // Hieronder nog een eerdere poging, die helaas ook niet werkte

        //console.log(response.data);
        //const searchResult = response.data.find((country) => {
        //    return country.name === searhQueryField.value;
        //});
        // Bovenstaande functie verwacht een zoekopdracht (query) met de naam van een land, en gebruikt de find-methode om een object in de landen-array te vinden dat hetzelfde is.
        //const { flag, name, subregion, population, capital, languages } = searchResult
        //console.log(searchResult.name);
        // De gewenste objecten destructuren en dit teruggeven als zoekresultaat. De naam van het gevonden land loggen in de console.


        // Weergeven op de pagina:
        countryInfoContainer.innerHTML =
            `
        <article class="search-result-container">
        <span class="flag-name-container">
            <img id="flag-image" src="${country.flag}" alt="Flag"/>
            <h3 id="country-name">${country.name}</h3>
                </span>
        <div id="country-description-container">
            <p class="country-description">${country.name} is situated in ${country.subregion}. It has a population of ${country.population} people.</p> 
            <p class="country-description">The capital is ${country.capital} and you can pay with ${country.currencies.name[0]}.</p>
             <p class="country-description">They speak ${languages.name[0]}.</p>  
                 </div>
            </article>
            `
        // Currencies en languages zijn arrays Ik heb er nu voor gekozen om alleen het eerste item daarvan weer te geven. als dit werkt, dan wil ik proberen om meerdere items weer te gevem.
        // Echter, ik krijg dit al niet werkend...

    } catch (e) {
        console.error(e);
        if (e.response.status === 404) {
            errorMessage.textContent = "Page not found | 404"
        } else if (e.response.status === 500) {
            errorMessage.textContent = "Internal server error | 500"
        }

    }
}
searchCountry();






