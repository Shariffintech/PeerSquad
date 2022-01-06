/*jshint esversion: 8 */

// overview

// have one event handler on the 
// document that will handle all events of a particular type.

// when : on load

//cause of trigger "onload"

//trigger'd effect - grab strategies from the backend show them on the page

// global variabless
const baseUrl = 'http://localhost:3000';

let strategies = []


// node getters

const strategyList = () => document.getElementById('strategies')
const strategyForm = () => document.getElementById('strategy-form')
const strategyFormSubmit = () => document.getElementById('submit')
const getStrategyName = () => document.getElementById('strategy-name')
// const getStrategyReference = () => document.getElementById('strategy-reference')
// const getStrategyTier = () => document.getElementById('tier')
// const getStrategyCategory = () => document.getElementById('category')
const getStrategyDescription = () => document.getElementById('description')


const resetStrategies = () => {
    strategyList().innerHTML = ''
}
/* Renderer's */

// this function creates a new div element and adds it to the strategyList() element
const renderStrategy = (strategy) => {
    const strategyList = document.getElementById('strategies')
    const div = document.createElement('div')
    const h3 = document.createElement('h3')
    const p = document.createElement('p')
    const editButton = document.createElement('button')
    const deleteButton = document.createElement('button')
   
    // creates two new elements, h3 and p, and adds them to the new div
    // sets the textContent of the h3, p elements to the strategy content.
    div.classList.add('strategy')
    h3.textContent = strategy.strategy
    p.textContent = strategy.description
    p.textContent = strategy.reference
    p.textContent = strategy.tier
    p.textContent = strategy.created_at
    p.textContent = strategy.category
    p.style.color = 'blue'

    editButton.textContent = 'Edit'
    editButton.classList.add('edit-strategy')
    editButton.dataset.id = strategy.id
    editButton.addEventListener('click', editStrategy)

    deleteButton.textContent = 'Delete'
    deleteButton.classList.add('delete-strategy')
    deleteButton.dataset.id = strategy.id
    deleteButton.addEventListener('click', deleteStrategy)

    // adding elements into the DOM
    div.appendChild(h3)
    div.appendChild(p)
    div.appendChild(button)

    strategyList().append(div)

}

const renderStrategies = async () => {
    // clear the list of any existing strategies
    resetStrategies();
    strategies = await loadStrategies()
    // loops through the strategies array and calls the renderStrategy() function for each blog
    strategies.forEach(strategy => renderStrategy(strategy));
}

const sortStrategies = (strategies) => {
    // sort strategies by most recent
    strategies.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
    })
}

// event handler

const attachFormEvents = () => {
    strategyForm().addEventListener('submit', createStrategy);
}

// attaching an event listener to the form

const createStrategy = async (s) => {
    s.preventDefault();

    const description = document.getElementById('description').value;
    const reference = document.getElementById('strategy-reference').value;
    const tier = document.getElementById('tier').value;
    const category = document.getElementById('category').value;
    const strategyName = document.getElementById('strategy-name').value;

    const strongParams = {
        strategy: { strategyName,
        tier,
        description,
        reference,
        category
        }
    }

    const res = await fetch(baseUrl + '/api/strategies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({strongParams})
    })
    const strategy = await res.json()
    strategies.push(strategy)
    renderStrategy(strategy)
    strategyForm().reset();
}

const loadStrategy = async () => {
    const res = await fetch(baseUrl + '/api/strategies/');
    strategy = await res.json()
    renderStrategies();
}

document.addEventListener('DOMContentLoaded', () => {
    loadStrategy();
    attachFormEvents();
});
