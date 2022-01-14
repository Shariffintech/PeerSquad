/*jshint esversion: 9 */

// global variabless
const baseUrl = 'http://localhost:3000';
let strategies = [];
let comments = [];


// node getters


const strategyForm = () => document.getElementById('strategy-form');
const strategyFormSubmit = () => document.getElementById('submit');
const getStrategyName = () => document.getElementById('name');
const getStrategyReference = () => document.getElementById('reference');
const getStrategyTier = () => document.getElementById('tier');
const getStrategyCategory = () => document.getElementById('category');
const getStrategyDescription = () => document.getElementById('description');
const formHeader = () => document.getElementById('form-header');
const getComTitle = () =>document.getElementById('title');
const getComBody = () => document.getElementById('body');
const strategyList = () => document.getElementById('strategies');


const resetStrategies = () => {
    strategyList().innerHTML = '';
};

// event listeners

// attaching an event listener to the form

const attachFormEvents = () => {
    strategyForm().addEventListener('submit', createStrategy);
};


//event handler

const createStrategy = async (e) => {
    e.preventDefault();


    const strongParams = {
        strategy: { 
        name: getStrategyName().value,
        description: getStrategyDescription().value,
        tier: getStrategyTier().value,
        reference: getStrategyReference().value,
        category: getStrategyCategory().value
        }
    };

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
    alert('Strategy created successfully');
};


const deleteStrategy = async strategy => {
    // fetching the strategy with the ID of the strategy we want to delete.
   await fetch(baseUrl + `/strategies/${strategy.id}`, {
        
         // deleting the strategy with the DELETE HTTP method.
        method: "DELETE"
    });
    // filtering out the strategy from the strategies array.
    strategies = strategies.filter(s => s.id !== strategy.id);
    
    // rendering the strategy from the DOM.
    alert('Strategy deleted successfully');

    renderStrategies(strategies);
    
    };


const editStrategy = strategy => {
    strategyForm().removeEventListener('submit', createStrategy);
    getStrategyName().value = strategy.name;
    getStrategyDescription().value = strategy.description;
    getStrategyReference().value = strategy.reference;
    getStrategyTier().value = strategy.tier;
    getStrategyCategory().value = strategy.category;
    strategyFormSubmit().value = 'Update Strategy';
    formHeader().innerText = 'Edit strategy';
    updateStrategy = updateStrategy.bind(strategy); 
    strategyForm().addEventListener('submit', updateStrategy);
 

    };
    
updateStrategy = async e => {
    e.preventDefault();
  
    console.log(this);
  
 const strongParams = {
    strategy: {
        name: getStrategyName().value,
        description: getStrategyDescription().value,
        reference: getStrategyReference().value,
        tier: getStrategyTier().value,
        category: getStrategyCategory().value
        }
    };
  
    const response = await fetch(baseUrl + `/strategies/${ this.id }`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(strongParams)
    });
  
    const newStrategy = await response.json();
    const index = strategies.indexOf(this);
    strategies[index] = newStrategy;
  
    strategyForm().removeEventListener('submit', updateStrategy);
    formHeader().innerText = "Create Strategy";
    strategyFormSubmit().value = "Create Strategy";
    strategyForm().addEventListener('submit', createStrategy);
  
    renderStrategy();
};


const createComment = async (c) => {
    c.preventDefault();

    const id = c.target.dataset.id;
    
    const strongParams = {
        comment: {
            title: getComTitle().value,
            body: getComBody().value
        }
    };

    const res = await fetch(baseUrl + `/comments/${id}`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(strongParams)
    });
    const comment = await res.json();
    renderComment(comment);
    alert('Comment successfully added');

};  

const deleteComment = async (comment) => {
    // fetching the strategy with the ID of the strategy we want to delete.
    await fetch(baseUrl + `/comments/${comment.id}`, {
        method: 'DELETE'
    });
    // filtering out the strategy from the strategies array.
    comments = comments.filter(s => s.id !== id);

    renderComment(comment);
};




/* Renderer's */

// this function creates a new div element and adds it to the strategyList() element
const renderStrategy = (strategy) => {

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
   
    h2.innerText = strategy.name;
    h4.innerText = strategy.tier;
    h3.textContent = strategy.category;
    p3.innerText = strategy.description;
    p.innerText = strategy.reference;
    p4.innerText = strategy.created_at;

    // sets the textContent of the editButton and deleteButton to 'Edit' and 'Delete'
    
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', e => editStrategy(strategy));
    
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', e => deleteStrategy(strategy));

    // appends the new div to the strategyList() element, apply class name strategy card

    p.style.color = 'blue';
    h3.style.color = 'green';
    div.className = 'strategy-card';
   

    // adding elements into the DOM
    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(h4);
    div.appendChild(p3);
    div.appendChild(p);
    div.appendChild(p4);
    div.appendChild(deleteButton);
    div.appendChild(editButton);

    strategyList().appendChild(div);
    return strategyList();

};

const renderStrategies = async () => {
    // clear the list of any existing strategies
    resetStrategies();
    strategies = await loadStrategies();
    // loops through the strategies array and calls the renderStrategy() function for each strategy
    strategies.forEach(strategy => renderStrategy(strategy));
};


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

const loadComments = async () => {
    const res = await fetch(baseUrl + '/comments');
    const comments = await res.json();
    return comments;
};


const renderComments = async (comment) => {
    
    const commentList = document.getElementById('comments');
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
     

    h3.innerText = comment.title;
    p.innerText = comment.body;

    // sets the textContent of the editButton and deleteButton to 'Edit' and 'Delete'

    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', e => deleteComment(comment));


    editButton.innerText = 'Edit';
    editButton.addEventListener('click', e => editComment(comment));

    // appends the new div to the commentsList() element, apply class name comment card
    div.className = 'comment-card';
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(deleteButton);
    div.appendChild(editButton);

    
    commentList().appendChild(div);

};

document.addEventListener('DOMContentLoaded', () => {
    loadStrategy();
    attachFormEvents();
});
