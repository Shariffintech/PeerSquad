// fetch the strategies endpoint

class Strategy {
    constructor() {
        this.strategies = [];
    }

    static async getStrategy() {
        const res = await fetch(baseUrl + "/strategies", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(strongParams)
        }).catch(err => {
            alert(err)
        });

        // get the new strategy from the response
        return await res.json();
    }

    static async deleteStrategy(strategy) {
        // fetching the strategy with the ID of the strategy we want to delete.
        await fetch(baseUrl + `/strategies/${strategy.id}`, {
            method: "DELETE"
        }).catch(err => {
            // alert('Strategy was not deleted');
            alert(err)
        });

        // Remove strategy and re-render
        this.strategies = this.strategies.filter(({ id }) => id !== strategy.id);
        this.renderAll();

        alert('Strategy successfully deleted');
    };

    // create a new strategy
    async create() {
        const name = getStrategyName().value;
        const reference = getStrategyReference().value;
        const tier = getStrategyTier().value;
        const category = getStrategyCategory().value;
        const description = getStrategyDescription().value;

        const strategy = await this.getStrategy({
            strategy: {
                name,
                reference,
                tier,
                category,
                description
            }
        });

        this.strategies.push(strategy);
        this.render(strategy);

        /*newStrategy.render();
        strategyForm().reset();
        scrollTop();*/
        alert('Strategy successfully created');
    }

    resetStrategies() {
        strategyList().innerHTML = '';
    }

    attachFormEvents() {
        strategyForm().addEventListener('submit', createStrategy);
        commentForm().addEventListener('submit', createComment);
    }

    // render a strategy
    render(strategy) {
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

        h2.innerText = 'Strategy: ' + strategy.name;
        h4.innerText = 'Tier: ' + strategy.tier;
        h3.textContent = 'Category: ' + strategy.category;
        p3.innerText = 'Description: ' + strategy.description;
        p.innerText = 'Reference: ' + strategy.reference;
        p4.innerText = 'Timestamp: ' + strategy.created_at;


        // sets the textContent of the editButton and deleteButton to 'Edit' and 'Delete'

        editButton.innerText = 'Edit Strategy';
        editButton.addEventListener('click', () => this.editStrategy(strategy));
        editButton.className = 'button is-primary is-light m-1';
        editButton.id = 'Edit Strategy';

        // on click evoke scrollTop() function for edit button

        deleteButton.innerText = 'Delete Strategy';
        deleteButton.addEventListener('click', () => this.deleteStrategy(strategy));
        deleteButton.className = 'button is-primary is-light m-1';
        deleteButton.id = 'Delete Strategy';

        commentButton.innerText = 'Comments';
        commentButton.addEventListener('click', commentModal);
        commentButton.className = 'js-modal-trigger button is-primary is-light m-1';
        commentButton.id = 'Comments';

        commentButton.dataset.strategyId = this.id;

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

    // render all strategies
    renderAll() {
        this.resetStrategies();
        this.strategies.forEach(strategy => this.render(strategy));
    }
}

////////////////////////////////////////
////////// Refatoring above ^^
////////////////////////////////////////