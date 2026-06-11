import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 text-center">
      <p className="text-6xl font-bold text-brand-500">404</p>
      <p className="text-lg text-slate-600">Không tìm thấy trang bạn yêu cầu.</p>
      <Link to="/" className="btn-primary">
        Về trang chủ
      </Link>
    </div>
  )
}
