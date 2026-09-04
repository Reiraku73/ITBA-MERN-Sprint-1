document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        localStorage.setItem('session', JSON.stringify({ email: validUser.email, name: validUser.name }));
        alert('Inicio de sesión exitoso.');
        window.location.href = 'cuenta.html';
    } else {
        alert('Correo o contraseña incorrectos.');
    }
});