export const STORAGE_KEY = 'mmt_entries_v1'

function readRaw() {
  const raw = localStorage.getItem(STORAGE_KEY)
  try {
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeRaw(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

function makeId() {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID()
    }
  } catch (e) {
  }
  return `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`
}

export function getEntries() {
  return readRaw()
}

export function saveEntry(entry) {
  const entries = readRaw()
  const id = makeId()
  const newEntry = { id, ...entry }
  entries.push(newEntry)
  writeRaw(entries)
  return newEntry
}

export function updateEntry(id, updated) {
  const entries = readRaw().map(e => (e.id === id ? { ...e, ...updated } : e))
  writeRaw(entries)
  return entries.find(e => e.id === id) || null
}

export function deleteEntry(id) {
  const entries = readRaw().filter(e => e.id !== id)
  writeRaw(entries)
  return true
}

export function clearAll() {
  localStorage.removeItem(STORAGE_KEY)
}
