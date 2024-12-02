const nome = document.getElementById("name");
const email = document.getElementById("email");
const telefone = document.getElementById("phone");
const endereco = document.getElementById("endereco")
const oldpass = document.getElementById("old-password");
const senha = document.getElementById("new-password");
const sairButton = document.getElementById("sairbutton");
const formUpdate = document.getElementById("formupdate");
let usuario
let cadastro

fetch('/perfil/get').then((data) => {
    data.json().then((result) => {
        usuario = result[1];
        cadastro = result[0];
        PrepararSite(result[1])
    });
});

sairButton.addEventListener('click', () => {
    fetch('/logout').then(() => {
        window.location.href = "/"
    })
})

function PrepararSite(dados) {
    console.log(dados);
    nome.value = dados.Nome;
    email.value = dados.Email;
    telefone.value = dados.Telefone;
    endereco.value = dados.Endereco
}

formUpdate.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(usuario);
    console.log(cadastro);
    //nome, email, telefone, endereco, senha, idcliente, idcadastro
    
    let Fnome = (nome.value ?? cadastro.Login)
    let Fendereco = ((endereco.value == null || endereco.value == '') ? usuario.Endereco : endereco.value)
    let Ftelefone =(telefone.value == null || telefone.value == '') ? usuario.Telefone : telefone.value;
    let Fsenha = ((senha.value == null || senha.value == '') ? cadastro.Senha : senha.value)
    let Femail = (email.value ?? usuario.Email)
    let IDCliente = (usuario.IDCliente)
    let IDCadastro = (cadastro.IDCadastro)

    fetch('/updateCliente', {
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
            window.location.href = '/perfil'
        } else {
            aviso.textContent = "Usuário ou Senha incorretos.";
        }
    })
})