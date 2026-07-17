<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Library Registration Form</h1>

    <form class="form" @submit.prevent="submitForm">
      <div class="row">
        <div class="col-12 col-md-6 mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            id="username"
            v-model.trim="formData.username"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.username }"
            required
            minlength="3"
            maxlength="20"
            @blur="() => validateUsername(true)"
            @input="() => validateUsername(false)"
          />
          <div v-if="errors.username" class="invalid-feedback">
            {{ errors.username }}
          </div>
        </div>

        <div class="col-12 col-md-6 mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': errors.password }"
            required
            minlength="6"
            maxlength="20"
            @blur="() => validatePassword(true)"
            @input="() => validatePassword(false)"
          />
          <div v-if="errors.password" class="invalid-feedback">
            {{ errors.password }}
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-6 mb-3">
          <label for="confirm-password" class="form-label">Confirm Password</label>
          <input
            id="confirm-password"
            v-model="formData.confirmPassword"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': errors.confirmPassword }"
            required
            minlength="6"
            maxlength="20"
            @blur="() => validateConfirmPassword(true)"
            @input="() => validateConfirmPassword(false)"
          />
          <div v-if="errors.confirmPassword" class="invalid-feedback">
            {{ errors.confirmPassword }}
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-6 mb-3">
          <div class="form-check mt-4">
            <input
              id="isAustralian"
              v-model="formData.isAustralian"
              type="checkbox"
              class="form-check-input"
              :class="{ 'is-invalid': errors.isAustralian }"
              required
            />
            <label for="isAustralian" class="form-check-label">Australian Resident?</label>
            <div v-if="errors.isAustralian" class="invalid-feedback">
              {{ errors.isAustralian }}
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 mb-3">
          <label for="gender" class="form-label">Gender</label>
          <select
            id="gender"
            v-model="formData.gender"
            class="form-select"
            :class="{ 'is-invalid': errors.gender }"
            required
          >
            <option disabled value="">Please select one</option>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
            <option>Prefer not to say</option>
          </select>
          <div v-if="errors.gender" class="invalid-feedback">
            {{ errors.gender }}
          </div>
        </div>
      </div>

      <div class="mb-3">
        <label for="reason" class="form-label">Reason for joining</label>
        <textarea
          id="reason"
          v-model.trim="formData.reason"
          class="form-control"
          :class="{ 'is-invalid': errors.reason }"
          rows="3"
          required
          maxlength="200"
        ></textarea>
        <div v-if="errors.reason" class="invalid-feedback">
          {{ errors.reason }}
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-primary me-2">Submit</button>
        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
      </div>
    </form>

    <div v-if="submittedCards.length" class="mt-4">
      <div class="table-heading">
        <h2 class="h4 mb-1">Submitted Users</h2>
        <p class="text-muted mb-0">PrimeVue DataTable displaying validated form submissions.</p>
      </div>

      <DataTable :value="submittedCards" stripedRows tableStyle="min-width: 50rem">
        <Column field="username" header="Username"></Column>
        <Column field="password" header="Password">
          <template #body="{ data }">
            {{ maskPassword(data.password) }}
          </template>
        </Column>
        <Column header="Australian Resident">
          <template #body="{ data }">
            {{ data.isAustralian ? 'Yes' : 'No' }}
          </template>
        </Column>
        <Column field="gender" header="Gender"></Column>
        <Column field="reason" header="Reason"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formData = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  gender: '',
  reason: '',
})

const errors = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: '',
  gender: '',
  reason: '',
})

const submittedCards = ref([])

const clearErrors = () => {
  errors.username = ''
  errors.password = ''
  errors.confirmPassword = ''
  errors.isAustralian = ''
  errors.gender = ''
  errors.reason = ''
}

const validateUsername = (showError = true) => {
  errors.username = ''
  if (formData.username.length < 3) {
    errors.username = showError ? 'Username must contain at least 3 characters.' : ''
  }

  return !errors.username
}

const validatePassword = (showError = true) => {
  errors.password = ''

  if (formData.password.length < 6) {
    errors.password = showError ? 'Password must contain at least 6 characters.' : ''
  } else if (!/\d/.test(formData.password)) {
    errors.password = showError ? 'Password must contain at least one number.' : ''
  }

  if (formData.confirmPassword) {
    validateConfirmPassword(showError)
  }

  return !errors.password
}

const validateConfirmPassword = (showError = true) => {
  errors.confirmPassword = ''

  if (formData.confirmPassword.length < 6) {
    errors.confirmPassword = showError ? 'Confirm password must contain at least 6 characters.' : ''
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = showError ? 'Passwords do not match.' : ''
  }

  return !errors.confirmPassword
}

const validateForm = () => {
  clearErrors()

  validateUsername(true)
  validatePassword(true)
  validateConfirmPassword(true)

  if (!formData.isAustralian) {
    errors.isAustralian = 'Please confirm whether you are an Australian resident.'
  }

  if (!formData.gender) {
    errors.gender = 'Please select a gender option.'
  }

  if (formData.reason.length < 10) {
    errors.reason = 'Reason must contain at least 10 characters.'
  }

  return !Object.values(errors).some(Boolean)
}

const submitForm = () => {
  if (!validateForm()) {
    return
  }

  submittedCards.value.push({
    username: formData.username,
    password: formData.password,
    isAustralian: formData.isAustralian,
    gender: formData.gender,
    reason: formData.reason,
  })

  clearForm()
}

const clearForm = () => {
  formData.username = ''
  formData.password = ''
  formData.confirmPassword = ''
  formData.isAustralian = false
  formData.gender = ''
  formData.reason = ''
  clearErrors()
}

const maskPassword = (password) => {
  return '*'.repeat(password.length)
}
</script>

<style scoped>
.form {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 24px;
}

.table-heading {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 10px 10px 0 0;
  padding: 16px;
}

:deep(.p-datatable) {
  border: 1px solid #dee2e6;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
}
</style>
