<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { login } from '../auth'

const router = useRouter()
const route = useRoute()

const credentials = reactive({
  username: '',
  password: '',
})

const errors = reactive({
  login: '',
})

const submitLogin = () => {
  errors.login = ''

  if (credentials.username === 'student' && credentials.password === 'password123') {
    login(credentials.username)
    router.push(route.query.redirect || { name: 'about' })
    return
  }

  errors.login = 'Invalid username or password. Try student / password123.'
}
</script>

<template>
  <section class="container py-5">
    <div class="login-card mx-auto">
      <h1 class="h3 mb-3">Library Login</h1>
      <p class="text-secondary">
        Use the hardcoded test account to access the secure members area.
      </p>

      <form @submit.prevent="submitLogin">
        <div class="mb-3">
          <label for="login-username" class="form-label">Username</label>
          <input
            id="login-username"
            v-model.trim="credentials.username"
            class="form-control"
            type="text"
            required
          />
        </div>

        <div class="mb-3">
          <label for="login-password" class="form-label">Password</label>
          <input
            id="login-password"
            v-model="credentials.password"
            class="form-control"
            type="password"
            required
          />
        </div>

        <div v-if="errors.login" class="alert alert-danger">
          {{ errors.login }}
        </div>

        <button class="btn btn-primary w-100" type="submit">Login</button>
      </form>

      <div class="test-account mt-3"><strong>Test account:</strong> student / password123</div>
    </div>
  </section>
</template>

<style scoped>
.login-card {
  background-color: #ffffff;
  border: 1px solid #dbe4f0;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(31, 77, 120, 0.08);
  max-width: 460px;
  padding: 28px;
}

.test-account {
  background-color: #f8fbff;
  border-radius: 8px;
  color: #44546a;
  padding: 12px;
}
</style>
