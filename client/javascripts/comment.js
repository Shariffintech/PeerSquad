/*jshint esversion: 8 */


class Comment {
    constructor() {
      this.comments = [];
    
    }

    static async getComments() {
      const response = await fetch(baseUrl + `/strategies/${strategyId}/comments`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      return await response.json();

    }
    static attachFormEvents () {
      commentForm().addEventListener('submit', createComment);
    }
  
    // Crud Comment Actions
    async create(e) {

      e.preventDefault();
      const title = getComTitle().value;
      const body = getComBody().value;
      const strategy_id = document.getElementById('comments').getAttribute('strategyid')
      const comment = new Comment(title, body, strategy_id);
  
      const response = await fetch(baseUrl + `/strategies/${strategyId}/comments`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify(comment)
      }).catch(err => { alert(err) });
      const newComment = await response.json();
      comments.push(newComment);
      renderComments();
      getComTitle().value = '';
      getComBody().value = '';
      alert('Comment successfully created');
    }

    

    render(comment) {
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
     

    h3.innerText = this.title;
    h3.className = 'title is-3';
    p.innerText = this.body;
    p.className = 'body is-5';

    // sets the textContent of the editButton and deleteButton to 'Edit' and 'Delete'

    deleteButton.innerText = 'Delete Comment';
    deleteButton.addEventListener('click', () => this.deleteComment(comment));
    deleteButton.className = 'button is-danger';


    editButton.innerText = 'Edit Comment';
    editButton.addEventListener('click', () => this.editComment(comment));
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
    
    renderAll() {
      this.comments.forEach(comment => this.render(comment));
    }


      
    
  };






