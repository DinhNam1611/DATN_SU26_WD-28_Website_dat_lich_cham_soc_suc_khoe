import { useEffect, useState } from 'react'
import { reviewService } from '@/services/review.service'
import type { ReviewItem } from '@/types'
import { formatDate } from '@/utils/format'
import PageHeader from '@/components/common/PageHeader'
import Badge from '@/components/common/Badge'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import Icon from '@/components/admin/icons'

function StarDisplay({ count }: { count: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon
          key={i}
          name="star"
          className={`h-4 w-4 ${i <= count ? 'text-amber-400' : 'text-slate-200'}`}
        />
      ))}
    </span>
  )
}

export default function ManageReviews() {
  const [reviews, setReviews] = useState<ReviewItem[]>([])
  const [loading, setLoading] = useState(true)
  const [diemFilter, setDiemFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [confirm, setConfirm] = useState<ReviewItem | null>(null)

  useEffect(() => {
    let ignore = false
    setLoading(true)
    reviewService.getAll({ diem: diemFilter, status: statusFilter }).then((data) => {
      if (!ignore) setReviews(data)
    }).finally(() => { if (!ignore) setLoading(false) })
    return () => { ignore = true }
  }, [diemFilter, statusFilter])

  const counts = {
    low: reviews.filter((r) => r.diem <= 2).length,
    total: reviews.length,
    avg: reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.diem, 0) / reviews.length).toFixed(1)
      : '—',
  }

  async function handleToggle() {
    if (!confirm) return
    const id = confirm.id
    setConfirm(null)
    const updated = await reviewService.toggle(id)
    setReviews((prev) => prev.map((r) => (r.id === updated.id ? updated : r)))
  }

  return (
    <div>
      <PageHeader
        title="Đánh giá & phản hồi"
        description="Xem và kiểm duyệt các đánh giá từ bệnh nhân, ẩn nội dung không phù hợp."
      />

      {/* Thẻ tổng quan */}
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div className="card flex items-center gap-4 p-4">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500 text-white">
            <Icon name="star" className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-800">{counts.avg}</p>
            <p className="text-xs text-slate-500">Điểm trung bình</p>
          </div>
        </div>
        <div className="card flex items-center gap-4 p-4">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500 text-white">
            <Icon name="file-text" className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-800">{counts.total}</p>
            <p className="text-xs text-slate-500">Tổng đánh giá</p>
          </div>
        </div>
        <div className="card flex items-center gap-4 p-4">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-red-500 text-white">
            <Icon name="alert-circle" className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-800">{counts.low}</p>
            <p className="text-xs text-slate-500">Đánh giá 1–2 sao</p>
          </div>
        </div>
      </div>

      {/* Bộ lọc */}
      <div className="card mb-4 p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <select className="input" value={diemFilter} onChange={(e) => setDiemFilter(e.target.value)}>
            <option value="">Tất cả điểm</option>
            <option value="1">⭐ 1 sao</option>
            <option value="2">⭐⭐ 2 sao</option>
            <option value="3">⭐⭐⭐ 3 sao</option>
            <option value="4">⭐⭐⭐⭐ 4 sao</option>
            <option value="5">⭐⭐⭐⭐⭐ 5 sao</option>
          </select>
          <select className="input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Tất cả trạng thái</option>
            <option value="visible">Đang hiển thị</option>
            <option value="hidden">Đã ẩn</option>
          </select>
        </div>
      </div>

      {/* Bảng đánh giá */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Bệnh nhân</th>
                <th className="px-4 py-3 font-medium">Bác sĩ</th>
                <th className="px-4 py-3 font-medium">Điểm</th>
                <th className="px-4 py-3 font-medium">Nội dung</th>
                <th className="px-4 py-3 font-medium">Ngày</th>
                <th className="px-4 py-3 font-medium">Trạng thái</th>
                <th className="px-4 py-3 text-right font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-slate-400">Đang tải...</td></tr>
              ) : reviews.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-slate-400">Không tìm thấy đánh giá.</td></tr>
              ) : reviews.map((r) => (
                <tr key={r.id} className={`hover:bg-slate-50 ${r.status === 'hidden' ? 'opacity-60' : ''}`}>
                  <td className="px-4 py-3 font-medium text-slate-800">{r.benh_nhan}</td>
                  <td className="px-4 py-3 text-slate-600">{r.bac_si}</td>
                  <td className="px-4 py-3">
                    <StarDisplay count={r.diem} />
                  </td>
                  <td className="px-4 py-3 max-w-[280px]">
                    <p className={`text-sm ${r.diem <= 2 ? 'text-red-700' : 'text-slate-600'}`}>
                      {r.noi_dung}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(r.ngay_tao)}</td>
                  <td className="px-4 py-3">
                    <Badge color={r.status === 'visible' ? 'green' : 'gray'}>
                      {r.status === 'visible' ? 'Hiển thị' : 'Đã ẩn'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setConfirm(r)}
                      className={`flex items-center gap-1 text-sm font-medium ml-auto ${
                        r.status === 'visible' ? 'text-slate-500 hover:text-red-600' : 'text-brand-600 hover:underline'
                      }`}
                    >
                      {r.status === 'visible'
                        ? <><Icon name="eye-off" className="h-4 w-4" /> Ẩn</>
                        : <><Icon name="eye" className="h-4 w-4" /> Hiện</>}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {!loading && (
        <p className="mt-3 text-sm text-slate-500">Tổng cộng {reviews.length} đánh giá</p>
      )}

      <ConfirmDialog
        open={!!confirm}
        title={confirm?.status === 'visible' ? 'Ẩn đánh giá' : 'Hiện đánh giá'}
        message={`Bạn có chắc muốn ${confirm?.status === 'visible' ? 'ẩn' : 'hiện'} đánh giá này?`}
        confirmText={confirm?.status === 'visible' ? 'Ẩn' : 'Hiện'}
        danger={confirm?.status === 'visible'}
        onConfirm={handleToggle}
        onCancel={() => setConfirm(null)}
      />
    </div>
  )
}
