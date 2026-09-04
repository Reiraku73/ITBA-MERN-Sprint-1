document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const lastname = document.getElementById('lastname').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;

    if (!esEmailValido(email)) {
        alert('Ingresá un correo electrónico válido.');
        return;
    }

    if (!esTelefonoValido(phone)) {
        alert('Ingresá un teléfono válido, con entre 7 y 15 dígitos.');
        return;
    }

    if (!esPasswordValida(password)) {
        alert('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.');
        return;
    }

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