// overview

// when : on load

//cause of trigger "onload"

//trigger'd effect - grab strategies from the backend show them on the page

// base url
const baseUrl = 'http://localhost:3000';
let strategies = []

const resetStrategies = () => {
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');

}

const renderStrategies = async () => {
    resetStrategies();
    strategies = await loadStrategies()
    strategies.forEach(strategy => renderStrategy(strategy));
   
}

const renderStrategy = (strategy) => {

}


// node getter

const strategyList = () => document.getElementById('strategies')
const strategyForm = () => document.getElementById('strategy-form')

const loadStrategies = async () => {
    const res = await fetch(baseUrl + '/api/strategies')
    const strategies = await res.json()
    console.log('strategies', strategies)
    renderStrategies();
}


// node setter

// event handler

document.addEventListener("DOMContentLoaded", function() {
loadStrategies();
});