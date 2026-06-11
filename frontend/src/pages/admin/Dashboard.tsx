import { Link } from 'react-router-dom'
import PageHeader from '@/components/common/PageHeader'
import Icon from '@/components/admin/icons'

// Trang Tổng quan — hiện dùng số liệu fix cứng. Sau này thay bằng service thống kê.
const stats = [
  { label: 'Tổng người dùng', value: '1.248', icon: 'users', color: 'bg-blue-500' },
  { label: 'Bác sĩ đang hoạt động', value: '86', icon: 'doctor', color: 'bg-brand-500' },
  { label: 'Lịch hẹn hôm nay', value: '34', icon: 'calendar', color: 'bg-purple-500' },
  { label: 'Doanh thu tháng', value: '52.4M ₫', icon: 'payment', color: 'bg-amber-500' },
]

const pending = [
  { label: 'Hồ sơ bác sĩ chờ duyệt', value: 5, to: '/admin/doctors' },
  { label: 'Yêu cầu hoàn tiền chờ xử lý', value: 3, to: '/admin/payments' },
  { label: 'Đánh giá 1–2 sao cần xem', value: 2, to: '/admin/reviews' },
]

export default function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Tổng quan"
        description="Bức tranh nhanh về hoạt động của hệ thống VitaFamily."
      />

      {/* Thẻ số liệu */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card flex items-center gap-4 p-5">
            <div className={`grid h-12 w-12 place-items-center rounded-xl text-white ${s.color}`}>
              <Icon name={s.icon} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{s.value}</p>
              <p className="text-sm text-slate-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Việc cần xử lý */}
      <div className="mt-6 card p-5">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Cần xử lý</h2>
        <ul className="divide-y divide-slate-100">
          {pending.map((p) => (
            <li key={p.label}>
              <Link
                to={p.to}
                className="flex items-center justify-between py-3 hover:text-brand-600"
              >
                <span className="text-sm text-slate-600">{p.label}</span>
                <span className="grid h-7 min-w-7 place-items-center rounded-full bg-red-100 px-2 text-sm font-semibold text-red-600">
                  {p.value}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-xs text-slate-400">
        * Số liệu hiện đang là dữ liệu mẫu (fix cứng). Sẽ thay bằng dữ liệu thật khi
        kết nối database.
      </p>
    </div>
  )
}
