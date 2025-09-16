const button = document.getElementById('btn-form');

button.addEventListener('click', async () => { 
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Hola mundo2');
    alert(`Hola mundo. Email: ${email}, Password: ${password}`);
});
