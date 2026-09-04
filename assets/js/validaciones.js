function esEmailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
}

function esTelefonoValido(phone) {
    if (phone === '') {
        return true;
    }

    const digits = phone.replace(/\D/g, '');
    return /^[+]?[-\s\d()]+$/.test(phone) && digits.length >= 7 && digits.length <= 15;
}

function esPasswordValida(password) {
    return password.length >= 8
        && /[a-z]/.test(password)
        && /[A-Z]/.test(password)
        && /\d/.test(password)
        && /[^A-Za-z\d\s]/.test(password);
}
