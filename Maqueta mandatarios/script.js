// Escuchar el evento DOMContentLoaded para inicializar funciones
document.addEventListener("DOMContentLoaded", () => {
  checkAuthentication()
  loadMandatarios()
  setupNavigation()
  setupSearch() 
  setupModal()
  setupPagination()
  setupUserMenu()
  setupImportBulk()
  setupImportPhotos()
  setupMobileMenu()
})

// Verificar la autenticación del usuario
function checkAuthentication() {
  const sessionData = sessionStorage.getItem("userSession") || localStorage.getItem("userSession")

  if (!sessionData) {
    window.location.href = "login.html"
    return
  }

  const session = JSON.parse(sessionData)
  document.getElementById("userNameDisplay").textContent = session.username
  document.getElementById("dropdownUserName").textContent = session.username
}

// Configurar el menú de usuario
function setupUserMenu() {
  const userMenuBtn = document.getElementById("userMenuBtn")
  const userDropdown = document.getElementById("userDropdown")

  userMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    userDropdown.classList.toggle("show")
  })

  document.addEventListener("click", () => {
    userDropdown.classList.remove("show")
  })

  userDropdown.addEventListener("click", (e) => {
    e.stopPropagation()
  })
}

document.getElementById("logoutBtn")?.addEventListener("click", () => {
  if (confirm("¿Está seguro que desea cerrar sesión?")) {
    sessionStorage.removeItem("userSession")
    localStorage.removeItem("userSession")
    window.location.href = "login.html"
  }
})

let mandatarios = JSON.parse(localStorage.getItem("mandatarios")) || []
let currentPage = 1
const itemsPerPage = 10

function saveMandatarios() {
  localStorage.setItem("mandatarios", JSON.stringify(mandatarios))
}

// Configurar la navegación entre vistas
function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      navLinks.forEach((l) => l.classList.remove("active"))
      this.classList.add("active")

      const view = this.getAttribute("data-view")
      showView(view)
    })
  })
}

// Mostrar la vista correspondiente
function showView(viewName) {
  const views = document.querySelectorAll(".view")
  views.forEach((view) => view.classList.remove("active"))

  const targetView = document.getElementById(`${viewName}-view`)
  if (targetView) {
    targetView.classList.add("active")
  }
}

// Cargar los mandatarios en la tabla
function loadMandatarios(filteredData = null) {
  const tbody = document.getElementById("mandatariosTable")
  const data = filteredData || mandatarios

  // Calcular la paginación
  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = data.slice(startIndex, endIndex)

  tbody.innerHTML = ""

  if (paginatedData.length === 0) {
    tbody.innerHTML = `
            <tr class="empty-state">
                <td colspan="5">
                    <div class="empty-message">
                        <p>No hay mandatarios registrados</p>
                        <p class="empty-submessage">Comienza agregando un nuevo mandatario</p>
                    </div>
                </td>
            </tr>
        `
  } else {
    paginatedData.forEach((mandatario) => {
      const tr = document.createElement("tr")
      tr.innerHTML = `
                <td>${mandatario.apeynom}</td>
                <td>${mandatario.cuit}</td>
                <td>${mandatario.matriculaProvincial}</td>
                <td>${mandatario.matriculaNacional || "-"}</td>
                <td>
                    <button class="btn btn-link" onclick="viewMandatario('${mandatario.id}')">
                        Consultar
                    </button>
                </td>
            `
      tbody.appendChild(tr)
    })
  }

  updatePaginationInfo(data.length)
}

// Configurar la paginación
function setupPagination() {
  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--
      loadMandatarios()
    }
  })

  document.getElementById("nextPage").addEventListener("click", () => {
    const totalPages = Math.ceil(mandatarios.length / itemsPerPage)
    if (currentPage < totalPages) {
      currentPage++
      loadMandatarios()
    }
  })
}

// Actualizar la información de paginación
function updatePaginationInfo(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1
  document.getElementById("pageInfo").textContent = `Página ${currentPage} de ${totalPages}`

  document.getElementById("prevPage").disabled = currentPage === 1
  document.getElementById("nextPage").disabled = currentPage >= totalPages
}

// Configurar la barra de búsqueda
function setupSearch() {
  const searchInput = document.getElementById("searchInput")
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase().trim()

    if (searchTerm === "") {
      currentPage = 1
      loadMandatarios()
    } else {
      const filtered = mandatarios.filter(
        (m) =>
          m.apeynom.toLowerCase().includes(searchTerm) ||
          m.cuit.includes(searchTerm) ||
          m.matriculaProvincial.toLowerCase().includes(searchTerm) ||
          (m.matriculaNacional && m.matriculaNacional.toLowerCase().includes(searchTerm)),
      )
      currentPage = 1
      loadMandatarios(filtered)
    }
  })
}

