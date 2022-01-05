/*jshint esversion: 6 */

// overview

// have one event handler on the 
// document that will handle all events of a particular type.

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
    const div2 = document.createElement('div');

}
// node getter

const strategyList = () => document.getElementById('strategies')
const strategyForm = () => document.getElementById('strategy-form')

const renderStrategy = (strategy) => {
    const strategyList = document.getElementById('strategies')
    const strategyDiv = document.createElement('div')
    const strategyH3 = document.createElement('h3')
    const strategyP = document.createElement('p')
    const strategyButton = document.createElement('button')
    const strategyButton2 = document.createElement('button')

    strategyDiv.classList.add('strategy')
    strategyH3.innerText = strategy.title
    strategyP.innerText = strategy.description
    strategyButton.innerText = 'Edit'
    strategyButton.classList.add('edit-strategy')
    strategyButton.dataset.id = strategy.id
    strategyButton2.innerText = 'Delete'
    strategyButton2.classList.add('delete-strategy')
    strategyButton2.dataset.id = strategy.id

    strategyDiv.append(strategyH3)
    strategyDiv.append(strategyP)
    strategyDiv.append(strategyButton)
    strategyDiv.append(strategyButton2)
    strategyList.append(strategyDiv)

}

const renderStrategies = async () => {
    resetStrategies();
    strategies = await loadStrategies()
    strategies.forEach(strategy => renderStrategy(strategy));
}

const loadStrategies = async () => {
    const res = await fetch(baseUrl + '/api/strategies')
    const strategies = await res.json()
    console.log('strategies', strategies)
    renderStrategies();
    sortStrategies();
    return strategies
}


const sortStrategies = (strategies) => {
    // sort strategies by most recent
    strategies.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
    })
}

// event handler
const attachFormEvents = () => {
    strategyForm.addEventListener('submit', createStrategy)
}

// node setter

