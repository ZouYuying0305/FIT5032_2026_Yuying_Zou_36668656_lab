import { reactive } from 'vue'

export const authState = reactive({
  isAuthenticated: localStorage.getItem('lab5-authenticated') === 'true',
  username: localStorage.getItem('lab5-username') || '',
})

export const login = (username) => {
  authState.isAuthenticated = true
  authState.username = username
  localStorage.setItem('lab5-authenticated', 'true')
  localStorage.setItem('lab5-username', username)
}

export const logout = () => {
  authState.isAuthenticated = false
  authState.username = ''
  localStorage.removeItem('lab5-authenticated')
  localStorage.removeItem('lab5-username')
}
