<template>
  <section class="container py-5">
    <div class="access-card mx-auto text-center">
      <p class="text-uppercase text-danger fw-semibold mb-2">Access Denied</p>
      <h1 class="h3">Login Required</h1>
      <p class="text-secondary">You must be logged in before accessing the secure members area.</p>
      <div class="d-flex justify-content-center gap-2">
        <RouterLink class="btn btn-primary" :to="{ name: 'login', query: $route.query }">
          Go to Login
        </RouterLink>
        <RouterLink class="btn btn-outline-secondary" to="/">Back Home</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.access-card {
  background-color: #ffffff;
  border: 1px solid #f2c6c6;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(120, 31, 31, 0.08);
  max-width: 560px;
  padding: 32px;
}
</style>
