const nome = document.getElementById("name");
const email = document.getElementById("email");
const telefone = document.getElementById("phone");
const endereco = document.getElementById("endereco")
const oldpass = document.getElementById("old-password");
const senha = document.getElementById("new-password");
const sairButton = document.getElementById("sairbutton");
const formUpdate = document.getElementById("formupdate");
let clienteJSON
let cadastroJSON

fetch('/api/perfil').then((data) => {
    data.json().then((result) => {
        clienteJSON = result[1];
        cadastroJSON = result[0];
        PrepararSite(clienteJSON)
    });
});

sairButton.addEventListener('click', () => {
    fetch('/logout').then(() => {
        window.location.href = "/"
    })
})

function PrepararSite(dados) {
    nome.value = dados.Nome;
    email.value = dados.Email;
    telefone.value = dados.Telefone;
    endereco.value = dados.Endereco
}

formUpdate.addEventListener("submit", (e) => {
    e.preventDefault();
    let Fnome = (nome.value ?? cadastroJSON.Login)
    let Fendereco = ((endereco.value == null || endereco.value == '') ? clienteJSON.Endereco : endereco.value)
    let Ftelefone =(telefone.value == null || telefone.value == '') ? clienteJSON.Telefone : telefone.value;
    let Fsenha = ((senha.value == null || senha.value == '') ? cadastroJSON.Senha : senha.value)
    let Femail = (email.value ?? clienteJSON.Email)
    let IDCliente = (clienteJSON.IDCliente)
    let IDCadastro = (cadastroJSON.IDCadastro)

    fetch('/api/update', {
        method: 'POST',
        body: JSON.stringify({
            'nome': Fnome,
            'senha': Fsenha,
            'email': Femail,
            'telefone': Ftelefone,
            'endereco': Fendereco,
            'idcliente': IDCliente,
            'idcadastro': IDCadastro
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((data) => {
        if (data.status == 200) {
            setTimeout(() => {
                window.location.reload();
            }, 150);
        } else {
            aviso.textContent = "Usuário ou Senha incorretos.";
        }
    })
})