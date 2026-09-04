const registerForm = document.getElementById('register-form');
const registerFields = {
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    password: document.getElementById('password'),
    passwordConfirmation: document.getElementById('password-confirmation')
};

const registerErrors = {
    email: document.getElementById('email-error'),
    phone: document.getElementById('phone-error'),
    password: document.getElementById('password-error'),
    passwordConfirmation: document.getElementById('password-confirmation-error')
};

function validarCampoRegister(nombre) {
    const field = registerFields[nombre];
    let message = '';

    if (nombre === 'email' && field.value !== '' && !esEmailValido(field.value.trim())) {
        message = 'Ingresá un correo electrónico válido.';
    } else if (nombre === 'phone' && !esTelefonoValido(field.value.trim())) {
        message = 'Ingresá un teléfono válido, con entre 7 y 15 dígitos.';
    } else if (nombre === 'password' && field.value !== '' && !esPasswordValida(field.value)) {
        message = 'Usá al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.';
    } else if (nombre === 'passwordConfirmation'
        && field.value !== ''
        && field.value !== registerFields.password.value) {
        message = 'Las contraseñas no coinciden.';
    }

    registerErrors[nombre].textContent = message;
    field.classList.toggle('login-form__input--invalido', message !== '');
    return message === '';
}

Object.keys(registerFields).forEach(nombre => {
    registerFields[nombre].addEventListener('blur', () => validarCampoRegister(nombre));
    registerFields[nombre].addEventListener('input', () => validarCampoRegister(nombre));
    registerFields[nombre].addEventListener('invalid', () => validarCampoRegister(nombre));
});

registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!Object.keys(registerFields).every(validarCampoRegister)) {
        return;
    }
    
    const name = document.getElementById('name').value.trim();
    const lastname = document.getElementById('lastname').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.some(user => (user.email || '').toLowerCase() === email);
    if (userExists) {
        alert('El correo electrónico ya está registrado.');
        return;
    }

    users.push({ name, lastname, email, phone, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    window.location.href = 'login.html';
});