<script setup>
import { reactive, ref } from 'vue'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../Firebase/init'
import { setRoleForUser } from '../auth'

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'Student',
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: '',
  firebase: '',
})

const successMessage = ref('')

const clearErrors = () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = ''
  })
  successMessage.value = ''
}

const validateForm = () => {
  clearErrors()

  if (!form.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  }

  if (form.password.length < 6) {
    errors.password = 'Password must contain at least 6 characters.'
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  if (!form.role) {
    errors.role = 'Please select a role.'
  }

  return !Object.values(errors).some(Boolean)
}

const registerUser = async () => {
  if (!validateForm()) return

  try {
    const credential = await createUserWithEmailAndPassword(auth, form.email.trim(), form.password)

    await updateProfile(credential.user, {
      displayName: form.name.trim(),
    })

    setRoleForUser(credential.user.uid, form.role)

    successMessage.value = `Registered ${credential.user.email} as ${form.role}.`
    console.log('Registered Firebase user:', credential.user)
    console.log('Registered Firebase role:', form.role)

    form.name = ''
    form.email = ''
    form.password = ''
    form.confirmPassword = ''
    form.role = 'Student'
  } catch (error) {
    errors.firebase = error.message
    console.error('Firebase registration error:', error)
  }
}
</script>

<template>
  <section class="container py-5">
    <div class="firebase-card mx-auto">
      <h1 class="h3 mb-2">Firebase Registration</h1>
      <p class="text-secondary">
        Create a Firebase Authentication account and assign a local role for Lab 7 testing.
      </p>

      <form class="mt-4" @submit.prevent="registerUser">
        <div class="mb-3">
          <label for="firebase-name" class="form-label">Full Name</label>
          <input id="firebase-name" v-model.trim="form.name" class="form-control" type="text" />
          <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
        </div>

        <div class="mb-3">
          <label for="firebase-email" class="form-label">Email</label>
          <input id="firebase-email" v-model.trim="form.email" class="form-control" type="email" />
          <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
        </div>

        <div class="row">
          <div class="col-12 col-md-6 mb-3">
            <label for="firebase-password" class="form-label">Password</label>
            <input
              id="firebase-password"
              v-model="form.password"
              class="form-control"
              type="password"
            />
            <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
          </div>

          <div class="col-12 col-md-6 mb-3">
            <label for="firebase-confirm-password" class="form-label">Confirm Password</label>
            <input
              id="firebase-confirm-password"
              v-model="form.confirmPassword"
              class="form-control"
              type="password"
            />
            <small v-if="errors.confirmPassword" class="text-danger">
              {{ errors.confirmPassword }}
            </small>
          </div>
        </div>

        <div class="mb-3">
          <label for="firebase-role" class="form-label">Role</label>
          <select id="firebase-role" v-model="form.role" class="form-select">
            <option>Student</option>
            <option>Volunteer</option>
            <option>Admin</option>
          </select>
          <small v-if="errors.role" class="text-danger">{{ errors.role }}</small>
        </div>

        <div v-if="errors.firebase" class="alert alert-danger">
          {{ errors.firebase }}
        </div>

        <div v-if="successMessage" class="alert alert-success">
          {{ successMessage }}
        </div>

        <button class="btn btn-primary w-100" type="submit">Register with Firebase</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.firebase-card {
  background-color: white;
  border: 1px solid #dce7f4;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(35, 77, 120, 0.08);
  max-width: 640px;
  padding: 30px;
}
</style>
