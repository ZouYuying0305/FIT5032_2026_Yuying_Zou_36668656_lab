<script setup>
import { useRouter } from 'vue-router'
import { authState, logout } from './auth'

const router = useRouter()

const handleLogout = async () => {
  await logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="app-shell">
    <nav class="navbar navbar-expand-lg bg-primary navbar-dark">
      <div class="container">
        <RouterLink class="navbar-brand fw-semibold" to="/">NoMash Library</RouterLink>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavigation"
          aria-controls="mainNavigation"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div id="mainNavigation" class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/register">Register</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/fire-register">FireRegister</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/fire-signin">FireSignin</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/add-book">AddBook</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/cloud-books">CloudBooks</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/about">Members Area</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/fire-logout">FireLogout</RouterLink>
            </li>
          </ul>

          <div class="d-flex align-items-center gap-2">
            <span v-if="authState.isAuthenticated" class="navbar-text">
              Signed in as {{ authState.email }} ({{ authState.role }})
            </span>
            <RouterLink v-if="!authState.isAuthenticated" class="btn btn-outline-light" to="/login">
              Firebase Login
            </RouterLink>
            <button v-else class="btn btn-outline-light" type="button" @click="handleLogout">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background-color: #f4f7fb;
}

.router-link-active {
  font-weight: 700;
}
</style>