// Configurar el modal para agregar/editar mandatarios
function setupModal() {
  const modal = document.getElementById("mandatarioModal")
  const addBtn = document.getElementById("addMandatarioBtn")
  const closeBtn = document.getElementById("closeModal")
  const cancelBtn = document.getElementById("cancelBtn")
  const form = document.getElementById("mandatarioForm")

  addBtn.addEventListener("click", () => openModal())
  closeBtn.addEventListener("click", () => closeModal())
  cancelBtn.addEventListener("click", () => closeModal())

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal()
  })

  form.addEventListener("submit", handleFormSubmit)

  setupFieldValidation()
}

// Configurar la validación de campos del formulario
function setupFieldValidation() {
  const apeynomInput = document.getElementById("apeynom")
  const cuitInput = document.getElementById("cuit")
  const matProvInput = document.getElementById("matriculaProvincial")

  // Campo Apeynom: solo letras, espacios y acentos
  apeynomInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "")
    validateField(this, /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/, "Debe contener solo letras (mínimo 3 caracteres)")
  })

  // Campo CUIT: solo números, exactamente 11 dígitos
  cuitInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 11)
    validateField(this, /^\d{11}$/, "Debe contener exactamente 11 dígitos")
  })

  // Campo Matrícula Provincial: 2 letras seguidas de números
  matProvInput.addEventListener("input", function () {
    this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, "")
    validateField(this, /^[A-Z]{2}\d+$/, "Formato: 2 letras seguidas de números (ej: SL03988)")
  })
}

// Validar un campo específico del formulario
function validateField(input, pattern, errorMessage) {
  const formGroup = input.closest(".form-group")
  let errorDiv = formGroup.querySelector(".error-message")

  if (!pattern.test(input.value) && input.value !== "") {
    formGroup.classList.add("error")
    if (!errorDiv) {
      errorDiv = document.createElement("div")
      errorDiv.className = "error-message"
      formGroup.appendChild(errorDiv)
    }
    errorDiv.textContent = errorMessage
  } else {
    formGroup.classList.remove("error")
    if (errorDiv) errorDiv.remove()
  }
}

// Abrir el modal para agregar o consultar un mandatario
function openModal(mandatarioId = null) {
  const modal = document.getElementById("mandatarioModal")
  const form = document.getElementById("mandatarioForm")
  const title = document.getElementById("modalTitle")

  form.reset()
  document.querySelectorAll(".error-message").forEach((el) => el.remove())
  document.querySelectorAll(".form-group.error").forEach((el) => el.classList.remove("error"))

  if (mandatarioId) {
    const mandatario = mandatarios.find((m) => m.id === mandatarioId)
    if (mandatario) {
      title.textContent = "Consulta de Mandatarios de Santa Fe"
      document.getElementById("mandatarioId").value = mandatario.id
      document.getElementById("apeynom").value = mandatario.apeynom
      document.getElementById("cuit").value = mandatario.cuit
      document.getElementById("matriculaProvincial").value = mandatario.matriculaProvincial
      document.getElementById("matriculaNacional").value = mandatario.matriculaNacional || ""

      // Agregar botón de eliminar
      const formActions = form.querySelector(".form-actions")
      if (!formActions.querySelector(".btn-danger")) {
        const deleteBtn = document.createElement("button")
        deleteBtn.type = "button"
        deleteBtn.className = "btn btn-danger"
        deleteBtn.innerHTML = "<span>🗑️</span> Borrar"
        deleteBtn.onclick = () => deleteMandatario(mandatarioId)
        formActions.insertBefore(deleteBtn, formActions.firstChild)
      }
    }
  } else {
    title.textContent = "Alta de Mandatarios de Santa Fe"
    document.getElementById("mandatarioId").value = ""

    // Eliminar botón de eliminar si existe
    const deleteBtn = form.querySelector(".btn-danger")
    if (deleteBtn) deleteBtn.remove()
  }

  modal.style.display = "flex"
}

// Cerrar el modal
function closeModal() {
  document.getElementById("mandatarioModal").style.display = "none"
}

// Manejar el envío del formulario
function handleFormSubmit(e) {
  e.preventDefault()

  const formData = {
    id: document.getElementById("mandatarioId").value || generateId(),
    apeynom: document.getElementById("apeynom").value.trim().toUpperCase(),
    cuit: document.getElementById("cuit").value.trim(),
    matriculaProvincial: document.getElementById("matriculaProvincial").value.trim().toUpperCase(),
    matriculaNacional: document.getElementById("matriculaNacional").value.trim().toUpperCase(),
  }

  // Validar todos los campos
  if (!validateFormData(formData)) {
    showNotification("Por favor corrija los errores en el formulario", "error")
    return
  }

  const existingIndex = mandatarios.findIndex((m) => m.id === formData.id)

  if (existingIndex >= 0) {
    mandatarios[existingIndex] = formData
    showNotification("Mandatario modificado exitosamente", "success")
  } else {
    mandatarios.push(formData)
    showNotification("Mandatario agregado exitosamente", "success")
  }

  saveMandatarios()
  loadMandatarios()
  closeModal()
}

