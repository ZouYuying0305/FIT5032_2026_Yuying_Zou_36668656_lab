<script setup>
import { onMounted, ref } from 'vue'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../Firebase/init'

const loading = ref(false)
const error = ref('')
const apiResponse = ref(null)

const getAllBooks = async () => {
  loading.value = true
  error.value = ''

  try {
    const booksQuery = query(collection(db, 'books'), orderBy('isbn', 'asc'))
    const snapshot = await getDocs(booksQuery)
    const books = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    apiResponse.value = {
      success: true,
      data: {
        totalBooks: books.length,
        books,
      },
      timestamp: new Date().toISOString(),
    }
  } catch (err) {
    error.value = err.message
    console.error('GetAllBookAPI Firestore error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getAllBooks()
})

defineExpose({
  getAllBooks,
})
</script>

<template>
  <section class="container py-5">
    <div class="api-card">
      <p class="text-uppercase text-primary fw-semibold mb-2">FIT5032 Lab 10</p>
      <h1 class="display-6 fw-bold">GetAllBookAPI</h1>
      <p class="text-secondary">
        This page retrieves all book documents from Firestore and displays them in JSON format.
      </p>

      <button class="btn btn-primary mb-4" type="button" :disabled="loading" @click="getAllBooks">
        {{ loading ? 'Loading...' : 'Refresh Books JSON' }}
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
