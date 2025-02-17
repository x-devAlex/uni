// Перемикання видимості для пароля
document.getElementById('togglePassword').addEventListener('click', function () {
    const password = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    
    if (password.type === "password") {
        password.type = "text";
        togglePasswordBtn.classList.add('active');
    } else {
        password.type = "password";
        togglePasswordBtn.classList.remove('active');
    }
});

// Перемикання видимості для поля "Повторіть пароль"
document.getElementById('togglePasswordConfirm').addEventListener('click', function () {
    const confirmPassword = document.getElementById('confirmPassword');
    const togglePasswordConfirmBtn = document.getElementById('togglePasswordConfirm');
    
    if (confirmPassword.type === "password") {
        confirmPassword.type = "text";
        togglePasswordConfirmBtn.classList.add('active');
    } else {
        confirmPassword.type = "password";
        togglePasswordConfirmBtn.classList.remove('active');
    }
});

