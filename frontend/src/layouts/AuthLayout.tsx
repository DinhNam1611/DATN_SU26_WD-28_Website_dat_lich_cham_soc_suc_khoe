import { Outlet } from 'react-router-dom'

// Bố cục cho trang đăng nhập / đăng ký: căn giữa, nền nhẹ.
export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mb-2 inline-grid h-12 w-12 place-items-center rounded-xl bg-brand-500 text-xl font-bold text-white">
            V
          </div>
          <h1 className="text-2xl font-bold text-slate-800">VitaFamily</h1>
          <p className="text-sm text-slate-500">Chăm sóc sức khỏe gia đình</p>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
