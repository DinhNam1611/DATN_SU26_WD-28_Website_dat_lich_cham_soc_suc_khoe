// Kiểu dữ liệu dùng chung toàn project.
// Khớp với cấu trúc bảng trong VitaFamily_Database.sql.

export type Role = 'user' | 'doctor' | 'admin'
export type UserStatus = 'active' | 'locked'
export type DoctorApproval = 'pending' | 'approved' | 'rejected' | 'suspended'
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded'

export interface User {
  id: number
  email: string
  mat_khau?: string
  ho_ten: string
  so_dien_thoai?: string | null
  anh_dai_dien?: string | null
  role: Role
  status: UserStatus
  ngay_tao: string
  ngay_cap_nhat?: string
}

export interface Doctor {
  id: number
  user_id: number
  tieu_su?: string
  bang_cap?: string
  kinh_nghiem?: string
  so_nam_kinh_nghiem: number
  phi_tu_van: number
  trang_thai_duyet: DoctorApproval
  ly_do_tu_choi?: string | null
  so_lan_nop: number
  la_hien: boolean
  diem_danh_gia: number
  tong_danh_gia: number
  ngay_tao: string
}

export interface Hospital {
  id: number
  ten: string
  dia_chi?: string
  so_dien_thoai?: string
  email?: string
  gio_lam_viec?: string
  mo_ta?: string
  status: 'active' | 'hidden'
  ngay_tao: string
}

export interface Specialty {
  id: number
  ten: string
  mo_ta?: string
  icon_url?: string
  slug: string
  thu_tu: number
  status: 'active' | 'hidden'
}

export interface Appointment {
  id: number
  user_id: number
  member_id?: number | null
  doctor_id: number
  hospital_id: number
  slot_id: number
  loai_kham: 'clinic' | 'home' | 'video'
  ngay_kham: string
  gio_kham: string
  ly_do_kham?: string
  status: AppointmentStatus
  payment_status: PaymentStatus
  gia_kham: number
  ly_do_huy?: string | null
  ngay_tao: string
}

export interface Member {
  id: number
  family_id: number
  ho_ten: string
  ngay_sinh: string
  gioi_tinh: 'nam' | 'nu' | 'khac'
  nhom_mau?: 'A' | 'B' | 'AB' | 'O' | null
  di_ung?: string | null
  benh_nen?: string | null
  la_chu_ho: boolean
  ngay_xoa?: string | null
  ngay_tao: string
}

// ViewModel kết hợp thông tin bác sĩ + user (dùng cho trang danh sách)
export interface DoctorProfile {
  id: number
  user_id: number
  ho_ten: string
  email: string
  chuyen_khoa: string
  so_nam_kinh_nghiem: number
  phi_tu_van: number
  trang_thai_duyet: DoctorApproval
  diem_danh_gia: number
  so_danh_gia: number
  bang_cap: string
  ly_do_tu_choi?: string | null
  ngay_tao: string
}

export interface HospitalItem {
  id: number
  ten: string
  dia_chi: string
  so_dien_thoai: string
  gio_lam_viec: string
  status: 'active' | 'hidden'
  ngay_tao: string
}

export interface SpecialtyItem {
  id: number
  ten: string
  mo_ta: string
  icon: string
  thu_tu: number
  status: 'active' | 'hidden'
}

export type ServiceType = 'clinic' | 'home' | 'video'

export interface ServiceItem {
  id: number
  ten: string
  loai: ServiceType
  gia_co_ban: number
  mo_ta: string
  thoi_gian_phut: number
  status: 'active' | 'hidden'
}

// ViewModel lịch hẹn (kết hợp bệnh nhân + bác sĩ)
export interface AppointmentItem {
  id: number
  benh_nhan: string
  bac_si: string
  chuyen_khoa: string
  ngay_kham: string
  gio_kham: string
  loai_kham: 'clinic' | 'home' | 'video'
  status: AppointmentStatus
  payment_status: PaymentStatus
  gia_kham: number
}

export interface ReviewItem {
  id: number
  benh_nhan: string
  bac_si: string
  diem: number
  noi_dung: string
  status: 'visible' | 'hidden'
  ngay_tao: string
}

export type NotificationTarget = 'all' | 'user' | 'doctor'

export interface NotificationItem {
  id: number
  tieu_de: string
  noi_dung: string
  doi_tuong: NotificationTarget
  so_nguoi_nhan: number
  ngay_gui: string
}

export type PaymentMethod = 'momo' | 'vnpay' | 'cash' | 'bank'

export interface PaymentItem {
  id: number
  ma_giao_dich: string
  benh_nhan: string
  bac_si: string
  so_tien: number
  phuong_thuc: PaymentMethod
  status: PaymentStatus
  ngay_tao: string
}

// Kiểu cho API response chuẩn { success, message, data }
export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data: T
}
