let inputTarefa = document.querySelector(".input-tarefa")
let addTarefa = document.querySelector(".add-tarefa")
let tarefas = document.querySelector(".tarefas")


function criaTarefa(textoInput){
    const li = document.createElement('li')
    li.innerHTML = textoInput;
    tarefas.appendChild(li)
    limpaInput();
    criaBotaoApagar(li)
    salvarTarefas()
}

addTarefa.addEventListener('click', function(){
    if(inputTarefa.value == '') return;
    criaTarefa(inputTarefa.value);
})

inputTarefa.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        if(inputTarefa.value == '') return;
        criaTarefa(inputTarefa.value);
    }
})

function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus()
}

function criaBotaoApagar(li){
    li.innerHTML += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerHTML = 'Apagar'
    botaoApagar.setAttribute('class', 'apagar')
    botaoApagar.setAttribute('title', 'Apagar tarefa')
    li.appendChild(botaoApagar)
}

document.addEventListener('click', function(e){
    const el = e.target

    if(el.classList.contains('apagar')){
        el.parentElement.remove()
    }
});

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li')
    const listaDeTarefas = []

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
        listaDeTarefas.push(tarefaTexto)
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
}

function adicionaTarefaSalvas(){
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)
    
    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa)
    }

}

adicionaTarefaSalvas()
