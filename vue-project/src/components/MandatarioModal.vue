<template>
  <div id="mandatarioModal" class="modal" :class="{ 'is-active': isModalOpen }" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="modalTitle">{{ modalTitle }}</h2>
        <button class="close-btn" @click="closeModal">&times;</button>
      </div>

      <form id="mandatarioForm" @submit.prevent="handleFormSubmit">
        <input type="hidden" v-model="formData.id">
        
        <div class="form-group" :class="{ 'error': errors.apeynom }">
          <label for="apeynom">Nombre y Apellido <span class="required">*</span></label>
          <input 
            type="text" 
            id="apeynom" 
            v-model="formData.apeynom" 
            required
            placeholder="Ingrese apellido y nombre"
            @input="validateField('apeynom', /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/, 'Debe contener solo letras (mínimo 3 caracteres)')"
          >
          <div v-if="errors.apeynom" class="error-message">{{ errors.apeynom }}</div>
        </div>

        <div class="form-group" :class="{ 'error': errors.cuit }">
          <label for="cuit">CUIT <span class="required">*</span></label>
          <input 
            type="text" 
            id="cuit" 
            v-model="formData.cuit" 
            required
            placeholder="20291139451"
            maxlength="11"
            @input="formatAndValidateCuit"
          >
          <div v-if="errors.cuit" class="error-message">{{ errors.cuit }}</div>
        </div>

        <div class="form-group" :class="{ 'error': errors.matriculaProvincial }">
          <label for="matriculaProvincial">Matrícula Provincial <span class="required">*</span></label>
          <input 
            type="text" 
            id="matriculaProvincial" 
            v-model="formData.matriculaProvincial" 
            required
            placeholder="SL03988"
            @input="formatAndValidateMatProv"
          >
          <div v-if="errors.matriculaProvincial" class="error-message">{{ errors.matriculaProvincial }}</div>
        </div>

        <div class="form-group">
          <label for="matriculaNacional">Matrícula Nacional</label>
          <input 
            type="text" 
            id="matriculaNacional" 
            v-model="formData.matriculaNacional"
            placeholder="M20212738814732IDN"
            @input="formData.matriculaNacional = formData.matriculaNacional.toUpperCase()"
          >
        </div>

        <div class="form-actions">
          <button 
            v-if="formData.id"
            type="button" 
            class="btn btn-danger" 
            @click="deleteMandatario"
          >
            <span>🗑️</span> Borrar
          </button>
          
          <button type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
          <button type="submit" class="btn btn-primary">
            <span>💾</span> {{ formData.id ? 'Guardar cambios' : 'Agregar Mandatario' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useMandatariosStore } from '@/store/mandatarios';

export default {
  name: 'MandatarioModal',
  data() {
    return {
      isModalOpen: false,
      formData: this.getDefaultFormData(),
      errors: {},
    };
  },
  computed: {
    mandatariosStore() {
      return useMandatariosStore();
    },
    modalTitle() {
      return this.formData.id ? 'Consulta/Edición de Mandatario' : 'Alta de Mandatarios de Santa Fe';
    }
  },
  methods: {
    getDefaultFormData() { /* ... */ return { id: null, apeynom: '', cuit: '', matriculaProvincial: '', matriculaNacional: '' }; },
    openModal(mandatarioId = null) {
      this.formData = this.getDefaultFormData();
      this.errors = {}; 
      if (mandatarioId) {
        const mandatario = this.mandatariosStore.mandatarios.find(m => m.id === mandatarioId);
        if (mandatario) {
          this.formData = { ...mandatario };
        }
      }
      this.isModalOpen = true;
    },
    closeModal() { this.isModalOpen = false; this.formData = this.getDefaultFormData(); this.errors = {}; this.mandatariosStore.loadMandatarios(); },

    // Lógica de Validación (simplificada)
    validateField(field, pattern, errorMessage) {
      const value = this.formData[field];
      if (!pattern.test(value) && value !== "") { this.errors[field] = errorMessage; } 
      else { delete this.errors[field]; }
    },
    formatAndValidateCuit(event) {
      event.target.value = event.target.value.replace(/\D/g, "").slice(0, 11);
      this.formData.cuit = event.target.value;
      this.validateField('cuit', /^\d{11}$/, "Debe contener exactamente 11 dígitos");
    },
    formatAndValidateMatProv(event) {
      event.target.value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
      this.formData.matriculaProvincial = event.target.value;
      this.validateField('matriculaProvincial', /^[A-Z]{2}\d+$/, "Formato: 2 letras seguidas de números (ej: SL03988)");
    },
    validateAll() {
      this.validateField('apeynom', /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/, "Debe contener solo letras (mínimo 3 caracteres)");
      this.validateField('cuit', /^\d{11}$/, "Debe contener exactamente 11 dígitos");
      this.validateField('matriculaProvincial', /^[A-Z]{2}\d+$/, "Formato: 2 letras seguidas de números (ej: SL03988)");
      return Object.keys(this.errors).length === 0;
    },

    // Lógica de CRUD
    handleFormSubmit() {
      if (!this.validateAll()) { return; }
      this.mandatariosStore.addOrUpdateMandatario(this.formData);
      this.closeModal();
    },
    deleteMandatario() {
      if (confirm("¿Está seguro que desea eliminar este mandatario?")) {
        this.mandatariosStore.deleteMandatario(this.formData.id);
        this.closeModal();
      }
    }
  }
};
</script>

<style scoped>
/* Estilos de Formulario */
form {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #334155;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}
</style>