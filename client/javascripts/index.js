/*jshint esversion: 9 */



// global variabless
const baseUrl = 'http://localhost:3000';
let strategies = [];
let comments = [];


// node getters


const strategyForm = () => document.getElementById('strategy-form');
const commentForm = () => document.getElementById('comment-form');
const strategyFormSubmit = () => document.getElementById('submit');
const commentFormSubmit = () => document.getElementById('comment-submit');
const getStrategyName = () => document.getElementById('name');
const getStrategyReference = () => document.getElementById('reference');
const getStrategyTier = () => document.getElementById('tier');
const getStrategyCategory = () => document.getElementById('category');
const getStrategyDescription = () => document.getElementById('description');
const formHeader = () => document.getElementById('form-header');
const getComTitle = () => document.getElementById('comment-title');
const getComBody = () => document.getElementById('comment-body');
const strategyList = () => document.getElementById('strategies');
const commentList = () => document.getElementById('comments');
const scrollTop = () => document.documentElement.scrollTop = 0;




const resetStrategies = () => {
    strategyList().innerHTML = '';
};

// event listeners


// attaching an event listener to the form

const attachFormEvents = () => {
    strategyForm().addEventListener('submit', createStrategy);
    commentForm().addEventListener('submit', createComment);
};


// Crud Strategy Actions

const createStrategy = async (e) => {
    e.preventDefault();
    // create a new strategy object
    const strongParams = {
        strategy: { 
        name: getStrategyName().value,
        description: getStrategyDescription().value,
        tier: getStrategyTier().value,
        reference: getStrategyReference().value,
        category: getStrategyCategory().value
        }
    };
    // fetch the strategies endpoint
    const res = await fetch(baseUrl + "/strategies", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(strongParams)
    }).catch(err => { alert(err) });
    // get the new strategy from the response
    const strategy = await res.json();

    // push new strategy to the strategies array
    strategies.push(strategy);
    // render the new strategy
    renderStrategy(strategy);
    // clear the form
    strategyForm().reset();
    alert('Strategy created successfully');
};


const deleteStrategy = async strategy => {
    // fetching the strategy with the ID of the strategy we want to delete.
   await fetch(baseUrl + `/strategies/${strategy.id}`, {
        
         // deleting the strategy with the DELETE HTTP method.
        method: "DELETE"
    }).catch(err => { alert(err) });
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
    strategyForm().addEventListener('click', scrollTop);
    alert('Please update the '+ strategy.name +' strategy in the form fields');
    scrollTop();

    };
    
