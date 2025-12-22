document.addEventListener('DOMContentLoaded', () => {
    let reg = prompt('Желаете пройти регистрацию?');

    if (reg.toLocaleLowerCase() == 'да'){
        alert("Круто!");
    }
    else {
        alert('Попробуй еще раз');
    }


    let result = prompt('Введите пароль');

    if (result == null || result == ''){
        alert('Отменено')
    }
    else if (result.toLocaleLowerCase() == 'админ'){
        alert('Здравствуйте!')
    }
    else {
        alert('Я вас не знаю')
    }
});

// --- Ссылки на элементы ---
const colorButton = document.getElementById("butt");
const trailButton = document.getElementById("trailToggle");

// --- 1. Логика смены цвета (для colorButton) ---
function changeColor(){
    colorButton.classList.toggle("active"); 
}
colorButton.addEventListener('click', changeColor);


// --- 2. Логика следования за курсором (для trailButton) ---

let isTrailActive = false;

function createTrailElement(e) {
    const trail = document.createElement('div');
    trail.classList.add('trail-element');

    // Позиционирование
    trail.style.left = `${e.pageX - 5}px`;
    trail.style.top = `${e.pageY - 5}px`;

    document.body.appendChild(trail);

    // Удаление из DOM
    setTimeout(() => {
        trail.remove();
    }, 550); 
}

function toggleTrail() {
    isTrailActive = !isTrailActive;

    if (isTrailActive) {
        // Активация: добавляем слушатель
        document.addEventListener('mousemove', createTrailElement);
        trailButton.textContent = "Выключить след";
        trailButton.classList.add('active-trail-button');
    } else {
        // Деактивация: удаляем слушатель
        document.removeEventListener('mousemove', createTrailElement);
        trailButton.textContent = "Включить след";
        trailButton.classList.remove('active-trail-button');
    }
}

// Привязываем функцию-переключатель к новой кнопке
trailButton.addEventListener('click', toggleTrail);



function Accumulator(name, price){
    this.value = 0;
    this.price = price; 
    this.name = name; 

    this.read = function () {
        let input = parseInt(prompt('Введите количество товара'))
        if (input > 0){
            this.value += parseInt(price) * input;
        }
        else{
            alert('не рофли');
        }
    }

}

let tovars = [];

// Кэшируем DOM-элементы один раз
const listContainer = document.querySelector('.listbg');
const sumElement = document.querySelector('.sum');

function renderCart() {
    // Очищаем список
    listContainer.innerHTML = '';

    // Считаем общую сумму
    let total = 0;

    // Добавляем каждый товар в список
    tovars.forEach(item => {
        total += item.value;

        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.name}: ${item.value} ₽, Количество: ${item.value /item.price }`;
        itemElement.classList.add('cart-item');
        listContainer.appendChild(itemElement);
    });

    // Обновляем сумму
    sumElement.textContent = `Общая сумма: ${total} ₽`;
}

function createTovar(name, price){
    tovar = tovars.find(item => item.name === name);
    if (tovar){
        tovar.read();
    }
    else{
        let current = new Accumulator(name, price);
        current.read(); 
        tovars.push(current);
    }
    renderCart();
}



const cartContainer = document.querySelector('.cart'); 

// Один слушатель на родителе
cartContainer.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('add')) {

        const productDiv = target.closest('.product');
        
        const name = productDiv.dataset.name;
        
        const price = parseInt(productDiv.dataset.price);
        if (name != NaN || price > 0){
            createTovar(name, price);
        }
        console.log(tovars);
    }
});

const caphaText = document.querySelector('.solve');

const CAPTCHA_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const CAPTCHA_LENGTH = 5;


function generateMathCaptcha() {
    const a = Math.floor(Math.random() * 50);
        const b = Math.floor(Math.random() * 50);
        currentAnswer = String(a + b);
        caphaText.textContent = `${a} + ${b}`;
        mode = 'math';
}

function generateTextCaptcha() {
        let text = '';
        for (let i = 0; i < CAPTCHA_LENGTH; i++) {
            text += CAPTCHA_CHARS.charAt(
                Math.floor(Math.random() * CAPTCHA_CHARS.length)
            );
        }
        currentAnswer = text;
        caphaText.textContent = text;
        mode = 'text';
    }

var sumbit = document.getElementById('submit')
let pass = document.getElementById('pass');

generateMathCaptcha();
function check() {
        const userAnswer = pass.value.trim();

        if (userAnswer === currentAnswer) {
            alert('успех');
              if (Math.random() < 0.5) {
                generateMathCaptcha();
            } else {
                generateTextCaptcha();
            }

            pass.value = '';
            pass.focus();
        }
         else {
            alert('неудача');
            
            // Случайно выбираем следующий тип капчи: 50% шанс на каждый
            if (Math.random() < 0.5) {
                generateMathCaptcha();
            } else {
                generateTextCaptcha();
            }

            pass.value = '';
            pass.focus();
        }
    }

sumbit.addEventListener('click', check);
