const nome = document.getElementById('nome');
const senha = document.getElementById('senha');
const aviso = document.getElementById("aviso");

document.getElementById('loginClienteForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    aviso.textContent = "";

    fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
            'username': nome.value,
            'senha': senha.value,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((data) => {
        if (data.status == 200) {
            window.location.href = '/perfil'
        } else {
            aviso.textContent = "Usuário ou Senha incorretos.";
        }
    })
})