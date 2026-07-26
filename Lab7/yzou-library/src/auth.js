import { reactive } from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'

const ROLE_STORAGE_KEY = 'lab7-firebase-user-roles'

const readRoles = () => {
  try {
    return JSON.parse(localStorage.getItem(ROLE_STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

const writeRoles = (roles) => {
  localStorage.setItem(ROLE_STORAGE_KEY, JSON.stringify(roles))
}

export const getRoleForUser = (uid) => {
  const roles = readRoles()
  return roles[uid] || 'Student'
}

export const setRoleForUser = (uid, role) => {
  const roles = readRoles()
  roles[uid] = role
  writeRoles(roles)
}

export const authState = reactive({
  loading: true,
  isAuthenticated: false,
  currentUser: null,
  uid: '',
  email: '',
  role: '',
})

onAuthStateChanged(auth, (user) => {
  authState.loading = false
  authState.currentUser = user
  authState.isAuthenticated = Boolean(user)
  authState.uid = user?.uid || ''
  authState.email = user?.email || ''
  authState.role = user ? getRoleForUser(user.uid) : ''

  console.log('Current Firebase user:', user)
  console.log('Current Firebase role:', authState.role || 'Not signed in')
})

export const logout = async () => {
  await signOut(auth)
  console.log('Current Firebase user after logout:', auth.currentUser)
}
