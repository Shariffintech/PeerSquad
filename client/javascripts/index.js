/*jshint esversion: 8 */

// global variabless
const baseUrl = 'http://localhost:3000';
let strategies = [];


// node getters

function strategyList() {
    return document.getElementById('strategies');
}
const strategyForm = () => document.getElementById('strategy-form')
const strategyFormSubmit = () => document.getElementById('submit')
const getStrategyName = () => document.getElementById('name')
const getStrategyReference = () => document.getElementById('reference')
const getStrategyTier = () => document.getElementById('tier')
const getStrategyCategory = () => document.getElementById('category')
const getStrategyDescription = () => document.getElementById('description')


const resetStrategies = () => {
    strategyList().innerHTML = ''
}

// event listeners

// attaching an event listener to the form

const attachFormEvents = () => {
    strategyForm().addEventListener('submit', createStrategy);
}


//event handler

const createStrategy = async (e) => {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const reference = document.getElementById('reference').value;
    const tier = document.getElementById('tier').value;
    const category = document.getElementById('category').value;
    const name = document.getElementById('name').value;

    const strongParams = {
        strategy: { 
        name,
        tier,
        description,
        reference,
        category
        }
    }

    const res = await fetch(baseUrl + "/strategies", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(strongParams)
    });

    const strategy = await res.json();
    // push new strategy to the strategies array
    strategies.push(strategy);
    renderStrategy(strategy);
    strategyForm().reset();
    alert('strategy created')
};


const deleteStrategy = async strategy => {
    // fetching the strategy with the ID of the strategy we want to delete.
   await fetch(baseUrl + `/strategies/${strategy.id}`, {
        
         // deleting the strategy with the DELETE HTTP method.
        method: "DELETE"
    });
    // filtering out the strategy from the strategies array.
    strategies = strategies.filter(s => s.id !== strategy.id);
    renderStrategy();
};

const editStrategy = async (e) => {
    const id = e.target.dataset.id;
    const res = await fetch(baseUrl + `/strategies/${id}`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    }
    );
    const strategy = await res.json();
    renderStrategy(strategy);
};





/* Renderer's */

// this function creates a new div element and adds it to the strategyList() element
const renderStrategy = (strategy) => {
    const strategyList = () => document.getElementById('strategies')
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const h4 = document.createElement('h4');
    const p = document.createElement('p');
    const h2 = document.createElement('h2');
    const p3 = document.createElement('p');
    const p4 = document.createElement('p');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    // creates two new elements, h3 and p, and adds them to the new div
    // sets the textContent of the h3, p elements to the strategy content.
    // const strategyName = document.getElementById('name').name;
    // strategyName

    h2.innerText = strategy['name'];
    h4.innerText = strategy['tier'];
    h3.textContent = strategy['category'];
    console.log(strategy);
    p3.innerText = strategy['description'];
    p.innerText = strategy['reference'];
    p4.innerText = strategy['created_at'];
    
    editButton.innerText = 'Edit'
    editButton.addEventListener('click', e => editStrategy(strategy))
    
    deleteButton.innerText = 'Delete'
    deleteButton.addEventListener('click', e => deleteStrategy(strategy))

    p.style.color = 'blue'
    h3.style.color = 'green'
   

    // adding elements into the DOM
    div.appendChild(h2)
    div.appendChild(h3)
    div.appendChild(h4)
    div.appendChild(p3)
    div.appendChild(p)
    div.appendChild(p4)
    div.appendChild(deleteButton)
    div.appendChild(editButton)

    strategyList().appendChild(div)

}

const renderStrategies = async () => {
    // clear the list of any existing strategies
    resetStrategies();
    strategies = await loadStrategies()
    // loops through the strategies array and calls the renderStrategy() function for each blog
    strategies.forEach(strategy => renderStrategy(strategy));
}


const loadStrategy = async () => {
    const res = await fetch(baseUrl + '/strategies');
    strategy = await res.json();
    renderStrategies();
};

const loadStrategies = async () => {
    const res = await fetch(baseUrl + '/strategies');
    const strategies = await res.json();
    
    return strategies;
};

document.addEventListener('DOMContentLoaded', () => {
    loadStrategy();
    attachFormEvents();
});
