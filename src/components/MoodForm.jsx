import React, { useState } from 'react'

export default function MoodForm({ onAdd }) {
  const [score, setScore] = useState(4)
  const [note, setNote] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const entry = {
      score: Number(score),
      note: note.slice(0, 500),
      createdAt: new Date().toISOString(),
    }
    onAdd(entry)
    setNote('')
    setScore(4)
  }

  return (
    <form onSubmit={handleSubmit} className="mood-form">
      <label>
        Рівень настрою:
        <select value={score} onChange={(e) => setScore(e.target.value)}>
          <option value={1}>1 — Дуже погано</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5 — Чудово</option>
        </select>
      </label>

      <label>
        Нотатка (необов'язково, до 500 символів):
        <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={500} />
      </label>

      <button type="submit">Зберегти настрій</button>
    </form>
  )
}
