import { useEffect, useMemo, useState } from 'react'
import { mockSavedVideos } from '../../data/mockAppData'
import './Library.css'

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function formatMonthKey(key) {
  if (!key) return 'Other'
  const [y, m] = key.split('-').map(Number)
  const name = MONTH_NAMES[m - 1] ?? ''
  return `${name} ${y}`
}

export default function Library() {
  const [albums, setAlbums] = useState(() => [
    { id: 'library', name: 'Library', type: 'library', count: mockSavedVideos.length },
    { id: 'favorites', name: 'Favorites', type: 'favorites', count: 0 },
  ])
  const [activeAlbumId, setActiveAlbumId] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuMode, setMenuMode] = useState('main') // 'main' | 'add' | 'delete'
  const [newAlbumName, setNewAlbumName] = useState('')

  const byMonth = useMemo(() => {
    const map = new Map()
    for (const v of mockSavedVideos) {
      const key = v.monthKey || 'other'
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(v)
    }
    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]))
  }, [])

  const activeAlbum = albums.find((a) => a.id === activeAlbumId) || null

  const customAlbums = albums.filter((a) => a.type === 'custom')

  useEffect(() => {
    const handleNavRepeat = (event) => {
      if (event?.detail?.route === 'library') {
        setActiveAlbumId(null)
      }
    }
    window.addEventListener('lifeproof-nav-repeat', handleNavRepeat)
    return () => window.removeEventListener('lifeproof-nav-repeat', handleNavRepeat)
  }, [])

  const handleAddAlbum = (e) => {
    e?.preventDefault()
    const name = newAlbumName.trim()
    if (!name) return
    const id = `custom-${Date.now()}`
    setAlbums((prev) => [...prev, { id, name, type: 'custom', count: 0 }])
    setNewAlbumName('')
    setMenuMode('main')
    setMenuOpen(false)
  }

  const handleDeleteAlbum = (id) => {
    setAlbums((prev) => prev.filter((a) => a.id !== id))
    if (activeAlbumId === id) setActiveAlbumId(null)
    setMenuMode('main')
    setMenuOpen(false)
  }

  const closeMenu = () => {
    setMenuOpen(false)
    setMenuMode('main')
    setNewAlbumName('')
  }

  const renderAlbumsView = () => (
    <div className={`library ${!activeAlbumId && customAlbums.length === 0 ? 'library--no-scroll' : ''}`}>
      <div className="library__header-row">
        <div>
          <p className="library__label">LIBRARY</p>
          <h2 className="library__title">Albums</h2>
          <p className="library__sub">Squares that act like folders for your recordings.</p>
        </div>
        <div className="library__header-right">
          <button
            type="button"
            className="library__plus"
            onClick={() => { setMenuOpen(true); setMenuMode('main'); }}
            aria-label="Folder options"
          >
            +
          </button>
          {menuOpen && menuMode !== 'add' && (
            <div className="library__popup">
              {menuMode === 'main' && (
                <ul className="library__popup-list">
                  <li>
                    <button type="button" className="library__popup-item" onClick={() => setMenuMode('add')}>
                      Add folder
                    </button>
                  </li>
                  <li>
                    <button type="button" className="library__popup-item" onClick={() => setMenuMode('delete')}>
                      Delete folder
                    </button>
                  </li>
                </ul>
              )}
              {menuMode === 'delete' && (
                <div className="library__popup-delete">
                  <button type="button" className="library__popup-back" onClick={() => setMenuMode('main')}>
                    ← Back
                  </button>
                  {customAlbums.length === 0 ? (
                    <p className="library__popup-empty">No custom folders to delete.</p>
                  ) : (
                    <ul className="library__popup-list">
                      {customAlbums.map((album) => (
                        <li key={album.id} className="library__popup-delete-row">
                          <span className="library__popup-delete-name">{album.name}</span>
                          <button
                            type="button"
                            className="library__popup-delete-btn"
                            onClick={() => handleDeleteAlbum(album.id)}
                            aria-label={`Delete ${album.name}`}
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="library__albums-grid">
        {albums.map((album) => (
          <button
            key={album.id}
            type="button"
            className={`library__album-card library__album-card--${album.type}`}
            onClick={() => setActiveAlbumId(album.id)}
          >
            <div className="library__album-thumb" />
            <div className="library__album-meta">
              <span className="library__album-name">{album.name}</span>
              <span className="library__album-count">
                {album.count} {album.count === 1 ? 'clip' : 'clips'}
              </span>
            </div>
          </button>
        ))}

        {Array.from({ length: 4 }).map((_, idx) => (
          <button
            key={`placeholder-${idx}`}
            type="button"
            className="library__album-card library__album-card--placeholder"
            onClick={() => { setMenuOpen(true); setMenuMode('add'); }}
          >
            <div className="library__album-thumb">
              <span className="library__album-placeholder-plus">+</span>
            </div>
            <div className="library__album-meta">
              <span className="library__album-name">Empty</span>
              <span className="library__album-count">Add folder</span>
            </div>
          </button>
        ))}
      </div>

      {menuOpen && (
        <button type="button" className="library__popup-overlay" aria-label="Close" onClick={closeMenu} />
      )}

      {menuOpen && menuMode === 'add' && (
        <div className="library__modal">
          <div className="library__modal-card">
            <p className="library__modal-title">New folder</p>
            <form onSubmit={handleAddAlbum} className="library__modal-form">
              <input
                type="text"
                className="library__new-album-input"
                placeholder="Folder name"
                value={newAlbumName}
                onChange={(e) => setNewAlbumName(e.target.value)}
                autoFocus
              />
              <div className="library__modal-actions">
                <button
                  type="button"
                  className="library__modal-cancel"
                  onClick={closeMenu}
                >
                  Cancel
                </button>
                <button type="submit" className="library__new-album-btn">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )

  const renderAlbumDetail = () => {
    if (!activeAlbum) return null

    const isLibrary = activeAlbum.type === 'library'

    return (
      <div className="library">
        <button
          type="button"
          className="library__back"
          onClick={() => setActiveAlbumId(null)}
        >
          ← Albums
        </button>

        <p className="library__label">{isLibrary ? 'SAVED' : 'FOLDER'}</p>
        <h2 className="library__title">
          {isLibrary ? 'All recordings' : activeAlbum.name}
        </h2>
        <p className="library__sub">
          {isLibrary ? 'Your lifetime clips' : 'A custom folder for your recordings.'}
        </p>

        {isLibrary ? (
          byMonth.map(([monthKey, videos]) => (
            <div key={monthKey} className="library__month">
              <p className="library__month-title">{formatMonthKey(monthKey)}</p>
              <ul className="library__list">
                {videos.map((v) => (
                  <li key={v.id} className="library__card">
                    <div className="library__card-thumb" />
                    <div className="library__card-info">
                      <span className="library__card-title">{v.title}</span>
                      <span className="library__card-meta">
                        {v.time} · {v.duration}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="library__empty">
            No recordings in this folder yet.
          </p>
        )}
      </div>
    )
  }

  return activeAlbum ? renderAlbumDetail() : renderAlbumsView()
}
