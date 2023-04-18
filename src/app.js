import axios from "axios";

const countryList = document.getElementById('countries');
const errorMessage= document.getElementById('error');

async function fetchCountries() {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all")
        const countryList = response.data[0]

        countryList.innerHTML = `
            <li id="country-name"></li>
            <li id="country-flag"></li>
            <li id="country-population">Has a population of: </li>
        `

    } catch(e) {
        // errors afvangen in de console
        console.error(e);
        // error communiceren in de UI
        if (e.response.status === 404) {
            errorMessage.textContent = "Page not found | 404" }
        else if (e.response.status === 500) {
            errorMessage.textContent = "Internal server error | 500"
        }
    }
}
void fetchCountries()