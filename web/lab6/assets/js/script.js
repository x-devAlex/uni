// 1. Дата / час
function updateClock() {
    const clockEl = document.getElementById('clock');
    const now = new Date();

    const days = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];
    const months = ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"];

    const dayName = days[now.getDay()];
    const year = now.getFullYear();
    const day = String(now.getDate()).padStart(2, '0');
    const month = months[now.getMonth()];

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedHours = String(hours).padStart(2, '0');

    const formattedTime = `${formattedHours}-${minutes}-${seconds} ${ampm}`;
    const formattedDate = `${dayName} ${year} рік, ${day} ${month}`;

    const targetDate = new Date('2025-06-13');
    const diffTime = targetDate - now;
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    clockEl.innerHTML = `${formattedDate}, ${formattedTime}<br>Старт продажів 13.06.2025. Днів до початку: ${daysLeft}`;
}

setInterval(updateClock, 1000);
updateClock();

// 2. Alert
function showMenu() {
    let message = "Таблиця чисел (від 5 до 15) та їхні степені:\n";
    for (let i = 5; i <= 15; i++) {
        const secondPower = i ** 2;
        const thirdPower = i ** 3;
        message += `Число: ${i} | Квадрат: ${secondPower} | Куб: ${thirdPower}\n`;
    }
    alert(message);
}

document.getElementById('showMenuBtn').addEventListener('click', showMenu);

// 3. Форма 
document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const country = document.getElementById('country').value.trim();
    const postalCode = document.getElementById('postalCode').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();

    // RegExp
    const namePattern = /^[A-Za-zА-Яа-яІіЇїЄє']{3,}$/; // мін 3 літери
    const noDoubleCharsPattern = /^(?!.*(.)\1).*$/; // без однакових символів підряд
    const postalCodePattern = /^\d{5}$/; // 5 цифр
    const phonePattern = /^\+38\(\d{3}\)\d{3}-\d{2}-\d{2}$/; // +38(XXX)XXX-XX-XX
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // email
    const addressPattern = /^вул\.\s[А-Яа-яІіЇїЄєA-Za-z\s'-]+,\s\d+$/; // вул. Вул, №
    
    // перевірки

    if (!namePattern.test(firstName) || !noDoubleCharsPattern.test(firstName)) {
        showOrderMessage("Ім'я повинно містити лише літери, мінімум 3 символи, без однакових символів підряд.", "danger");
        return;
    }

    if (!namePattern.test(lastName) || !noDoubleCharsPattern.test(lastName)) {
        showOrderMessage("Прізвище повинно містити лише літери, мінімум 3 символи, без однакових символів підряд.", "danger");
        return;
    }

    if (!addressPattern.test(address)) {
        showOrderMessage("Адреса повинна містити текст і номер будинку, наприклад: вул. Димитрова 32.", "danger");
        return;
    }

    if (!postalCodePattern.test(postalCode)) {
        showOrderMessage("Поштовий індекс повинен складатися з 5 цифр.", "danger");
        return;
    }

    if (!phonePattern.test(phone)) {
        showOrderMessage("Телефон повинен бути у форматі: +38(XXX)XXX-XX-XX.", "danger");
        return;
    }

    if (!emailPattern.test(email)) {
        showOrderMessage("Введіть коректний e-mail.", "danger");
        return;
    }

    showOrderMessage("Замовлення успішно оформлено!", "success");
    document.getElementById('orderForm').reset();
});

// повідомлення
function showOrderMessage(message, type) {
    const orderMessage = document.getElementById('orderMessage');
    orderMessage.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
}
