import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import type { Role } from '@/types'

interface Props {
  children: React.ReactNode
  roles?: Role[]
}

// Bọc các route cần đăng nhập. Giới hạn theo vai trò qua prop `roles`.
//   <ProtectedRoute roles={['admin']}> ... </ProtectedRoute>
export default function ProtectedRoute({ children, roles }: Props) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-500">
        Đang tải...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (roles && !roles.includes(user.role)) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <p className="text-lg font-semibold">Không có quyền truy cập</p>
        <p className="text-slate-500">Trang này dành cho: {roles.join(', ')}</p>
      </div>
    )
  }

  return <>{children}</>
}
