import { useAuth } from '../../context/AuthContext'
import './Profile.css'

function maskEmail(email) {
  if (!email) return ''
  const at = email.indexOf('@')
  if (at <= 4) return email
  return email.slice(0, 4) + '*'.repeat(at - 4) + email.slice(at)
}

export default function Profile() {
  const { user, logout } = useAuth()

  return (
    <div className="profile">
      <p className="profile__label">ACCOUNT</p>
      <h2 className="profile__title">Profile & settings</h2>
      <p className="profile__sub">Photo, username, security.</p>

      <div className="profile__card">
        <div className="profile__avatar" />
        <div className="profile__info">
          <span className="profile__name">{user?.name ?? 'User'}</span>
          <span className="profile__email">{maskEmail(user?.email)}</span>
        </div>
      </div>

      <ul className="profile__sections">
        <li className="profile__row">
          <span>Profile picture</span>
          <button type="button" className="profile__btn">Change</button>
        </li>
        <li className="profile__row">
          <span>Username</span>
          <button type="button" className="profile__btn">Edit</button>
        </li>
        <li className="profile__row">
          <span>Security & password</span>
          <button type="button" className="profile__btn">Manage</button>
        </li>
      </ul>

      <button type="button" className="profile__logout" onClick={logout}>
        Log out
      </button>
    </div>
  )
}
