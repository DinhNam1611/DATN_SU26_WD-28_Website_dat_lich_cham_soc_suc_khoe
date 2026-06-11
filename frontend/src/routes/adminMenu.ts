// Cấu hình menu Admin — DÙNG CHUNG cho Sidebar và khai báo Route.
// Thêm/bớt trang Admin chỉ cần sửa danh sách này (và tạo component tương ứng).
// 8 mục khớp 8 chức năng Admin (C1–C8) trong đặc tả.

export const adminMenu = [
  { path: '/admin', label: 'Tổng quan', icon: 'dashboard', end: true },
  { path: '/admin/users', label: 'Quản lý người dùng', icon: 'users' }, // C1
  { path: '/admin/doctors', label: 'Duyệt hồ sơ bác sĩ', icon: 'doctor' }, // C2
  { path: '/admin/hospitals', label: 'Bệnh viện & Chuyên khoa', icon: 'hospital' }, // C3
  { path: '/admin/services', label: 'Quản lý dịch vụ', icon: 'service' }, // C4
  { path: '/admin/appointments', label: 'Lịch hẹn hệ thống', icon: 'calendar' }, // C5
  { path: '/admin/reviews', label: 'Đánh giá & phản hồi', icon: 'star' }, // C6
  { path: '/admin/notifications', label: 'Thông báo hệ thống', icon: 'bell' }, // C7
  { path: '/admin/payments', label: 'Quản lý thanh toán', icon: 'payment' }, // C8
]
