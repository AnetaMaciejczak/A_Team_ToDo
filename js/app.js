document.addEventListener("DOMContentLoaded", function () {

    /*łapię button dodający zadanie*/
    var add = document.querySelector("#main-form-btn-add");

    /*dodać pętle po obiekcie local storage i wyświelać całą zawartość*/


    /*nadaję event na button dodający zadanie*/

        var tasks = [];
        var counter = 1;


        /*łapię listę do której będziemy dodawać li*/
        var taskList = document.querySelector(".main-tusks-list");

        function readLocalStorage() {
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            // console.log(tasks);
            if (!tasks) {
                tasks = [];
            }
            for (var i = 0; i < tasks.length; i++) {
                createElement(tasks[i]);
            }

        }

        function createElement(taskObj) {

            console.log(taskObj)
            /*tworzę nowe li i poszczególne elementy*/
            /*obiekt li*/
            var newTaskLi = document.createElement("li");
            var newTaskLiDown = document.createElement("li");
            var newTaskBtnComplete = document.createElement("input");
            newTaskBtnComplete.setAttribute("type", "checkbox");
            var newTaskTitle = document.createElement("span");
            var newTaskDate = document.createElement("span");
            var newTaskPriority = document.createElement("span");
            var newTaskDescription = document.createElement("p");
            var newTaskDBtnDeleted = document.createElement("span");

            /*dodaję nowym elementom klasy, aby można je było łatwo stylować*/

            newTaskLi.classList.add("new-task-li");
            newTaskLiDown.classList.add("new-task-li-down");
            newTaskBtnComplete.classList.add("new-task-btn-completed");
            newTaskTitle.classList.add("new-task-title");
            newTaskDate.classList.add("new-task-date");
            newTaskPriority.classList.add("new-task-priority");
            newTaskDescription.classList.add("new-task-description");
            newTaskDBtnDeleted.classList.add("new-task-btn-deleted");

            /*dodaję teksty wewnętrzne do poszczególnych elentów*/
            newTaskTitle.innerText = taskObj.title;
            newTaskDate.innerText = taskObj.date;
            newTaskPriority.innerText = taskObj.priority;
            newTaskDescription.innerText = taskObj.description;
            newTaskDBtnDeleted.innerText = "";

            newTaskLi.appendChild(newTaskBtnComplete);
            newTaskLi.appendChild(newTaskTitle);
            newTaskLi.appendChild(newTaskDate);
            newTaskLi.appendChild(newTaskPriority);
            // newTaskLi.appendChild(newTaskDescription);
            newTaskLi.appendChild(newTaskDBtnDeleted);

            newTaskLiDown.appendChild(newTaskDescription);

            /*dodaję nowe li do listy zadań*/
            taskList.appendChild(newTaskLi);
            console.log(newTaskLi);

            taskList.appendChild(newTaskLiDown);

            // var counter = 1;
            // localStorage(counter, newTaskLi);
            // counter+=;
            /*dodać do local storage*/

            /*dodaję do buttona deleted event*/
            newTaskDBtnDeleted.addEventListener("click", function () {
                taskList.removeChild(newTaskLi);
                taskList.removeChild(newTaskLiDown);
                /*dodać removowe local storage*/
            });


        }

        readLocalStorage();


        /*nadaję event na button dodający zadanie*/
        add.addEventListener("click", function () {

            /*ustawiam flagę walidacji - do późniejszego wykorzystania*/
            var ok = true;

            /*łapię wszystkie elementy*/
            var title = document.querySelector("#title");
            var date = document.querySelector("#date");
            var priority = document.querySelector("#priority");
            var description = document.querySelector("#description");

            /* ---------------- LocalStorage -------------------- */


            function Todo(name) {
                this.counter = counter;
                this.title = title.value;
                this.date = date.value;
                this.priority = priority.value;
                this.description = description.value;
                this.completed = false;
            }

            // Add NewTodo

            function addNewTodoWithName(name) {
                var t = new Todo(name);
                tasks.push(t);
                counter++;
                saveTasks();
            }

            // Get Todo

            addNewTodoWithName(name);

            // save data to local storage

            function saveTasks() {
                var str = JSON.stringify(tasks);
                localStorage.setItem("tasks", str);
            }

            saveTasks();


            var formObj = {
                title: title.value,
                date: date.value,
                priority: priority.value,
                description: description.value,

            };

            createElement(formObj);

            /*zeruję wartość inputu po dodaniu elementu*/
            title.value = "";
            date.value = "";
            priority.value = "";
            description.value = "";
            mainForm.style.display = "none";

        });


        /* ---- ukrywanie i chowanie elementu main-form ----- */

        /*łapię formularz*/
        var mainForm = document.querySelector(".main-form");

        /*łapię przycisk +Add po wcześniejszym dodaniu mu ID mainAdd*/
        var mainAdd = document.getElementById("mainAdd");

        /*dodaję event, który chowa i wyświetla formularz*/

    mainAdd.addEventListener("click", function () {
        if (mainForm.style.display === "flex") {
            mainForm.style.display = "none";
        } else {
            mainForm.style.display = "flex";
        }

    });


});
