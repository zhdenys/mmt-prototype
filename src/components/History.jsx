import React from 'react'

export default function History({ entries = [], onDelete, onUpdate }) {
  if (entries.length === 0) return <div><h3>Історія</h3><p>Записів поки що немає.</p></div>

  return (
    <div>
      <h3>Історія</h3>
      <ul className="history-list">
        {entries.slice().reverse().map((e) => (
          <li key={e.id} className="entry">
            <div>
              <strong>{e.score}/5</strong> — <small>{new Date(e.createdAt).toLocaleString()}</small>
            </div>
            <div>{e.note}</div>
            <div className="entry-actions">
              <button onClick={() => onDelete(e.id)}>Видалити</button>
              {/* Просте оновлення: +1 бал (демо) */}
              <button onClick={() => onUpdate(e.id, { score: Math.min(5, e.score + 1) })}>
                +1
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
