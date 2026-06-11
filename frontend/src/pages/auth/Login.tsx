import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const registered = (location.state as { registered?: boolean })?.registered

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login({ email, password })
      const from = (location.state as { from?: { pathname?: string } })?.from?.pathname
      if (user.role === 'admin') {
        navigate(from?.startsWith('/admin') ? from : '/admin', { replace: true })
      } else {
        navigate(from || '/', { replace: true })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card p-6">
      <h2 className="mb-1 text-xl font-bold text-slate-800">Đăng nhập</h2>
      <p className="mb-5 text-sm text-slate-500">
        Đăng nhập để vào hệ thống VitaFamily.
      </p>

      {registered && (
        <div className="mb-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
          Đăng ký thành công! Vui lòng đăng nhập.
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            className="input"
            placeholder="admin@vitafamily.vn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Mật khẩu</label>
          <input
            type="password"
            className="input"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Đang xử lý...' : 'Đăng nhập'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-500">
        Chưa có tài khoản?{' '}
        <Link to="/register" className="font-medium text-brand-600 hover:underline">
          Đăng ký ngay
        </Link>
      </p>

      {/* Gợi ý tài khoản demo trong giai đoạn làm giao diện */}
      <div className="mt-5 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
        <p className="font-medium text-slate-600">Tài khoản demo:</p>
        <p>admin@vitafamily.vn / 123456 (Admin)</p>
        <p>doctor@vitafamily.vn / 123456 (Bác sĩ)</p>
        <p>user@vitafamily.vn / 123456 (Bệnh nhân)</p>
      </div>
    </div>
  )
}
