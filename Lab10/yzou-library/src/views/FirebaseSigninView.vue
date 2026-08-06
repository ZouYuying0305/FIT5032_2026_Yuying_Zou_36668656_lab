<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase/init'
import { authState, getRoleForUser } from '../auth'

const router = useRouter()

const form = reactive({
  email: '',
  password: '',
})

const errorMessage = ref('')
const successMessage = ref('')

const signInUser = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const credential = await signInWithEmailAndPassword(auth, form.email.trim(), form.password)
    const role = getRoleForUser(credential.user.uid)

    successMessage.value = `Signed in as ${credential.user.email}. Role: ${role}.`
    console.log('Signed in Firebase user:', credential.user)
    console.log('Signed in Firebase role:', role)

    router.push({ name: 'about' })
  } catch (error) {
    errorMessage.value = error.message
    console.error('Firebase sign-in error:', error)
  }
}
</script>

<template>
  <section class="container py-5">
    <div class="firebase-card mx-auto">
      <h1 class="h3 mb-2">Firebase Sign In</h1>
      <p class="text-secondary">
        Sign in with a registered Firebase account. Open the browser console to confirm the current
        Firebase user and role.
      </p>

      <form class="mt-4" @submit.prevent="signInUser">
        <div class="mb-3">
          <label for="signin-email" class="form-label">Email</label>
          <input id="signin-email" v-model.trim="form.email" class="form-control" type="email" />
        </div>

        <div class="mb-3">
          <label for="signin-password" class="form-label">Password</label>
          <input
            id="signin-password"
            v-model="form.password"
            class="form-control"
            type="password"
          />
        </div>

        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="alert alert-success">
          {{ successMessage }}
        </div>

        <button class="btn btn-primary w-100" type="submit">Sign In with Firebase</button>
      </form>

      <div class="status-panel mt-4">
        <h2 class="h6">Current Auth State</h2>
        <p class="mb-1"><strong>Authenticated:</strong> {{ authState.isAuthenticated }}</p>
        <p class="mb-1"><strong>Email:</strong> {{ authState.email || 'Not signed in' }}</p>
        <p class="mb-0"><strong>Role:</strong> {{ authState.role || 'Not signed in' }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.firebase-card {
  background-color: white;
  border: 1px solid #dce7f4;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(35, 77, 120, 0.08);
  max-width: 620px;
  padding: 30px;
}

.status-panel {
  background-color: #f7fbff;
  border: 1px solid #dce7f4;
  border-radius: 10px;
  padding: 16px;
}
</style>
