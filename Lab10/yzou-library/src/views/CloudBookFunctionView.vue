<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../Firebase/init'

const books = ref([])
const cloudResult = ref(null)
const loading = ref(false)
const error = ref('')

const functionUrl = import.meta.env.VITE_LAB9_BOOK_FUNCTION_URL

const loadBooksFromFirestore = async () => {
  const booksQuery = query(collection(db, 'books'), orderBy('isbn', 'desc'))
  const snapshot = await getDocs(booksQuery)

  books.value = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

const callCloudFunction = async () => {
  loading.value = true
  error.value = ''
  cloudResult.value = null

  try {
    if (!functionUrl) {
      throw new Error('Missing VITE_LAB9_BOOK_FUNCTION_URL in .env.local')
    }

    await loadBooksFromFirestore()

    const response = await axios.post(functionUrl, {
      books: books.value,
    })

    cloudResult.value = response.data
  } catch (err) {
    console.error('Failed to call cloud function:', err)
    error.value = 'Failed to call the Alibaba Cloud Function.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="container py-5">
    <section class="card shadow-sm">
      <div class="card-body">
        <p class="text-primary fw-semibold text-uppercase mb-2">FIT5032 Lab 9</p>
        <h1 class="mb-3">Cloud Function Book Summary</h1>

        <p class="text-muted">
          This page retrieves book records from Firestore and sends them to an Alibaba Cloud
          Function. The cloud function returns the book count, top ISBN records, and a sales insight
          summary.
        </p>

        <button
          class="btn btn-primary"
          type="button"
          :disabled="loading"
          @click="callCloudFunction"
        >
          {{ loading ? 'Processing...' : 'Run Cloud Function' }}
        </button>

        <div v-if="error" class="alert alert-danger mt-4">
          {{ error }}
        </div>

        <div v-if="cloudResult" class="mt-4">
          <div class="alert alert-success">
            <strong>{{ cloudResult.summary }}</strong>
          </div>

          <div class="row g-3">
            <div class="col-12 col-md-4">
              <div class="border rounded p-3 h-100 bg-light">
                <p class="text-muted mb-1">Firestore Books Sent</p>
                <h2 class="h3 mb-0">{{ books.length }}</h2>
              </div>
            </div>

            <div class="col-12 col-md-4">
              <div class="border rounded p-3 h-100 bg-light">
                <p class="text-muted mb-1">Cloud Function Count</p>
                <h2 class="h3 mb-0">{{ cloudResult.count }}</h2>
              </div>
            </div>

            <div class="col-12 col-md-4">
              <div class="border rounded p-3 h-100 bg-light">
                <p class="text-muted mb-1">Top Books Returned</p>
                <h2 class="h3 mb-0">{{ cloudResult.salesInsight.topBooks.length }}</h2>
              </div>
            </div>
          </div>

          <div class="border rounded p-3 mt-3">
            <p class="text-muted mb-1">Cloud Function Recommendation</p>
            <p class="mb-0">{{ cloudResult.salesInsight.recommendation }}</p>
          </div>

          <h2 class="h5 mt-4">Top Books by ISBN</h2>
          <div class="table-responsive">
            <table class="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Book Name</th>
                  <th>ISBN</th>
                  <th>Firestore Document ID</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="book in cloudResult.salesInsight.topBooks" :key="book.id || book.isbn">
                  <td>{{ book.name }}</td>
                  <td>{{ book.isbn }}</td>
                  <td>{{ book.id || 'N/A' }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 class="h5 mt-4">Raw Cloud Function Response</h2>
          <pre class="bg-light border rounded p-3">{{ cloudResult }}</pre>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.card {
  border: 1px solid #d9e2ef;
  border-radius: 12px;
}

pre {
  white-space: pre-wrap;
}
</style>
