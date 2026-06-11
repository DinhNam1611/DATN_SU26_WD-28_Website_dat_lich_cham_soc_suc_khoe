import { Link } from 'react-router-dom'

// Trang chủ phía người dùng — bản phác thảo. Phát triển khi làm tới giao diện bệnh nhân.
export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
        Chăm sóc sức khỏe cả gia đình
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-slate-500">
        Đặt lịch khám online, quản lý hồ sơ y tế và nhắc uống thuốc cho mọi thành viên
        trong gia đình — chỉ với một tài khoản.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link to="/login" className="btn-primary">
          Bắt đầu ngay
        </Link>
        <a href="#" className="btn-secondary">
          Tìm hiểu thêm
        </a>
      </div>

      <p className="mt-10 text-sm text-slate-400">
        (Giao diện người dùng sẽ được phát triển sau — hiện đang tập trung trang Admin.)
      </p>
    </div>
  )
}
