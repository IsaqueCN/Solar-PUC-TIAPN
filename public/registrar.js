const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confirmaSenha = document.getElementById('confirmaSenha');
const senhaAviso = document.getElementById("senhaAviso");
const nomeAviso = document.getElementById("nomeAviso");
const confirmaSenhaAviso = document.getElementById("confirmaSenhaAviso");

//verificar se já existe
// caso não criar com INSERT no cliente e no cadastro

document.getElementById('registerForm')?.addEventListener('submit', async function (event) {
  event.preventDefault();

  senhaAviso.textContent = "";
  confirmaSenhaAviso.textContent = "";
  nomeAviso.textContent = "";
  let jaExiste = await (await (fetch(`/perfil/${nome.value}`))).json();

  if (nome.Length > 50)
    nomeAviso.textContent = "Nome de usuário muito grande";
  else if (nome.Length < 5)
    nomeAviso.textContent = "Nome de usuário muito pequeno";
  else if (!jaExiste.error)
    nomeAviso.textContent = "Nome de usuário já existe"
  else if (senha.value.length < 8) {
    senhaAviso.textContent = "A senha deve ter no mínimo 8 caracteres";
  } else if (senha.value != confirmaSenha.value) {
    confirmaSenhaAviso.textContent = "As senhas não são iguais"
  } else if (jaExiste.error) {
    await registrar();
  }
})

async function registrar() {
  let data = await fetch('/registrar', {
    method: 'POST',
    body: JSON.stringify({
      'nome': nome.value,
      'senha': senha.value,
      'email': email.value
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (data.status == 200) {
    window.location.href = '/login'
  }
}