// Funcionalidad de inicio de sesión
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const username = document.getElementById("username").value
  const password = document.getElementById("password").value
  const remember = document.getElementById("remember").checked

  // Credenciales de demostración - En producción, esto validaría contra una base de datos
  const validUsers = {
    admin: "santafe",
    santafe: "santafe",
  }

  if (validUsers[username] && validUsers[username] === password) {
    // Almacenar sesión
    const sessionData = {
      username: username,
      loginTime: new Date().toISOString(),
      remember: remember,
    }

    if (remember) {
      localStorage.setItem("userSession", JSON.stringify(sessionData))
    } else {
      sessionStorage.setItem("userSession", JSON.stringify(sessionData))
    }

    showNotification("Inicio de sesión exitoso", "success")

    // Redirigir a la página principal
    setTimeout(() => {
      window.location.href = "index.html"
    }, 1000)
  } else {
    showNotification("Usuario o contraseña incorrectos", "error")
  }
})

function showNotification(message, type) {
  const notification = document.getElementById("notification")
  notification.textContent = message
  notification.className = `notification ${type} show`

  setTimeout(() => {
    notification.classList.remove("show")
  }, 3000)
}
