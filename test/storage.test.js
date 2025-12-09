import { describe, it, expect, beforeEach } from 'vitest'
import * as storage from '../src/lib/storage'

beforeEach(() => {
  localStorage.clear()
})

describe('storage module', () => {
  it('saves and retrieves entries', () => {
    const entry = { score: 4, note: 'Test', createdAt: new Date().toISOString() }
    const saved = storage.saveEntry(entry)
    expect(typeof saved.id).toBe('number')
    const all = storage.getEntries()
    expect(all.length).toBe(1)
    expect(all[0].note).toBe('Test')
  })

  it('updates an entry', () => {
    const e = storage.saveEntry({ score: 3, note: 'a', createdAt: new Date().toISOString() })
    const updated = storage.updateEntry(e.id, { score: 5, note: 'b' })
    const all = storage.getEntries()
    const found = all.find(x => x.id === e.id)
    expect(found.score).toBe(5)
    expect(found.note).toBe('b')
  })

  it('deletes an entry', () => {
    const e1 = storage.saveEntry({ score: 2, note: 'x', createdAt: new Date().toISOString() })
    const e2 = storage.saveEntry({ score: 3, note: 'y', createdAt: new Date().toISOString() })
    storage.deleteEntry(e1.id)
    const all = storage.getEntries()
    expect(all.length).toBe(1)
    expect(all[0].id).toBe(e2.id)
  })

  it('clearAll removes storage key', () => {
    storage.saveEntry({ score:1, note:'n', createdAt: new Date().toISOString() })
    storage.clearAll()
    expect(storage.getEntries().length).toBe(0)
  })
})
