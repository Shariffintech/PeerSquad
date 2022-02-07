
class Comment  {

  static comments = [];
  constructor(comment) {
    console.log('in comment')
    this._title = comment.title;
    console.log('in comment 2')
    this._body = comment.body;
    this.strategy_id = comment.strategy.id
    Comment.comments.push(this);
  }


  // get all comments from associated strategy
  static getComments() {

    fetch(Api.baseUrl + `/strategies/${this.comments}/comments`)
      .then(res => res.json())
      //render all comments associated with the strategy, if there are any
      .then(commentsObj => { Comment.renderAll(commentsObj) })
      .catch(err => console.log(err));
  }

  // edit a comment
  static async edit(comment) {
  }

  static renderAll(strategy, commentsAry) {
    Comment.resetComments();
    commentsAry.forEach(
      c => {
        const comment = new Comment(c);
        comment.render();
    });
 }

  // get comments() {
  //   return this._comments;
  // }

  static resetComments() {
    // erase comments from comments array
    Comment.comments = [];

  }


  render() {
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
     

    h3.innerText = this._title;
    h3.className = 'title is-3';
    p.innerText = this._body;
    p.className = 'body is-5';

    // sets the textContent of the editButton and deleteButton to 'Edit' and 'Delete'

    deleteButton.innerText = 'Delete Comment';
    deleteButton.addEventListener('click', () => Comment.delete(comment));
    deleteButton.className = 'button is-danger';


    editButton.innerText = 'Edit Comment';
    editButton.addEventListener('click', () => Comment.edit(comment));
    editButton.className = 'button is-warning';


    // appends the new div to the commentsList() element, apply class name comment card

    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(deleteButton);
    div.appendChild(editButton);
    // append div to the show-comments element
    const showComments = () => document.getElementById('show-comments')


    showComments().appendChild(div);

  }

  // Crud Comment Actions
  static async create() {


    const strongParams = {
      comment: {
        title: getComTitle().value,
        body: getComBody().value,
     }
    }
    
    
    const strategyId = commentList().getAttribute('strategyid');
    
  
    const data = await Api.post(`/strategies/${strategyId}/comments`, strongParams);

    const commentObj = new Comment(data);

    commentObj.render();

    resetComments();

    alert('Comment successfully created');
  }


  static async deleteComment(comment) {
    // fetching the Comment with the ID of the Comment we want to delete.
    await fetch(baseUrl + `/strategies/${comment.strategy_id}/comments/${comment.id}`, {
      method: "DELETE"
    }).catch(err => {
      // alert('Comment was not deleted');
      alert(err)
    });

    // Remove strategy and re-render
    this._comments = this._comments.filter(({id}) => id !== comment.id);
    this.renderAll();

    alert('Strategy successfully deleted');
  };

  static events() {
    document.querySelector('#comment-form')
    .addEventListener('submit', event => {
      event.preventDefault();
      Comment.create();
    });    
  }
  



  

};