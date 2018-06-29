document.addEventListener("DOMContentLoaded", function () {

    /*łapię button dodający zadanie*/
    var add = document.querySelector("#main-form-btn-add");

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

        console.log(taskObj);
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

        /*dodaję do buttona deleted event*/
        newTaskDBtnDeleted.addEventListener("click", function () {
            taskList.removeChild(newTaskLi);
            taskList.removeChild(newTaskLiDown);
            /*dodać removowe local storage*/
        });
    }

    readLocalStorage();


    console.log(localStorage.getItem('tasks'));

    /*nadaję event na button dodający zadanie*/
    add.addEventListener("click", function () {

        /*łapię wszystkie elementy*/
        var title = document.querySelector("#title");
        var date = document.querySelector("#date");
        var priority = document.querySelector("#priority");
        var description = document.querySelector("#description");

        /* walidacja danych */
        var errorMessage = document.querySelector(".error-message");
        var errorMessage2 = document.querySelector(".error-message2");
        var ul = document.createElement("ul");

        /*ustawiam flagę walidacji - do późniejszego wykorzystania*/
        var ok = true;

        // sprawdzenie tytulu (czy posiada więcej niż 1 i mniej niż 50 znaków)
        if (title.value.length === 0) {
            ok = false;
            var msg = document.createElement("li");
            msg.innerText = "Wprowadź tytuł";
            ul.appendChild(msg);
        }

        if (title.value.length >= 50) {
            ok = false;
            var msg = document.createElement("li");
            msg.innerText = "Tytuł jest za długi";
            ul.appendChild(msg);
        }

        // sprawdzenie daty
        if (date.value === "") {
            ok = false;
            var msg = document.createElement("li");
            msg.innerText = "Uzupełnij datę";
            ul.appendChild(msg);
        }

        // sprawdzenie priorytetu
        if (priority.value === "") {
            ok = false;
            var msg = document.createElement("li");
            msg.innerText = "Nadaj priorytet";
            ul.appendChild(msg);
        }

        // sprawdzenie opisu (do 100 znaków)
        if (description.value.length >= 100) {
            ok = false;
            var msg = document.createElement("li");
            msg.innerText = "Opis jest za długi";
            ul.appendChild(msg);
        }

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

        if (ok) {
            // console.log("Walidacja okej");
            errorMessage.innerHTML = "";
            errorMessage2.innerHTML = "";
            createElement(formObj);

            /*zeruję wartość inputu po dodaniu elementu*/
            title.value = "";
            date.value = "";
            priority.value = "";
            description.value = "";
        } else {
            errorMessage.innerHTML = "";
            errorMessage.appendChild(ul);

            var mobile = window.matchMedia("(max-width: 480px)");
            if (mobile.matches) {
                errorMessage2.innerHTML = "";
                errorMessage2.appendChild(ul);
            }
        }

        /*zeruję wartość inputu po dodaniu elementu*/
        title.value = "";
        date.value = "";
        priority.value = "";
        description.value = "";
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

    /*pojawia sie opis*/
    var x = document.querySelector(".main-tusks-list");
    var y = document.querySelector(".new-task-li-down");
    x.addEventListener("click", function () {
        if (y.style.display === "flex") {
            y.style.display = "none";
        } else {
            y.style.display = "flex";
        }
    });

    var arrowDate = document.querySelectorAll(".main-panel-change-direction")[0];
    var arrowPriority = document.querySelectorAll(".main-panel-change-direction")[1];
    var list = JSON.parse(localStorage.getItem('tasks'));

    console.log(arrowDate, arrowPriority, list);

    arrowDate.addEventListener("click", function () {
        var allLi = document.querySelectorAll(".new-task-li");
        var allLiDown = document.querySelectorAll(".new-task-li-down");
        var sorted = list.sort(compare);

        function compare(a, b) {
            if (a.date < b.date)
                return -1;
            if (a.date > b.date)
                return 1;
            return 0;
        }

        for (var i = 0; i < allLi.length; i++) {
            taskList.removeChild(allLi[i]);
            taskList.removeChild(allLiDown[i]);
        }

        for (var i = 0; i < list.length; i++) {
            createElement(sorted[i]);
        }
    });

    arrowPriority.addEventListener("click", function () {

        var allLi = document.querySelectorAll(".new-task-li");
        var allLiDown = document.querySelectorAll(".new-task-li-down");
        var sorted = list.sort(compare);

        function compare(a, b) {
            if (a.priority < b.priority)
                return -1;
            if (a.priority > b.priority)
                return 1;
            return 0;
        }

        for (var i = 0; i < allLi.length; i++) {
            taskList.removeChild(allLi[i]);
            taskList.removeChild(allLiDown[i]);
        }

        for (var i = 0; i < list.length; i++) {
            createElement(sorted[i]);
        }

    });

        button.addEventListener("click", function () {

            var buttonDel = document.querySelector('main-panel-bin');
            localStorage.clear();
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
              }

            });

});
