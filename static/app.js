//функция показа 1 экрана//
function showScreen(screenId){
    const screens = document.querySelectorAll('.screen')
    screens.forEach((screen) => {
        screen.classList.add('hidden')
    });
    const element = document.getElementById(screenId)
    element.classList.remove('hidden')}

showScreen('reg_screen')

//кнопка войти//
const butReg = document.querySelector('#but_reg')
butReg.addEventListener('click', function(){
    showScreen('dashboard_screen')
})

let exercArr = []
const inpExerc = document.querySelector('#add_ex')
const butExerc = document.querySelector('#but_add_ex')
const exercList = document.querySelector('#list_exerc')
fetchExercises_get()

async function fetchExercises_get(){
        const response = await fetch('./exercises',{
            method: 'GET'
        })
        const json_get = await response.json()
        render(json_get)
        }

//функция отображения списка упражнений
function render(json){
    exercList.innerHTML = ''
    json.forEach(function(item) {
        const li = document.createElement('li')
        li.textContent = item.name
        const delButton = document.createElement('button') 
        delButton.innerHTML = '<i class="fa-solid fa-trash"></i>'
        delButton.addEventListener('click', function(event) {
            exercArr = exercArr.filter((name) => name!= item)
        })
        li.append(delButton) 
        exercList.appendChild(li) 
    })
}

butExerc.addEventListener('click', async function() {
    let value = inpExerc.value
    if (value) {
        await fetch('./exercises', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: value})
        })
        inpExerc.value = ''
        await fetchExercises_get() 
    }
})

