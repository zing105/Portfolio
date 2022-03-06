import { createStore } from "redux"

const form = document.querySelector("form")
const input = document.querySelector("input")
const ul = document.querySelector("ul")

const ADD_TODO = "ADD_TODO"
const DELETE_TODO = "DELETE_TODO"

const addToDo = toValue =>{
        return{
//action 에 보내지는 정보 모아두는곳
            type:ADD_TODO,
            text:toValue,
            id:Date.now()

        }
}

const deleteToDo = id =>{
    return{
        type: DELETE_TODO, id:id
    }
}

const reducer = (state=[], action) =>{

    switch(action.type){
        case ADD_TODO:
            return ( [ {text: action.text, id:action.id}, ...state] )
        case DELETE_TODO:
            return (state.filter(dkanrjsk => dkanrjsk.id !== action.id))
            
        default:
            return state
        
    }
    
}

const store = createStore(reducer)

store.subscribe(()=> console.log(store.getState()))


const dispatchAddToDo = (eValue) =>{
    store.dispatch(addToDo(eValue))
}
const dispatchDeleteToDo = (e) => { // parentNode 부모 노드를가져옴 li
    const id = parseInt(e.target.parentNode.id)
    store.dispatch(deleteToDo(id))
}



const paintToDo = () =>{
    const toDos = store.getState();
    ul.innerHTML = "";

    toDos.forEach(toDo =>{
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.innerText = "DEL";
        btn.type = "button";
        btn.addEventListener("click", dispatchDeleteToDo)

        li.id = toDo.id
        li.innerText = toDo.text
        li.appendChild(btn);
        ul.appendChild(li);
    })
}

store.subscribe(paintToDo)




const onSubmit = e =>{
    e.preventDefault();
    if(input.value === ""){
        return(
            alert("공백금지")
        )
    }

    const toDo = input.value;
    
    input.value = "";

   dispatchAddToDo(toDo)
};

form.addEventListener("submit", onSubmit)