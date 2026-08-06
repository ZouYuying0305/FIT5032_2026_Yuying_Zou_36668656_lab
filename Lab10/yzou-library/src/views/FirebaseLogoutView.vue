<script setup>
import { ref } from 'vue'
import { authState, logout } from '../auth'

const message = ref('')

const signOutUser = async () => {
  await logout()
  message.value = 'Firebase user has been signed out. Check the browser console.'
}
</script>

<template>
  <section class="container py-5">
    <div class="firebase-card mx-auto">
      <h1 class="h3 mb-2">Firebase Log Out</h1>
      <p class="text-secondary">
        Use this page to sign out and verify the current Firebase user in the developer console.
      </p>

      <div class="status-panel my-4">
        <p class="mb-1"><strong>Authenticated:</strong> {{ authState.isAuthenticated }}</p>
        <p class="mb-1"><strong>Email:</strong> {{ authState.email || 'Not signed in' }}</p>
        <p class="mb-0"><strong>Role:</strong> {{ authState.role || 'Not signed in' }}</p>
      </div>

      <button class="btn btn-danger w-100" type="button" @click="signOutUser">
        Log Out Firebase User
      </button>

      <div v-if="message" class="alert alert-info mt-3">
        {{ message }}
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
  max-width: 560px;
  padding: 30px;
}

.status-panel {
  background-color: #f7fbff;
  border: 1px solid #dce7f4;
  border-radius: 10px;
  padding: 16px;
}
</style>
