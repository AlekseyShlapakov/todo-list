// Добавление новой задачи


// Нашли форму добавления задачи
var form = document.getElementById("addForm");

// Находим сам список
var itemsList = document.getElementById("items");


// Находим строку поиска
var filter = document.getElementById("filter");


// Объявляем массив с данными и записываем его в переменную
var data = [];

// Вызов ф-и localStorage - получаем данные, если они есть
setData();

// Проходимся по массиву и для каждого элемента добавляем ф-ю вывода пункта задачи
data.forEach(item=>renderItem(item));

// Начинаем прослушивать форму по сабмиту
form.addEventListener("submit", addItem)

// Функция для добавления нового элемента
function addItem(e){
    // Отменяем стандартное поведение
    e.preventDefault();

    // Находим текст в поле ввода
    var newItemInput = document.querySelector("#newItemText");

    // Находим значение вэлью, кот. соотв. его тексту
    var newItemText = newItemInput.value;

    // Создаем виртуальный элемент li, кот. будет добавляться в список
    var newElement = document.createElement("li")

    // Задаем ему класс
    newElement.className = "list-group-item";

    // Добавим текст в этот элемент
    var newTextNode = document.createTextNode(newItemText);
    
    // Метод appendChild вызывается у элемента и в него добавляет дочерний элемент
    newElement.appendChild(newTextNode);

    // Создаем кнопку
    var delBtn = document.createElement("button");

    // Добавляем текст в кнопку
    var btnTextNode = document.createTextNode("Удалить");

    delBtn.appendChild(btnTextNode);

    // Добавляем класс в кнопку
    delBtn.className = "btn btn-light btn-sm float-right";

    // Добавляем Дата атрибут
    delBtn.dataset.action = "delete"

    // Помещаем кнопку внутрь тэга li
    newElement.appendChild(delBtn);

    // Добавляем ранее созданную строку в список UL
    itemsList.prepend(newElement);

    // Очистим поле добавления новой задачи
    newItemInput.value = "";

    // Записываем в массив data тексты задач
    data.push(newItemText);
    
    // Добавляем массив в LocalStorage
    localStorage.setItem("data", JSON.stringify(data))
   
}

// Удаление элемента - прослушка клика
itemsList.addEventListener("click", deleteItem);

// Функция для удаления элемента списка
function deleteItem(e){
    // Проверяем куда мы кликнули
    if( e.target.hasAttribute("data-action") && 
    e.target.getAttribute("data-action") == "delete"){
            // Спрашиваем точно ли удалить задачу
            if( confirm("Удалить задачу?") ){
                // Удаляем. Обращаемся к родителю (parentNode) и удаляем remove
                e.target.parentNode.remove();

                // Находим текстовое значение первой ноды в li
                var textNode = e.target.parentNode.firstChild.textContent;

                //Ищем индекс элемента с этим значением
                var arrIndex = data.indexOf(textNode);

                // Удаляем элемент с этим индексом из массива
                data.splice(arrIndex, 1);

                // Перезаписываем массив в локалсторэдж
                localStorage.setItem("data", JSON.stringify(data));
            }
    }
}

// Реализуем поиск по списку

// Прослушиваем событие нажатия на клавиши и запись в вэлью (keyup)
filter.addEventListener("keyup", filterItems)

// Функция поиска
function filterItems(e){

    // Находим текст (вэлью) строки поиска
    // toLowerCase - приводим к нижнему регистру
    var searchText = e.target.value.toLowerCase();

    // Получаем список всех задач
    var items = itemsList.querySelectorAll("li");
    
    // Перебираем циклом forEach все теги li с задачами
    items.forEach(function(item){

        // Находим текстовое значение (первый элемент)
        var textContent = item.firstChild.textContent.toLowerCase();
        
        // Проверяем на вхождение искомой подстроки в текст задачи

        if( textContent.indexOf( searchText ) != -1 ){
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    })


}

// Функция - Записываем данные в localStorage
function setData(){
    // Возвращаем значение записи из localStorage со значанием data
    var jsonData = localStorage.getItem("data");

    // Делаем проверку: если есть "jsonData", то преобразуем их и записываем в переменную data
    if( jsonData ){
        data = JSON.parse(jsonData);
    }
}

function renderItem(textContent){
    // Создаем виртуальный элемент li, кот. будет добавляться в список
    var newElement = document.createElement("li")

    // Задаем ему класс
    newElement.className = "list-group-item";

    // Добавим текст в этот элемент
    var newTextNode = document.createTextNode(textContent);
    
    // Метод appendChild вызывается у элемента и в него добавляет дочерний элемент
    newElement.appendChild(newTextNode);

    // Создаем кнопку
    var delBtn = document.createElement("button");

    // Добавляем текст в кнопку
    var btnTextNode = document.createTextNode("Удалить");

    delBtn.appendChild(btnTextNode);

    // Добавляем класс в кнопку
    delBtn.className = "btn btn-light btn-sm float-right";

    // Добавляем Дата атрибут
    delBtn.dataset.action = "delete"

    // Помещаем кнопку внутрь тэга li
    newElement.appendChild(delBtn);

    // Добавляем ранее созданную строку в список UL
    itemsList.prepend(newElement);
}
