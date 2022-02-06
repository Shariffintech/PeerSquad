/*jshint esversion: 8 */
class Comment extends Strategy {

  static comments = [];
  constructor(strategy,title,body) {
    super(strategy);
    this._title = title;
    this._body = body;
    strategy._id = strategy.id;
    console.log(strategy._id);
    Comment.comments.push(this);
    
  }


  // get all comments from associated strategy
  static getComments() {

    fetch(Api.baseUrl + `/strategies/${this.comments}/comments`)
      .then(res => res.json())
      //render all comments associated with the strategy
      .then(commentsObj => { Comment.renderAll(commentsObj) })
      if(this._comments === undefined){
        // render all strategies
        Strategy.getStrategies();
      } else {
        //render all comments associated with the strategy
        this.renderAll();
      }
  }

  static renderAll(commentObj) {
    Comment.resetComments();
    commentObj.forEach(
      comment => {
        const commentObj = new Comment(comment);
        commentObj.render();
    });
 }

  // get comments() {
  //   return this._comments;
  // }

  static resetComments() {
    commentList().innerHTML = '';
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
    const showComments = () => document.getElementById('show-comments').appendChild(div);


    showComments();

  }

  // Crud Comment Actions
  static async create() {

    e.preventDefault();

    const strongParams = {
      comment: {
        title: getComTitle().value,
        body: getComBody().value,

     }
    }
    
    const data = await Api.post('/comments', strongParams);

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

  



  

};