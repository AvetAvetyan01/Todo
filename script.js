
const todo = document.querySelector(".todo")

const todoInput = document.getElementById("todoInput")
const addButton = document.getElementById("addButton")

const taskList = document.getElementById("taskList")

const tasksCount = document.getElementById("tasksCount")
const cleareAllButton = document.getElementById("cleareAllButton")

let tasksLength = 0
tasksCount.innerText = `You have ${tasksLength} pending tasks`

function addingTask(){
    if (todoInput.value.length > 0){
        const task = document.createElement("li")
        const taskContent = document.createElement("div")
        const checkIcon = document.createElement("i")
        const taskText = document.createElement("p")
        const rightButtons = document.createElement("div")
        const changeButton = document.createElement("button")
        const changeIcon = document.createElement("i")
        const deleteButton = document.createElement("button")
        const deleteIcon = document.createElement("i")
        
        taskContent.append(checkIcon)
        taskContent.append(taskText)

        deleteButton.append(deleteIcon)
        changeButton.append(changeIcon)
        rightButtons.append(changeButton)
        rightButtons.append(deleteButton)

        task.append(taskContent)
        task.append(rightButtons)
        
        taskText.innerText = todoInput.value

        // taskContent classes
        taskContent.classList.add("taskContent")

        // check icon classes
        checkIcon.classList.add("fa-solid","checkIcon","fa-check")

        // rightButtons classes
        rightButtons.classList.add("rightButtons")

        // change icon classes
        changeButton.classList.add("changeButton")
        changeIcon.classList.add("fa-solid","fa-pen")

        // delete icon classes
        deleteIcon.classList.add("fa-solid","fa-trash")
        
        taskText.classList.add("taskText")
        deleteButton.classList.add("deleteButton")
        
        checkIcon.onclick = function(e){
            switch(e.target.className){
                case "fa-solid checkIcon fa-check":
                    taskText.style.textDecoration = "line-through"
                    e.target.style.color = "rgb(255, 0, 0)"
                    e.target.classList.remove("fa-check")
                    e.target.classList.add("fa-xmark")
                    break
                case "fa-solid checkIcon fa-xmark":
                    taskText.style.textDecoration = "none"
                    e.target.style.color = "rgb(0, 255, 0)"
                    e.target.classList.remove("fa-xmark")
                    e.target.classList.add("fa-check")
                    break
            }
        }

        deleteButton.onclick = function(){
            task.remove()
            tasksLength--
            tasksCount.innerText = `You have ${tasksLength} pending tasks`
        }

        changeButton.addEventListener("click",() => {
            if (changeIcon.classList.contains("fa-pen")){
                const changeInput = document.createElement("textarea")
                changeInput.classList.add("changeInput")
                changeInput.value = taskText.innerText

                checkIcon.after(changeInput)
                taskText.style.display = "none"

                changeIcon.classList.add("fa-rotate")
                changeIcon.classList.remove("fa-pen")
                changeInput.focus()
            }else{
                const task = taskText.closest("li")
                const changeInput = task.querySelector("textarea")
                
                taskText.innerText = changeInput.value
                taskText.style.display = "block"
                
                changeInput.remove()
                changeIcon.classList.add("fa-pen")
                changeIcon.classList.remove("fa-rotate")
            }
        })
        
        tasksLength++
        taskList.prepend(task)

        todoInput.value = ""
        tasksCount.innerText = `You have ${tasksLength} pending tasks`
    }
}

addButton.addEventListener("click",addingTask)
todoInput.onkeyup = e => e.key == "Enter" ? addingTask() : false

cleareAllButton.onclick = function(){
    const tasksNL = taskList.querySelectorAll("li")
    tasksNL.forEach(elm => elm.remove())
    tasksLength = 0
    tasksCount.innerText = `You have 0 pending tasks`
}
