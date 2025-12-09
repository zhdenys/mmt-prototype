import React, { useEffect, useState } from 'react'
import MoodForm from './components/MoodForm'
import History from './components/History'
import * as storage from './lib/storage'

export default function App() {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    setEntries(storage.getEntries())
  }, [])

  const onAdd = (entry) => {
    storage.saveEntry(entry)
    setEntries(storage.getEntries())
  }

  const onDelete = (id) => {
    storage.deleteEntry(id)
    setEntries(storage.getEntries())
  }

  const onUpdate = (id, updated) => {
    storage.updateEntry(id, updated)
    setEntries(storage.getEntries())
  }

  return (
    <div className="app">
      <h1>Mindful Mood Tracker — Prototype</h1>
      <div className="columns">
        <div className="left">
          <MoodForm onAdd={onAdd} />
        </div>
        <div className="right">
          <History entries={entries} onDelete={onDelete} onUpdate={onUpdate} />
        </div>
      </div>
    </div>
  )
}
