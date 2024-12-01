// Registro de usuário
document.getElementById('registerForm')?.addEventListener('submit', function (event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const confirmaSenha = document.getElementById('confirmaSenha').value;
  const isEmpresa = document.getElementById('empresaButton').classList.contains('selected');

  // Validação de senha
  if (senha !== confirmaSenha) {
    alert("As senhas não coincidem. Por favor, tente novamente.");
    return;
  }

  // Simulação de sucesso no registro
  if (isEmpresa) {
    alert(`Conta de empresa criada com sucesso!\nBem-vindo(a), ${nome}!`);
    window.location.href = "dashboard_empresa.html"; // Redireciona para o painel da empresa
  } else {
    alert(`Conta de cliente criada com sucesso!\nBem-vindo(a), ${nome}!`);
    window.location.href = "dashboard_cliente.html"; // Redireciona para o painel do cliente
  }
});

// Seleção do tipo de registro (cliente ou empresa)
document.getElementById('empresaButton')?.addEventListener('click', function () {
  const button = document.getElementById('empresaButton');
  button.classList.toggle('selected');
  if (button.classList.contains('selected')) {
    button.textContent = "Registrar como Empresa";
  } else {
    button.textContent = "Sou Empresa";
  }
});
function alterarTipo() {
  const isEmpresa = document.getElementById('empresaCheck').checked;
  const tipoCliente = document.getElementById('tipo-cliente');
  const tipoEmpresa = document.getElementById('tipo-empresa');

  if (isEmpresa) {
    tipoCliente.style.display = 'none';
    tipoEmpresa.style.display = 'block';
  } else {
    tipoCliente.style.display = 'block';
    tipoEmpresa.style.display = 'none';
  }
}
