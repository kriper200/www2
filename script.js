document.addEventListener('DOMContentLoaded', () => {
//   function truncate(str, maxlength) {
//         if (str.length <= maxlength) return str;
//         return str.slice(0, maxlength - 1) + '…';
// }

// document.querySelectorAll('.description > p')
//         .forEach(el => {
//             el.textContent = truncate(el.textContent, 15);


  // let age = prompt('сколька тебе лет');
  // let result = confirm('hey');


  var audio = document.getElementById("audio");
  if (audio){
    var img = document.getElementById("playimg");
    


    // работа с громкостью
    //получение элементов для работы с громкостью по id
    var volumeLink = document.getElementById("volume");
    var volumeRange = document.getElementById("volume-range");
    var img2 = document.getElementById("volumeimg");

    function setVolume(){ // установка громкости
      audio.volume = volumeRange.value; // значение громкости равно значению ползунка
      // изменение изображения
      if (audio.volume == 0){
        img2.src = "images/volume-muted.png";
      }
      else if (audio.volume < 0.5){
        img2.src = "images/volume-low.png";
      }
      else {
        img2.src = "images/volume-max.png";
      }
    }

    function showVolume(){ // функция, которая показывает ползунок
      if (volumeRange.style.opacity == "0"){
        volumeRange.style.opacity = "1";
        volumeRange.style.pointerEvents = "auto";
      }
      else{
        volumeRange.style.opacity = "0";
        volumeRange.style.pointerEvents = "none";
      }
    }

    volumeLink.addEventListener('click', showVolume); // показать ползунок при нажатии на картинку
    volumeRange.addEventListener('input', setVolume); // присваивание значение ползунка значению громкости


    // Установка таймера
    var timer = document.getElementById("timer");
    var duration = 0;
    var current = 0;

    audio.addEventListener("loadedmetadata", function() {
    duration = audio.duration;       
    current = audio.currentTime;            
  });

    function getTime(){
      current = audio.currentTime;
      timer.textContent = Math.floor(current / 60) + ":" + String(Math.floor(current % 60)).padStart(2, '0') + " / " + 
      Math.floor(duration / 60) + ":" + String(Math.floor(duration%60)).padStart(2, '0');
    }

    audio.addEventListener("timeupdate", getTime);
    
    // Включить/Поставить на паузу
    var playLink = document.getElementById("play");
    function playAudio() {
      if (audio.paused) {
      audio.play();
      img.src = "images/pause.png";
    } 
    else {
      audio.pause();
      img.src = "images/play.png";
      }
    }
    playLink.addEventListener("click", playAudio);

    // работа с ползунком
    var seek = document.getElementById("seek"); // получение ползунка

    function getMaxValue(){
        seek.max = audio.duration; // установка максимального значения
    }

    function update(){
      seek.value = audio.currentTime; // обновление времени
    }

    function set(){
      audio.currentTime = seek.value; // установка значению времени аудио значение ползунка
    }

    audio.addEventListener("loadedmetadata", getMaxValue); // получение значения максимального времени
    audio.addEventListener("timeupdate", update); // срабатывания функции Update каждое обновление времени
    seek.addEventListener("input", set); // установка значения по ползунку
    }
  const steps = document.querySelectorAll('.stepOne, .stepTwo');

  if (steps.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // добавить active элементу
          entry.target.classList.add('active');
          // прекратить наблюдать за ним после активации
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Наблюдаем за каждым шагом по отдельности
  steps.forEach(step => {
    observer.observe(step);
  });
  });

document.addEventListener('DOMContentLoaded', () => {
  var selectedFont = document.getElementById("selected-font");  // получение элемента выбора шрифта
  const body = document.body;  // получение элемента body

  function switchFont() { // функция смены шрифта
    var font = selectedFont.value; // получение значение из элемента выбора шрифта
    body.className = ''; // удаление всех классов, чтобы не перегружать

    if (font === "Основной") { // выбран 1 шрифт из списка
      body.classList.add('basic-font'); // добавление к body класса с 1 шрифтом 
    } else if (font === "Обычный 1") { // выбран 2 шрифт из списка
      body.classList.add('other-font'); // добавление к body класса с 2 шрифтом
    } else if (font === "Обычный 2") { // выбран 3 шрифт из списка
      body.classList.add('other2-font'); // добавление к body класса с 3 шрифтом
    } else if (font === "Обычный 3") { // выбран 4 шрифт из списка
      body.classList.add('other3-font'); // добавление к body класса с 4 шрифтом
    }
    localStorage.setItem('selectedFont', font); // добавление в локальное хранилище выбранного шрифта
  }
  var savedFont = localStorage.getItem('selectedFont'); // получение сохранненого шрифта из локального хранилища
  if (savedFont) { // если в локальном хранилище существует сохраенный шрифт
    selectedFont.value = savedFont; // добавляем сохранненый шрифт в значение текущего выбранного шрифта
    switchFont();  // вызываем функцию для установки сохранненого шрифта
  }
  selectedFont.addEventListener('change', switchFont); // вызываем функцию смены шрифта когда выбрано другое значение из списка
});



var submit = document.getElementById('submit'); // получение кнопки "Записаться"
var phone = document.getElementById('telephone'); // получение поля ввода номера телефона

function deleteNumbers(){ // функция для удаления всех символов, кроме цифр
  this.value = this.value.replace(/\D/g, ''); // заменяем значение на цифры с помощью регулярного выражения
}

phone.addEventListener('input', deleteNumbers); // подключение функции deleteNumbers() к полю ввода номера телефона

function sendMessage(){ // функция отправки сообщения пользователю
    let name = document.getElementById('naming').value; // получение значения имени
    let date = document.getElementById('dating').value; // получение значения даты 
    let trainer = document.getElementById('training').value; // получение значения тренера
    let number = document.getElementById('telephone').value; // получение 

    if (name == '' || date == '' || trainer == 'Не выбран' || number == '' ){ // если есть пустые поля
      alert("Заполните все поля!"); // вывод сообщения пользователю
      return; // завершение функции
    }

    alert("Здравствуйте, " + name + "!\nВы записаны на " + date + "\nВаш тренер: " + trainer); // вывод информации пользователю 
  }

submit.addEventListener('click', sendMessage); // добавление функции отправки сообщения при нажатии на кнопку "Записаться"