// Validar los datos del formulario
function validateFormData(data) {
  let isValid = true

  // Validar Apeynom
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/.test(data.apeynom)) {
    isValid = false
  }

  // Validar CUIT
  if (!/^\d{11}$/.test(data.cuit)) {
    isValid = false
  }

  // Validar Matrícula Provincial
  if (!/^[A-Z]{2}\d+$/.test(data.matriculaProvincial)) {
    isValid = false
  }

  return isValid
}

// Generar un ID único para un mandatario
function generateId() {
  return "M" + Date.now() + Math.random().toString(36).substr(2, 9)
}

// Consultar los detalles de un mandatario
function viewMandatario(id) {
  openModal(id)
}

// Eliminar un mandatario
function deleteMandatario(id) {
  if (confirm("¿Está seguro que desea eliminar este mandatario?")) {
    mandatarios = mandatarios.filter((m) => m.id !== id)
    saveMandatarios()
    loadMandatarios()
    closeModal()
    showNotification("Mandatario eliminado exitosamente", "success")
  }
}

// Configurar la funcionalidad de importación masiva
function setupImportBulk() {
  const dropZone = document.getElementById("bulkDropZone")
  const fileInput = document.getElementById("bulkFileInput")
  const processBtn = document.getElementById("processBulkBtn")
  let selectedFile = null

  dropZone.addEventListener("click", () => fileInput.click())

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault()
    dropZone.classList.add("drag-over")
  })

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drag-over")
  })

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault()
    dropZone.classList.remove("drag-over")
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleBulkFile(files[0])
    }
  })

  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      handleBulkFile(e.target.files[0])
    }
  })

  function handleBulkFile(file) {
    selectedFile = file
    const fileInfo = document.getElementById("bulkFileInfo")
    fileInfo.innerHTML = `
      <div class="file-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
          <polyline points="13 2 13 9 20 9"></polyline>
        </svg>
        <span>${file.name}</span>
        <span class="file-size">${(file.size / 1024).toFixed(2)} KB</span>
      </div>
    `
    processBtn.disabled = false
  }

  processBtn.addEventListener("click", () => {
    if (selectedFile) {
      showNotification(
        "Archivo procesado correctamente. Funcionalidad de importación lista para conectar con backend.",
        "success",
      )
      setTimeout(() => {
        showView("santa-fe")
      }, 2000)
    }
  })
}

// Configurar la funcionalidad de importación de fotos
function setupImportPhotos() {
  const dropZone = document.getElementById("photosDropZone")
  const fileInput = document.getElementById("photosFileInput")
  const uploadBtn = document.getElementById("uploadPhotosBtn")
  const preview = document.getElementById("photosPreview")
  let selectedFiles = []

  dropZone.addEventListener("click", () => fileInput.click())

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault()
    dropZone.classList.add("drag-over")
  })

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drag-over")
  })

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault()
    dropZone.classList.remove("drag-over")
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"))
    if (files.length > 0) {
      handlePhotoFiles(files)
    }
  })

  fileInput.addEventListener("change", (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      handlePhotoFiles(files)
    }
  })

  function handlePhotoFiles(files) {
    selectedFiles = files
    preview.innerHTML = ""

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const photoItem = document.createElement("div")
        photoItem.className = "photo-item"
        photoItem.innerHTML = `
          <img src="${e.target.result}" alt="${file.name}">
          <span class="photo-name">${file.name}</span>
        `
        preview.appendChild(photoItem)
      }
      reader.readAsDataURL(file)
    })

    uploadBtn.disabled = false
  }

  uploadBtn.addEventListener("click", () => {
    if (selectedFiles.length > 0) {
      showNotification(
        `${selectedFiles.length} foto(s) subida(s) correctamente. Funcionalidad lista para conectar con backend.`,
        "success",
      )
      setTimeout(() => {
        showView("santa-fe")
        preview.innerHTML = ""
        selectedFiles = []
        uploadBtn.disabled = true
      }, 2000)
    }
  })
}

// Mostrar notificaciones al usuario
function showNotification(message, type = "info") {
  const notification = document.getElementById("notification")
  notification.textContent = message
  notification.className = `notification ${type} show`

  setTimeout(() => {
    notification.classList.remove("show")
  }, 3000)
}

// Configurar el menú móvil
function setupMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle")
  const sidebar = document.getElementById("sidebar")
  const mainContent = document.querySelector(".main-content")

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", (e) => {
      e.stopPropagation()
      sidebar.classList.toggle("active")
    })

    // Cerrar la barra lateral al hacer clic fuera en móvil
    mainContent.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("active")
      }
    })

    // Cerrar la barra lateral al hacer clic en un enlace de navegación en móvil
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          sidebar.classList.remove("active")
        }
      })
    })
  }
}
