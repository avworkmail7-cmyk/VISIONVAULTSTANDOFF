import { useState } from 'react'
import './Vault.css'

const VAULT_PIN = '1234' // mock

export default function Vault() {
  const [unlocked, setUnlocked] = useState(false)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  const handleUnlock = (e) => {
    e.preventDefault()
    if (pin === VAULT_PIN) {
      setUnlocked(true)
      setPin('')
      setError('')
    } else {
      setError('Wrong PIN')
    }
  }

  const handleLock = () => {
    setUnlocked(false)
    setPin('')
  }

  if (!unlocked) {
    return (
      <div className="vault vault--locked">
        <div className="vault__lock-content">
          <p className="vault__label">PROTECTED</p>
          <h2 className="vault__title">Vault</h2>
          <p className="vault__sub">Videos you hide here are protected by a PIN.</p>
          <form className="vault__form" onSubmit={handleUnlock}>
          <input
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            className="vault__pin"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value.replace(/\D/g, ''))
              setError('')
            }}
            placeholder="Enter PIN"
            autoComplete="off"
          />
          {error && <p className="vault__error">{error}</p>}
          <button type="submit" className="vault__btn">Unlock</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="vault">
      <div className="vault__header">
        <p className="vault__label">VAULT</p>
        <h2 className="vault__title">Hidden videos</h2>
        <button type="button" className="vault__lock" onClick={handleLock}>Lock vault</button>
      </div>
      <p className="vault__sub">Clips stored here are only visible after entering your PIN.</p>
      <ul className="vault__list">
        <li className="vault__card">
          <div className="vault__card-thumb" />
          <span className="vault__card-meta">Saved · 2d ago</span>
        </li>
      </ul>
    </div>
  )
}
