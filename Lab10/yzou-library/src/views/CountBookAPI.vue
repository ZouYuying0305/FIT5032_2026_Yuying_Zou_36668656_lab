<script setup>
import { onMounted, ref } from 'vue'
import authorsData from '../assets/json/authors.json'

const loading = ref(false)
const error = ref('')
const apiResponse = ref(null)

const getApiData = async () => {
  loading.value = true
  error.value = ''

  try {
    const authors = authorsData
    const authorsCount = authors.length
    const totalBooks = authors.reduce((total, author) => total + author.famousWorks.length, 0)

    apiResponse.value = {
      success: true,
      data: {
        authorsCount,
        totalBooks,
        authors: authors.map((author) => ({
          name: author.name,
          bookCount: author.famousWorks.length,
        })),
      },
      timestamp: new Date().toISOString(),
    }
  } catch (err) {
    error.value = `Error loading authors data: ${err.message}`
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getApiData()
})

defineExpose({
  getApiData,
})
</script>

<template>
  <section class="container py-5">
    <div class="api-card">
      <p class="text-uppercase text-primary fw-semibold mb-2">FIT5032 Lab 10</p>
      <h1 class="display-6 fw-bold">Count Book API</h1>
      <p class="text-secondary">
        This page displays local JSON data as an API-style response, including the number of authors
        and total famous works.
      </p>

      <button class="btn btn-primary mb-4" type="button" :disabled="loading" @click="getApiData">
        {{ loading ? 'Loading...' : 'Refresh API Response' }}
      </button>

      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <div v-if="apiResponse" class="api-response">
        <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
      </div>
    </div>
  </section>
</template>

<style scoped>
.api-card {
  background: #ffffff;
  border: 1px solid #dbe4f0;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(31, 77, 120, 0.08);
  padding: 28px;
}

.api-response {
  background: #111827;
  border-radius: 12px;
  color: #d1e7ff;
  overflow-x: auto;
  padding: 20px;
}

pre {
  margin: 0;
  white-space: pre-wrap;
}
</style>
