import axios from "axios";

// Asynchrone functie schrijven met try/catch blok

const errorMessage= document.getElementById('error');

async function fetchCountries() {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all")
        const countries = response.data

        // console.log(response.data[0])   Ophalen van de informatie over het eerste land in de array, met indexnummer 0.

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


    // Onderstaande functie wordt aangeroepen in het try-blok.

    function createListItems(countries) {
        // Koppelen aan het bijbehorende HTML-element
        const countryList = document.getElementById('country-list');

        // Hieronder staat de data die in het list-element geïnjecteerd moet worden.

        // Een map-functie maken om door de hele lijst te gaan, en om de data van elk land met behulp van innerHTML als list-element op de pagina te plaatsen.
        countryList.innerHTML = countries.map((country) => {
            return `
            <li>
                <div class="country-info">
                    <img src="${country.flag}" alt="Vlag van ${country.name.common}" class="flag">
                    <h3 class="${fetchRegion(country.region)}">${country.name}><h3> 
                    <p class="population">Has a population of ${country.population} people</p>
                </div>  
            </li>
           `
        })
        // Het gedeelte fetch-region geeft geen tekst weer op de pagina, maar dit is om de naam van het land die daarachter wordt gedefinieerd in een bepaalde kleur die hoort bij die regio weer te geven.

        // Wat gaat er hier mis? Ik krijg nog helemaal niks op de pagina te zien. (Behalve de wereldkaart dan, maar die staat gecodeerd in de HTML.)


    // Deze functie haalt de data op van het continent waarop het land ligt m.b.v. switch statements. Bij de huiswerkklas werd gezegd dat hier geen breaks nodig waren, maar ik begrijp niet helemaal waarom.

        const currentRegion = countries.continents  // Of moet deze in onderstaande functie?

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
        fetchRegion();
        // Moet ik nu nog voor iedere case apart een referentie naar de HTML maken? Er moet geen tekst gegenreerd worden, maar ik neem aan wel een anker class voor de CSS?

        // Ik zie nog veel grijze (ongebruikte?) en paars onderlijnde (wat betekent dat precies?) variabelen, ik weet niet zo goed hoe dat dan zit.