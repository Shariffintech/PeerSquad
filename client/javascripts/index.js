/*jshint esversion: 9 */

Strategy.events();
Strategy.getStrategies();
// Comment.events();
Comment.getComments();

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

  const response = await fetch(Api.baseUrl + `/strategies/${this.id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(strongParams)
  }).catch(err => {
    alert(err)
  });

  const newStrategy = await response.json();
  const index = Strategy.all.indexOf(this);
  Strategy.all[index] = new Strategy(newStrategy);


  strategyForm().removeEventListener('submit', updateStrategy, );
  formHeader().innerText = "Create Strategy";
  strategyFormSubmit().value = "Create Strategy";
  strategyForm().addEventListener('submit', (event) => {
    createStrategy(event);
  });


  // Strategy.renderAll();


}

const deleteStrategy = async strategy => {
  const strategy_id = strategy.strategy_id;
  // fetching the strategy with the ID of the strategy we want to delete.
  await fetch(Api.baseUrl + '/strategies/' + strategy_id, {

    // deleting the strategy with the DELETE HTTP method.
    method: "DELETE"
  }).catch(err => {
    alert(err)
  });
  // filtering out the strategy from the strategies array.
  console.log(strategy);
  Strategy.all = Strategy.all.filter(s => s.id !== strategy.id);


};

const commentModal = async (strategy) => {

  // trigger a modal and show a comment form and overlay from the modal.js file
  // if the user clicks the overlay, close the modal
  // if the user clicks the submit button, create a call the createComment function to create a new comment

  // get the comments associated with the strategy if no comments are found, prompt the user to create a comment
  const res = await fetch(Api.baseUrl + `/strategies/${strategy.currentTarget.dataset.strategyId}/comments`)
    // catch any errors
    .catch(err => {
      alert(err)
    });



  const comments = await res.json();


  // Functions to open and close a modal
  function openModal($el) {


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

const deleteComment = async comment => {

  // fetching the strategy with the ID of the strategy we want to delete.
  await fetch(Api.baseUrl + `/strategies/${comment.strategy_id}/comments/${comment.id}`, {
    method: 'DELETE'
  }).catch(err => {
    alert(err)
  });
  // filtering out the strategy from the strategies array.
  Comment.all = Comment.all.filter(c => c.id !== comment.id);

  alert('Comment successfully deleted');

  renderComments(comments);


};

const editComment = (comment) => {
  commentForm().removeEventListener('submit', createComment);
  getComTitle().value = comment.title;
  getComBody().value = comment.body;
  formHeader().innerText = "Edit Comment";
  commentFormSubmit().value = "Edit Comment";
  commentForm().addEventListener('submit', comment => {
    updateComment(comment)
  });

};

async function updateComment(e) {
  e.preventDefault();
  const strongParams = {
    comment: {
      title: getComTitle().value,
      body: getComBody().value,
    }
  }

  console.log(comment)
  const response = await fetch(Api.baseUrl + `/strategies/${strategy.target.dataset.strategyId}/comments/${this.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      strongParams
    })
  }).catch(err => {
    alert(err)
  });

  const editedComment = await response.json();

  const index = comments.indexOf(editedComment);
  comments[index] = editedComment;
  formHeader().innerText = 'Update Comment';
  commentFormSubmit().value = 'Update Comment';
  commentForm().addEventListener('submit', createComment);
  renderComments();
}