async function updateStrategy(e) {
     e.preventDefault();
  
  
 const strongParams = {
    strategy: {
        name: getStrategyName().value,
        description: getStrategyDescription().value,
        reference: getStrategyReference().value,
        tier: getStrategyTier().value,
        category: getStrategyCategory().value
        }
    };
  
    const response = await fetch(baseUrl + `/strategies/${this.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(strongParams)
    }).catch(err => { alert(err) });
  
    const newStrategy = await response.json();
    const index = strategies.indexOf(this);
    strategies[index] = newStrategy;
  
    strategyForm().removeEventListener('submit', updateStrategy,);
    formHeader().innerText = "Create Strategy";
    strategyFormSubmit().value = "Create Strategy";
    strategyForm().addEventListener('submit', createStrategy);
    

    renderStrategies();
    

}

// Crud Comment Actions

// renders the comments to the DOM, prompts the create comment form if none exists

const commentModal = async (strategy) => {

    // trigger a modal and show a comment form and overlay from the modal.js file
    // if the user clicks the overlay, close the modal
    // if the user clicks the submit button, create a call the createComment function to create a new comment
    
    // get the comments associated with the strategy if no comments are found, prompt the user to create a comment
    const res = await fetch(baseUrl + `/strategies/${strategy.currentTarget.dataset.strategyId}/comments`,
    // add conditional to check if there are comments
        {   
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        // catch any errors
        .catch(err => { alert(err) });
        
      

    const comments = await res.json();


    // Functions to open and close a modal
    function openModal($el) {
                
        console.log($el);
        $el.classList.add("is-active");
       
        $el.setAttribute('strategyId', strategy.target.dataset.strategyId);
      }
    
      function closeModal($el) {
        $el.classList.remove('is-active');
      }
    
      function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
          closeModal($modal);
        });
      }
    
    // Add a click event on buttons to open a specific modal
      (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);
        
      
        $trigger.addEventListener('click', () => {
          openModal($target);
        });
      });
    
      // Add a click event on various child elements to close the parent modal
      (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');
      
        $close.addEventListener('click', () => {
          closeModal($target);
        });
      });
    
      // Add a keyboard event to close all modals
      document.addEventListener('keydown', (event) => {
        const e = event || window.event;
      
        if (e.keyCode === 27) { // Escape key
          closeAllModals();
        }
      });
      const el = document.getElementById("comments");
    // if there are comments, render them to the DOM

    // if comments are not found, prompt the user to create a comment
    
    if (comments.length > 0) { 
        renderComments(comments);

    } else {
        // if there are no comments, prompt the user to create a comment
        alert('No comments found. Please create a comment');
        openModal(el);
        
    }
        
    openModal(el);
                        
    
          
};


// create comment under associated strategy
const createComment = async (e) => {
    e.preventDefault();
   // create strong params for the comment
    const strongParams = {
        comment: {
        title: getComTitle().value,
        body: getComBody().value,
        }
    };

    const strategyId = document.getElementById('comments').getAttribute('strategyid')
    // post the comment to the comments endpoint with the associated strategy id
    const response = await fetch(baseUrl + `/strategies/${strategyId}/comments`, {
        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(strongParams)
    }).catch(err => { alert(err) });
    const comment = await response.json();
    // push comment on the comments array
    comments.push(comment);
    renderComment(comment);
    getComTitle().value = '';
    getComBody().value = '';
    alert('Comment successfully added');
};

const deleteComment = async comment => {

    // fetching the strategy with the ID of the strategy we want to delete.
    await fetch(baseUrl + `/strategies/${comment.strategy_id}/comments/${comment.id}`, {
        method: 'DELETE'
    }).catch(err => { alert(err) });
    // filtering out the strategy from the strategies array.
    comments = comments.filter(c => c.id !== comment.id);

    alert('Comment successfully deleted');
  
    renderComments(comments);


};

const editComment = (comment) => {
    commentForm().removeEventListener('submit', createComment);
    getComTitle().value = comment.title;
    getComBody().value = comment.body;
    formHeader().innerText = "Edit Comment";
    commentFormSubmit().value = "Edit Comment";
    commentForm().addEventListener('submit',(comment) => {updateComment(comment)});
    console.log(comment);
};

async function updateComment(e){
    e.preventDefault();
    const strongParams = {
        comment: {
        title: getComTitle().value,
        body: getComBody().value,
        }
    }
    
    
    const response = await fetch(baseUrl + `/strategies/${strategy.id}/comments/${comment.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({strongParams})
    }).catch(err => { alert(err) });

    const editedComment = await response.json();

    const index = comments.indexOf(editedComment);
    comments[index] = editedComment;
    formHeader().innerText = 'Update Comment';
    commentFormSubmit().value = 'Update Comment';
    commentForm().addEventListener('submit', createComment);
    renderComments();
}



const renderComment = async (comment, parentContext) => {
    
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
     

    h3.innerText = comment.title;
    h3.className = 'title is-3';
    p.innerText = comment.body;
    p.className = 'body is-5';

    // sets the textContent of the editButton and deleteButton to 'Edit' and 'Delete'

    deleteButton.innerText = 'Delete Comment';
    deleteButton.addEventListener('click', e => deleteComment(comment));
    deleteButton.className = 'button is-danger';


    editButton.innerText = 'Edit Comment';
    editButton.addEventListener('click', e => editComment(comment));
    editButton.className = 'button is-warning';


    // appends the new div to the commentsList() element, apply class name comment card

    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(deleteButton);
    div.appendChild(editButton);
    // append div to the show-comments element
    const showComments = () => document.getElementById('show-comments').appendChild(div);


    showComments();
};


