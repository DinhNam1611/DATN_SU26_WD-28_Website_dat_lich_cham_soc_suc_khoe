import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import Icon from './icons'

interface Props {
  onToggleSidebar: () => void
}

export default function AdminHeader({ onToggleSidebar }: Props) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
      <button
        onClick={onToggleSidebar}
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        aria-label="Mở menu"
      >
        <Icon name="menu" />
      </button>

      <div className="hidden text-sm text-slate-500 lg:block">
        Trang quản trị hệ thống
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-800">
            {user?.ho_ten || 'Admin'}
          </p>
          <p className="text-xs text-slate-500">{user?.email}</p>
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 font-semibold text-brand-700">
          {(user?.ho_ten || 'A').charAt(0)}
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg p-2 text-slate-600 hover:bg-red-50 hover:text-red-600"
          title="Đăng xuất"
        >
          <Icon name="logout" />
        </button>
      </div>
    </header>
  )
}
