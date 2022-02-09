
class Strategy {

    // todo change static method to prototype method and set getters for read only 
    // properties and setters for writable properties 
    // Strategy.prototype.all = [];

    static all = [];
    static currentStrategy = null;

    constructor(strategy) {
 
        this._name = strategy.name;
        this._category = strategy.category;
        this._description = strategy.description;
        this._tier = strategy.tier;
        this._reference = strategy.reference;
        this._id = strategy.id;
        Strategy.all.push(this);
       
    } 




    static resetStrategies() {
        strategyList().innerHTML = '';
    }


   static getStrategies() {
         fetch(baseUrl + '/strategies')
        .then(res => res.json())
        .then(strategiesObj => {
            Strategy.renderAll(strategiesObj)
        })
        .catch(err => console.log(err));
      
    }

     // render all strategies
      static renderAll(strategiesObj) {
        // clear the strategy list
        Strategy.resetStrategies();
        // iterate over all strategies to create a new instance for each strategy

        strategiesObj.forEach(
            strategy => { 
                // console.log("strategy",strategy)
                const strategyObj = new Strategy(strategy)
                // console.log("strategyObj", strategyObj)

                strategyObj.render(strategyObj);
                

            });
    }

    // create a new strategy
    static async create() {
       

        const strongParams = {
            strategy: {
            name : getStrategyName().value,
            reference: getStrategyReference().value,
            tier : getStrategyTier().value,
            category : getStrategyCategory().value,
            description : getStrategyDescription().value,

            }
            

        }
    
        const data = await Api.post('/strategies', strongParams);
        
        const strategyObj = new Strategy(data);

        strategyObj.render();
        
        //reset the form
        Strategy.resetStrategies();
   

        alert('Strategy successfully created');
        //render all the strategies
        Strategy.getStrategies();

    }

    // update strategy

        static async update() {
         
    
            const response = await Api.patch(`/strategies/` + Strategy.currentStrategy);
            const currentStrategy = null;
        
            const updatedStrategy = await response.json();

            const index = Strategy.all.indexOf(this);
            Strategy.all[index] = new Strategy(updatedStrategy);

            strategyForm().removeEventListener('submit',this.update);
            formHeader().innerText = "Create Strategy";
            strategyFormSubmit().value = "Create Strategy";
            strategyForm().addEventListener('submit', this.create());

            alert('Strategy successfully updated');
            //render all the strategies
            Strategy.getStrategies();


        }
    

    // edit a strategy
    async edit() {
        strategyForm().removeEventListener('submit', this.update );
        getStrategyName().value = this._name;
        getStrategyDescription().value = this._description;
        getStrategyTier().value = this._tier;
        getStrategyCategory().value = this._category;
        getStrategyReference().value = this._reference;
        Strategy.currentStrategy = this._id

        formHeader().innerText = "Edit Strategy";
        strategyFormSubmit().value = "Update Strategy";
        scrollTop();

        
    }


    static events() {

    
        document.querySelector('#strategy-form')
            .addEventListener('submit', event => {
                event.preventDefault();
                if (strategyFormSubmit().value = 'Update Strategy') {
                    Strategy.update();
                    
                } else {
                    Strategy.create();
                }
                    
            
               
            })
    }


    // render a strategy
    render() {
       
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

        h2.innerText = 'Strategy: ' + this._name;
        h4.innerText = 'Tier: ' + this._tier;
        h3.textContent = 'Category: ' + this._category;
        p3.innerText = 'Description: ' + this._description;
        p.innerText = 'Reference: ' + this._reference;
        p4.innerText = 'id: ' + this._id;

      
        // sets the textContent of the editButton and deleteButton to 'Edit' and 'Delete'

        editButton.innerText = 'Edit Strategy';
        editButton.addEventListener('click', () => this.edit(this));
        editButton.className = 'button is-primary is-light m-1';
        editButton.id = 'Edit Strategy';

      

        deleteButton.innerText = 'Delete Strategy';
        deleteButton.addEventListener('click', () => this.delete(this));
        deleteButton.className = 'button is-primary is-light m-1';
        deleteButton.id = 'Delete Strategy';

        commentButton.innerText = 'Comments';
        // commentButton.addEventListener('click', () => comments.render()); 
        // commentButton.addEventListener('click', comments.render.bind(comments));
        commentButton.addEventListener('click', () => commentModal(this));
        commentButton.className = 'js-modal-trigger button is-primary is-light m-1';
        commentButton.id = 'Comments';

        commentButton.dataset.strategyId = this._id;
        

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
    }


     // delete a strategy
     async delete() {
        await Api.delete(`/strategies/${this._id}`);

       // filter out the deleted strategy from the array

       Strategy.all = Strategy.all.filter(strategy => strategy._id !== this._id);

       Strategy.getStrategies()

       alert('Strategy successfully deleted');

    }

 
}

////////////////////////////////////////
////////// Refatoring above ^^
////////////////////////////////////////