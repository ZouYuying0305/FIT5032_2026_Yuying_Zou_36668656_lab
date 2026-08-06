<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../Firebase/init'

const props = defineProps({
  refreshKey: {
    type: Number,
    default: 0,
  },
})

const books = ref([])
const queriedBooks = ref([])
const loading = ref(false)
const queryLoading = ref(false)
const message = ref('')
const errorMessage = ref('')
const editingId = ref('')

const editForm = reactive({
  name: '',
  isbn: '',
})

const booksCollection = collection(db, 'books')

const loadBooks = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const booksQuery = query(booksCollection, orderBy('isbn', 'asc'))
    const snapshot = await getDocs(booksQuery)
    books.value = snapshot.docs.map((bookDoc) => ({
      id: bookDoc.id,
      ...bookDoc.data(),
    }))
    console.log('Retrieved all books from Firestore:', books.value)
  } catch (error) {
    errorMessage.value = error.message
    console.error('Firestore retrieve error:', error)
  } finally {
    loading.value = false
  }
}

const loadQueryBooks = async () => {
  queryLoading.value = true
  errorMessage.value = ''

  try {
    const filteredQuery = query(
      booksCollection,
      where('isbn', '>', 1000),
      orderBy('isbn', 'desc'),
      limit(5),
    )
    const snapshot = await getDocs(filteredQuery)
    queriedBooks.value = snapshot.docs.map((bookDoc) => ({
      id: bookDoc.id,
      ...bookDoc.data(),
    }))
    console.log(
      'Firestore query result where isbn > 1000 orderBy isbn desc limit 5:',
      queriedBooks.value,
    )
  } catch (error) {
    errorMessage.value = error.message
    console.error('Firestore query error:', error)
  } finally {
    queryLoading.value = false
  }
}

const startEdit = (book) => {
  editingId.value = book.id
  editForm.name = book.name
  editForm.isbn = String(book.isbn)
  message.value = ''
}

const cancelEdit = () => {
  editingId.value = ''
  editForm.name = ''
  editForm.isbn = ''
}

const saveBook = async (bookId) => {
  errorMessage.value = ''

  if (!editForm.name.trim() || !editForm.isbn) {
    errorMessage.value = 'Book name and ISBN are required for updating.'
    return
  }

  try {
    await updateDoc(doc(db, 'books', bookId), {
      name: editForm.name.trim(),
      isbn: Number(editForm.isbn),
      updatedAt: new Date(),
    })

    console.log('Updated Firestore book:', bookId)
    message.value = 'Book updated successfully.'
    cancelEdit()
    await loadBooks()
    await loadQueryBooks()
  } catch (error) {
    errorMessage.value = error.message
    console.error('Firestore update error:', error)
  }
}

const removeBook = async (bookId) => {
  errorMessage.value = ''

  try {
    await deleteDoc(doc(db, 'books', bookId))
    console.log('Deleted Firestore book:', bookId)
    message.value = 'Book deleted successfully.'
    await loadBooks()
    await loadQueryBooks()
  } catch (error) {
    errorMessage.value = error.message
    console.error('Firestore delete error:', error)
  }
}

watch(
  () => props.refreshKey,
  async () => {
    await loadBooks()
    await loadQueryBooks()
  },
)

onMounted(async () => {
  await loadBooks()
  await loadQueryBooks()
})
</script>

<template>
  <section class="book-list">
    <div
      class="d-flex flex-column flex-md-row gap-2 justify-content-between align-items-md-center mb-3"
    >
      <div>
        <h2 class="h4 mb-1">Books Retrieved from Firestore</h2>
        <p class="text-secondary mb-0">
          Use this section to update and delete Firestore documents.
        </p>
      </div>
      <button class="btn btn-outline-primary" type="button" @click="loadBooks">
        Refresh All Books
      </button>
    </div>

    <div v-if="message" class="alert alert-success">{{ message }}</div>
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    <div v-if="loading" class="alert alert-info">Loading books from Firestore...</div>

    <div class="table-responsive">
      <table class="table table-bordered table-hover align-middle">
        <thead class="table-primary">
          <tr>
            <th scope="col">Book Name</th>
            <th scope="col">ISBN</th>
            <th scope="col">Document ID</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td>
              <input
                v-if="editingId === book.id"
                v-model.trim="editForm.name"
                class="form-control"
                type="text"
              />
              <span v-else>{{ book.name }}</span>
            </td>
            <td>
              <input
                v-if="editingId === book.id"
                v-model.number="editForm.isbn"
                class="form-control"
                type="number"
              />
              <span v-else>{{ book.isbn }}</span>
            </td>
            <td>
              <code>{{ book.id }}</code>
            </td>
            <td>
              <div v-if="editingId === book.id" class="d-flex gap-2">
                <button class="btn btn-success btn-sm" type="button" @click="saveBook(book.id)">
                  Save
                </button>
                <button class="btn btn-secondary btn-sm" type="button" @click="cancelEdit">
                  Cancel
                </button>
              </div>
              <div v-else class="d-flex gap-2">
                <button class="btn btn-warning btn-sm" type="button" @click="startEdit(book)">
                  Update
                </button>
                <button class="btn btn-danger btn-sm" type="button" @click="removeBook(book.id)">
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="!books.length && !loading">
            <td colspan="4" class="text-center text-secondary">No books found in Firestore.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="query-panel mt-5">
      <div
        class="d-flex flex-column flex-md-row gap-2 justify-content-between align-items-md-center mb-3"
      >
        <div>
          <h2 class="h4 mb-1">Firestore Query Result</h2>
          <p class="text-secondary mb-0">
            Query: where ISBN &gt; 1000, orderBy ISBN descending, limit 5.
          </p>
        </div>
        <button class="btn btn-outline-primary" type="button" @click="loadQueryBooks">
          Run Query
        </button>
      </div>

      <div v-if="queryLoading" class="alert alert-info">Running Firestore query...</div>

      <div class="row g-3">
        <div v-for="book in queriedBooks" :key="book.id" class="col-12 col-md-6 col-lg-4">
          <div class="query-card">
            <h3 class="h5">{{ book.name }}</h3>
            <p class="mb-1"><strong>ISBN:</strong> {{ book.isbn }}</p>
            <p class="mb-0"><strong>Document ID:</strong> {{ book.id }}</p>
          </div>
        </div>
        <div v-if="!queriedBooks.length && !queryLoading" class="col-12">
          <div class="alert alert-secondary mb-0">No books matched the query.</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.book-list {
  margin-top: 34px;
}

.query-panel {
  background-color: #ffffff;
  border: 1px solid #dbe4f0;
  border-radius: 12px;
  padding: 22px;
}

.query-card {
  background-color: #f8fbff;
  border: 1px solid #dbe4f0;
  border-radius: 10px;
  height: 100%;
  padding: 18px;
}

code {
  color: #345;
  white-space: normal;
}
</style>
