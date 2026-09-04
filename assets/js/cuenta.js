const session = JSON.parse(localStorage.getItem('session'));
const users = JSON.parse(localStorage.getItem('users')) || [];
const currentUser = session && users.find(user => user.email === session.email);

if (!currentUser) {
    window.location.href = 'login.html';
} else {
    const accountForm = document.getElementById('cuenta-form');
    const editButton = document.getElementById('editar-cuenta');
    const cancelButton = document.getElementById('cancelar-edicion');
    const actions = document.getElementById('cuenta-acciones');
    const passwordSection = document.getElementById('cuenta-password');
    const fields = {
        name: document.getElementById('cuenta-nombre'),
        lastname: document.getElementById('cuenta-apellido'),
        email: document.getElementById('cuenta-email'),
        phone: document.getElementById('cuenta-telefono'),
        currentPassword: document.getElementById('cuenta-password-actual'),
        newPassword: document.getElementById('cuenta-password-nueva'),
        repeatedPassword: document.getElementById('cuenta-password-repetida')
    };

    const showUserData = () => {
        fields.name.value = currentUser.name || '';
        fields.lastname.value = currentUser.lastname || '';
        fields.email.value = currentUser.email || '';
        fields.phone.value = currentUser.phone || '';
        fields.currentPassword.value = '';
        fields.newPassword.value = '';
        fields.repeatedPassword.value = '';
    };

    const setEditing = (isEditing) => {
        Object.values(fields).forEach(field => {
            field.readOnly = !isEditing;
        });
        fields.email.readOnly = true;
        fields.email.disabled = true;
        actions.hidden = !isEditing;
        passwordSection.hidden = !isEditing;
        editButton.hidden = isEditing;
    };

    editButton.addEventListener('click', () => setEditing(true));

    cancelButton.addEventListener('click', () => {
        showUserData();
        setEditing(false);
    });

    accountForm.addEventListener('submit', (event) => {
        event.preventDefault();

        currentUser.name = fields.name.value.trim();
        currentUser.lastname = fields.lastname.value.trim();
        currentUser.phone = fields.phone.value.trim();

        const passwordValues = [
            fields.currentPassword.value,
            fields.newPassword.value,
            fields.repeatedPassword.value
        ];
        const changingPassword = passwordValues.some(value => value !== '');

        if (changingPassword && passwordValues.some(value => value === '')) {
            alert('Completá la contraseña actual y los dos campos de la nueva contraseña.');
            return;
        }

        if (changingPassword && fields.currentPassword.value !== currentUser.password) {
            alert('La contraseña actual es incorrecta.');
            return;
        }

        if (changingPassword && fields.newPassword.value !== fields.repeatedPassword.value) {
            alert('Las nuevas contraseñas no coinciden.');
            return;
        }

        if (changingPassword) {
            currentUser.password = fields.newPassword.value;
        }

        const userIndex = users.findIndex(user => user.email === currentUser.email);
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('session', JSON.stringify({
            email: currentUser.email,
            name: currentUser.name
        }));

        showUserData();
        setEditing(false);
        alert('Los datos se actualizaron correctamente.');
    });

    showUserData();
}