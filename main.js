// Добавление новой задачи


// Нашли форму добавления задачи
var form = document.getElementById("addForm");

// Находим сам список
var itemsList = document.getElementById("items");
console.log('itemsList', itemsList)


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

    console.log('newElement', newElement);
   
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
            }
    }
}