const renderComments = async (comments) => {
    // Functions to open and close a modal
    function openModal($el) {
                
        $el.classList.add("is-active");
       

      }
    
      function closeModal($el) {
        $el.classList.remove('is-active');
      }
    
      function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
          closeModal($modal);
        });
      }
    
    // Add a click event on buttons to open a specific modal
      (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);
        
      
        $trigger.addEventListener('click', () => {
          openModal($target);
        });
      });
    
      // Add a click event on various child elements to close the parent modal
      (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');
      
        $close.addEventListener('click', () => {
          closeModal($target);
        });
      });
    
      // Add a keyboard event to close all modals
      document.addEventListener('keydown', (event) => {
        const e = event || window.event;
      
        if (e.keyCode === 27) { // Escape key
          closeAllModals();
        }
      });

    const el = document.getElementById("comments");
    // open modal and render comments
    openModal(el);
    comments.forEach(comment => renderComment(comment, el));

};

const loadComment = async () => {
    const res = await fetch(baseUrl + '/comments').catch(err => { alert(err)} );
    comment = await res.json();
    renderComments();
};

const loadComments = async () => {
    const res = await fetch(baseUrl + '/comments').catch(err => { alert(err)} );
    const comments = await res.json();
    return comments;
};

/* Strategy Renderer's */

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
    const commentButton = document.createElement('button');
    

    // creates two new elements, h3 and p, and adds them to the new div
    // sets the textContent of the h3, p elements to the strategy content.
   
    h2.innerText = 'Strategy: '+ strategy.name;
    h4.innerText = 'Tier: ' + strategy.tier;
    h3.textContent = 'Category: ' + strategy.category;
    p3.innerText = 'Description: ' + strategy.description;
    p.innerText = 'Reference: ' + strategy.reference;
    p4.innerText = 'Timestamp: ' + strategy.created_at;


    // sets the textContent of the editButton and deleteButton to 'Edit' and 'Delete'
    
    editButton.innerText = 'Edit Strategy';
    editButton.addEventListener('click', e => editStrategy(strategy),);
    editButton.className = 'button is-primary is-light m-1';
    editButton.id = 'Edit Strategy';

    // on click evoke scrollTop() function for edit button


    
    deleteButton.innerText = 'Delete Strategy';
    deleteButton.addEventListener('click', e => deleteStrategy(strategy));
    deleteButton.className = 'button is-primary is-light m-1';
    deleteButton.id = 'Delete Strategy';

    commentButton.innerText = 'Comments';
    commentButton.addEventListener('click', commentModal);
    commentButton.className = 'js-modal-trigger button is-primary is-light m-1'; 
    commentButton.id = 'Comments';
 
    commentButton.dataset.strategyId = strategy.id;



    p.style.color = 'blue';
    h3.style.color = 'green';
    div.className = 'strategy-card m-3 p-3 has-background-warning-light';
   

    // adding elements into the DOM
    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(h4);
    div.appendChild(p3);
    div.appendChild(p);
    div.appendChild(p4);
    div.appendChild(deleteButton);
    div.appendChild(editButton);
    div.appendChild(commentButton);

    commentList().appendChild(div);
    strategyList().appendChild(div);
    
    return strategyList();

};

const renderStrategies = async () => {
    // clear the list of any existing strategies
    resetStrategies();
    strategies = await loadStrategies().catch(err => console.log(err));
    // loops through the strategies array and calls the renderStrategy() function for each strategy
    strategies.forEach(strategy => renderStrategy(strategy));

};



const loadStrategy = async () => {
    const res = await fetch(baseUrl + '/strategies').catch(err => console.log(err));
    strategy = await res.json();
    renderStrategies();
};

const loadStrategies = async () => {
    const res = await fetch(baseUrl + '/strategies').catch(err => console.log(err));
    const strategies = await res.json();
    
    return strategies;
};



document.addEventListener('DOMContentLoaded', () => {
       
    loadStrategy();
    attachFormEvents();

    
})  ;
