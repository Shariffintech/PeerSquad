
class Comment  {

  static comments = [];
  constructor(comment) {
    this._title = comment.title;
    this._body = comment.body;
    this._id = comment.id;
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

  static resetComments() {
    // erase comments from comments array
    Comment.comments = [];

    // clear out the comment form 
    getComTitle().innerHTML = '';
    getComBody().innerHTML = '';

    // to do clear out the div
    const showComments = () => document.getElementById('show-comments');
    showComments().innerHTML = '';
    
  }

  async update(e) {
    e.preventDefault();

    const strongParams = {
      comment: {
        title: getComTitle().value,
        body: getComBody().value,
      }
    }
    const res = await Api.put(`/strategies/${this.strategy_id}/comments/${this._id}`, strongParams);
    const commentObj = new Comment(res);
    commentObj.render();
    if(res.status >= 200 && res.status < 300) {
    alert('Comment successfully updated');
    } else {
      alert('Comment not updated');
    }
   
    const newComment = await response.json();
    const index = Comment.all.indexOf(this);
  }

  // edit a comment
  async edit() {
   commentForm().removeEventListener('submit', this.update);
   getComTitle().value = this._title;
    getComBody().value = this._body;
    commentFormSubmit().value = 'Update Comment';
   
    
  }

  static renderAll(strategy, commentsAry) {
    // to do clear out div that im calling reset comments on
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
    deleteButton.addEventListener('click', () => this.delete(this.comment));
    deleteButton.className = 'button is-danger';


    editButton.innerText = 'Edit Comment';
    editButton.addEventListener('click', () => this.edit(this.comment));
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

    

    if (data.status >= 200 && data.status < 300) {
      alert('Comment successfully created');
      this.getComments();
    }

    this.resetComments();
  }


  async delete() {


    await Api.delete(`/strategies/${this.strategy_id}/comments/${this._id}`);

    Comment.comments = Comment.comments.filter(c => c._id !== this._id);

    Comment.getComments();

    alert('Comment successfully deleted');

  };

  static events() {
    document.querySelector('#comment-form')
    .addEventListener('submit', event => {
      event.preventDefault();
      Comment.create();
    });    
  }
  



  

};