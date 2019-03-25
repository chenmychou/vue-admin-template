import Cookies from 'js-cookie'

const TokenKey = 'token'
const role = "roles"

export function getToken() {
  localStorage.getItem(TokenKey)
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  localStorage.setItem(TokenKey, token)
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  localStorage.removeItem(TokenKey)
  return Cookies.remove(TokenKey)
}

export function getAdminRole() {
  return Cookies.get(role)
}

export function setAdminRole(adminType) {
  return Cookies.set(role, adminType)
}

export function removeAdminRole() {
  return Cookies.remove(role)
}