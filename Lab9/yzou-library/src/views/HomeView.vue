<template>
  <section class="home-hero">
    <div class="container py-5">
      <div class="row align-items-center g-4">
        <div class="col-12 col-lg-7">
          <p class="text-uppercase text-primary fw-semibold mb-2">FIT5032 Lab 5</p>
          <h1 class="display-5 fw-bold">NoMash Library Web Application</h1>
          <p class="lead text-secondary">
            This single-page Vue application demonstrates event handling, two-way data binding,
            password confirmation validation, Vue Router, and secure route navigation.
          </p>

          <div class="d-flex flex-wrap gap-2 mt-4">
            <RouterLink class="btn btn-primary" to="/register">Open Registration Form</RouterLink>
            <RouterLink class="btn btn-outline-primary" to="/about">Members Area</RouterLink>
          </div>
        </div>

        <div class="col-12 col-lg-5">
          <div class="feature-panel">
            <h2 class="h4">Lab 5 Features</h2>
            <ul class="list-unstyled mb-0">
              <li>Password confirmation validation</li>
              <li>Vue DevTools-friendly reactive data</li>
              <li>Router-based navigation</li>
              <li>Protected members-only route</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-hero {
  min-height: calc(100vh - 56px);
  display: flex;
  align-items: center;
}

.feature-panel {
  background-color: #ffffff;
  border: 1px solid #dbe4f0;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(31, 77, 120, 0.08);
  padding: 24px;
}

.feature-panel li {
  border-bottom: 1px solid #edf2f7;
  padding: 10px 0;
}

.feature-panel li:last-child {
  border-bottom: 0;
}
</style>
