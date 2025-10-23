<template>
    <body class="login-page">
    <div class="login-container">
        <div class="login-header">
            <h1>Sistema de Administración de Mandatarios de la Provincia de Santa Fe</h1>
            <p class="login-description">
                Para utilizar el sistema debe ingresar el usuario y la clave que le fue provista para tal fin. 
                No compartas esta información con ninguna persona que no sea la autorizada para ingresar al sistema.
            </p>
        </div>

        <div class="login-card">
            <div class="login-card-header">
                <svg class="lock-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <h2>Identifícate para utilizar el sistema</h2>
            </div>

            <form id="loginForm" class="login-form">
                <div class="form-group">
                    <label for="username">Usuario</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        required
                        autocomplete="username"
                    >
                </div>

                <div class="form-group">
                    <label for="password">Clave</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required
                        autocomplete="current-password"
                    >
                </div>

                <div class="form-checkbox">
                    <input type="checkbox" id="remember" name="remember">
                    <label for="remember">Recordarme</label>
                </div>

                <button type="submit" class="btn btn-primary btn-block">Ingresar</button>

                <div class="login-help">
                    <p>Ingresa tu usuario y clave y luego presiona el botón <strong>Ingresar</strong></p>
                    <ul>
                        <li>Tené en cuenta que tanto el usuario y la clave son <strong>sensitivas a mayúsculas y minúsculas</strong></li>
                        <li>Recordá <strong>cerrar la sesión</strong> cuando termines de utilizar el sistema</li>
                    </ul>
                </div>
            </form>
        </div>
    </div>

    <div id="notification" class="notification"></div>

    <script src="login.js"></script>
</body>
</template>

<script setup>
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

</script>



<style scoped>
</style>