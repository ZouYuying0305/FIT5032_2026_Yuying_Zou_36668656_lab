<template>
  <section class="container py-5">
    <div class="members-card">
      <p class="text-uppercase text-primary fw-semibold mb-2">Secure Route</p>
      <h1 class="h2">Members Area</h1>
      <p class="text-secondary mb-4">
        This page is protected by a Vue Router navigation guard. Users must log in before they can
        access members-only library information.
      </p>

      <div class="row g-3">
        <div class="col-12 col-md-4">
          <div class="info-tile">
            <h2 class="h5">Borrowing</h2>
            <p class="mb-0">Access member borrowing rules and account information.</p>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="info-tile">
            <h2 class="h5">Events</h2>
            <p class="mb-0">View upcoming library events available to registered members.</p>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="info-tile">
            <h2 class="h5">Support</h2>
            <p class="mb-0">Find support resources for improving the library experience.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.members-card {
  background-color: #ffffff;
  border: 1px solid #dbe4f0;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(31, 77, 120, 0.08);
  padding: 28px;
}

.info-tile {
  background-color: #f8fbff;
  border: 1px solid #dbe4f0;
  border-radius: 8px;
  height: 100%;
  padding: 18px;
}
</style>
