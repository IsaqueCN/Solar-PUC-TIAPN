const sairButton = document.getElementById("logout");

sairButton.addEventListener('click', () => {
    fetch('/logout').then(() => {
        window.location.href = "/"
    })
})