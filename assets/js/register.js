document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.some(user => user.email === email);
    if (userExists) {
        alert('El correo electrónico ya está registrado.');
        return;
    }

    users.push({ name, lastname, email, phone, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    window.location.href = 'login.html';
});