document.addEventListener("DOMContentLoaded", function () {

    /*łapię button dodający zadanie*/
    var add = document.querySelector("#main-form-btn-add");

    /*nadaję event na button dodający zadanie*/
    add.addEventListener("click", function () {

        /*ustawiam flagę walidacji - do późniejszego wykorzystania*/
        var ok = true;

        /*łapię wszystkie elementy*/
        var title = document.querySelector("#title");
        var date = document.querySelector("#date");
        var priority = document.querySelector("#priority");
        var description = document.querySelector("#description");

        /*łapię listę do której będziemy dodawać li*/
        var taskList = document.querySelector(".main-tusks-list");

        /*tworzę nowe li i poszczególne elementy*/
        var newTaskLi = document.createElement("li");
        var newTaskBtnComplete = document.createElement("input");
        newTaskBtnComplete.setAttribute("type", "checkbox");
        var newTaskTitle = document.createElement("span");
        var newTaskDate = document.createElement("span");
        var newTaskPriority = document.createElement("span");
        var newTaskDescription = document.createElement("p");
        var newTaskDBtnDeleted = document.createElement("button");

        /*dodaję nowym elementom klasy, aby można je było łatwo stylować*/

        newTaskLi.classList.add("new-task-li");
        newTaskBtnComplete.classList.add("new-task-btn-completed");
        newTaskTitle.classList.add("new-task-title");
        newTaskDate.classList.add("new-task-date");
        newTaskPriority.classList.add("new-task-priority");
        newTaskDescription.classList.add("new-task-description");
        newTaskDBtnDeleted.classList.add("new-task-btn-deleted");


        /*dodaję teksty wewnętrzne do poszczególnych elentów*/
        newTaskTitle.innerText = title.value;
        newTaskDate.innerText = date.value;
        newTaskPriority.innerText = priority.value;
        newTaskDescription.innerText = description.value;
        newTaskDBtnDeleted.innerText = "deleted";

        /*dodaję wszystkie elementy do nowego li*/
        newTaskLi.appendChild(newTaskBtnComplete);
        newTaskLi.appendChild(newTaskTitle);
        newTaskLi.appendChild(newTaskDate);
        newTaskLi.appendChild(newTaskPriority);
        newTaskLi.appendChild(newTaskDBtnDeleted);
        newTaskLi.appendChild(newTaskDescription);

        /*dodaję nowe li do listy zadań*/
        taskList.appendChild(newTaskLi);

        /*dodaję do buttona deleted event*/
        newTaskDBtnDeleted.addEventListener("click", function () {
            taskList.removeChild(newTaskLi);
        }),


        /*zeruję wartość inputu po dodaniu elementu*/
        title.value = "";
        date.value ="";
        priority.value = "";
        description.value = "";

    });


});
