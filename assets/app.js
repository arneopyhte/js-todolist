



window.addEventListener('load', () => {
todos = JSON.parse(localStorage.getItem('todos')) || [];
const inputName = document.querySelector('#name');
const formInput = document.querySelector('#form-input');
storedName =  localStorage.getItem('name') || ''; //get the value stored in localstorage set empty is none
inputName.value = storedName; //assign the value
inputName.addEventListener('change',(e)=>{
    localStorage.setItem('name', e.target.value); //setting value if change
});

formInput.addEventListener('submit',(e)=>{
    e.preventDefault();// prevent reloading page
    
    //create object
    const todo = {
        todo:e.target.elements.listInput.value,
        done:false,
        createdAt:new Date().getTime()
    }
    if(e.target.elements.listInput.value != ''){
    todos.push(todo);
    }

    localStorage.setItem('todos',JSON.stringify(todos));
    //reset form
    e.target.reset();
    getList();
});
getList();
});


function getList(){
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const artList = document.querySelector('#art-list');
    const countLbl = document.querySelector('#count-lbl');
    let count = 0;
    artList.innerHTML = "";
    todos = todos.sort((a, b) => b.createdAt - a.createdAt);
    todos.forEach(todo => {
        const divList = document.createElement('div');
        const divItem = document.createElement('div');
        const input = document.createElement('input');
        const editButton = document.createElement('button');
        const delButton = document.createElement('button');
        
        input.type = 'checkbox'
        input.checked = todo.done;
        input.classList.add('red-input');
        editButton.innerHTML =`<i class="bi bi-pencil-square"> </i>`;
        delButton.innerHTML =`<i class="bi bi-trash"> </i>`;
        divItem.innerHTML = `<input type="text" class="col-12 tc-secondary" title="${todo.todo}" value="${todo.todo}" readonly>`;
        divList.classList.add('d-flex','align-items-center','gap-2','bg-light','rounded','p-1','mb-2','shadow');
        divItem.classList.add('flex-fill','tc-secondary');
        editButton.classList.add('btn','btn-sm', 'bg-mainbg','text-white')
        delButton.classList.add('btn','btn-sm', 'bg-mainbg','text-white')
        editButton.title ="Edit";
        delButton.title = "Delete";
        divList.appendChild(input);
        divList.appendChild(divItem);
        divList.appendChild(editButton);
        divList.appendChild(delButton);
        if(todo.done){
            divItem.classList.add('done');
        }
        else{
            count++;
        }
        artList.appendChild(divList);



        input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				divItem.classList.add('done');
			} else{
             
				divItem.classList.remove('done');
			}

			getList();

		});

        editButton.addEventListener('click', (e) => {
			const input = divItem.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.todo = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				getList();

			});
		});

        delButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			getList()
		});

    });
  
    countLbl.innerHTML = `${count} tasks remaining`;
    const delListBtn  = document.querySelector('#del-list-btn');
    delListBtn.addEventListener('click',(e)=>{
        localStorage.removeItem('todos',[]);
        getList();
            
    });
}
 

const delListBtn  = document.querySelector('#del-list-btn');
delListBtn.addEventListener('click',(e)=>{
    localStorage.setItem('todos',JSON.stringify([]));
    getList();
        
});

const clearCompleted  = document.querySelector('#clear-completed-btn');
clearCompleted.addEventListener('click',(e)=>{
    todos = todos.filter(t => !t.done);
    localStorage.setItem('todos', JSON.stringify(todos));
    getList();
});