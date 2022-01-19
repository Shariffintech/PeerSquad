/*jshint esversion: 9 */

// global variabless
const baseUrl = 'http://localhost:3000';
let strategies = [];
let comments = [];


// node getters


const strategyForm = () => document.getElementById('strategy-form');
const commentForm = () => document.getElementById('comment-form');
const strategyFormSubmit = () => document.getElementById('submit');
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


//event handlers

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
    });
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
    });
    // filtering out the strategy from the strategies array.
    strategies = strategies.filter(s => s.id !== strategy.id);
    
    // rendering the strategy from the DOM.
    alert('Strategy deleted successfully');

    renderStrategies(strategies);
    
    };


const editStrategy = strategy => {
    // trigger a modal to edit a strategy
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
    });
  
    const newStrategy = await response.json();
    const index = strategies.indexOf(this);
    strategies[index] = newStrategy;
  
    strategyForm().removeEventListener('submit', updateStrategy,);
    formHeader().innerText = "Create Strategy";
    strategyFormSubmit().value = "Create Strategy";
    strategyForm().addEventListener('submit', createStrategy);
    

    renderStrategies();
    

}

const commentModal = async (strategy) =>{
    strategy.preventDefault();

    //trigger a modal on click event to show list of comments associated with a strategy
    const modal = document.getElementById('comment-modal');
    const span = document.getElementsByClassName("close")[0];
    
   
    console.log(strategy);
    // get the comments associated with the strategy if no comments are found, prompt the user to create a comment
    const res = await fetch(baseUrl + `/strategies/${strategy.id}/${comment.id}`,
        {   method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
    );
    const comments = await res.json();
    if (comments.length === 0) {
        alert('No comments found for this strategy. Please create a comment');
        createComment();
    } else {
        // render the comments
        renderComments(comments);
    }
   

    // filter the comments to get the comments associated with the strategy
    const filteredComments = comments.filter(c => c.strategy_id === strategy.id);
    
    // render the comments
    commentList.innerHTML = '';
    filteredComments.forEach(c => renderComment(c));

    // close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    comment.forEach(comment => {
        if(comment.strategy_id === strategy.id){

            commentList.innerHTML += 
            `<li>${comment.title}</li>`,
            `<li>${comment.body}</li>`; 
  
        }
    }
    );
};



// add comment to each strategy
const createComment = async (strategy) => {
    // trigger a comment modal, then retrieve the comment title and body
    commentModal();

   
    const strongParams = {
        comment: {
        title: getComTitle().value,
        body: getComBody().value,
        strategy_id: strategy.id
        }
    };
    const response = await fetch(`${baseUrl}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(strongParams)
    });
    const comment = await response.json();
    // push comment on the comments array
    comments.push(comment);
    renderComment(comment);
    getComTitle().value = '';
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
    const commentButton = document.createElement('button');
    const showCommentButton = document.createElement('button');

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

    commentButton.innerText = ' + Add Comment';
    commentButton.addEventListener('click', commentModal);
    commentButton.className = 'js-modal-trigger button is-primary is-light m-1'; 
    commentButton.datatarget = '#comments';
    commentButton.id = 'Add Comment';
    // commentButton.onclick = function() {
    //     document.querySelector('.Add Comment')
    // };

    // showCommentButton.className = 'js-modal-trigger button is-primary is-light m-1';
    // showCommentButton.id = "Show Comments"
    // appends the new div to the strategyList() element, apply class name strategy card


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

const renderComments = async () => {
    
    comments = await loadComments();
    // loops through the strategies array and calls the renderStrategy() function for each strategy
    comments.forEach(comment => renderComment(comment));
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

const loadComment = async () => {
    const res = await fetch(baseUrl + '/comments');
    comment = await res.json();
    renderComments();
};

const loadComments = async () => {
    const res = await fetch(baseUrl + '/comments');
    const comments = await res.json();
    return comments;
};

const renderComment = async (comment) => {
    
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
     

    h3.innerText = comment.title;
    p.innerText = comment.body;

    // sets the textContent of the editButton and deleteButton to 'Edit' and 'Delete'

    deleteButton.innerText = 'Delete Strategy';
    deleteButton.addEventListener('click', e => deleteComment(comment));


    editButton.innerText = 'Edit Strategy';
    editButton.addEventListener('click', e => editComment(comment));

    // appends the new div to the commentsList() element, apply class name comment card
    div.className = 'modal';
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(deleteButton);
    div.appendChild(editButton);

    
    commentList().appendChild(div);
    return commentList();

};

document.addEventListener('DOMContentLoaded', () => {
    loadStrategy();
    attachFormEvents();
});
