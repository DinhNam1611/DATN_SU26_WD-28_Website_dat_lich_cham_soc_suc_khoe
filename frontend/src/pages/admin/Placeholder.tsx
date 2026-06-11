import PageHeader from '@/components/common/PageHeader'

interface Props {
  title: string
}

export default function Placeholder({ title }: Props) {
  return (
    <div>
      <PageHeader title={title} description="Chức năng đang được xây dựng." />
      <div className="card grid place-items-center p-12 text-center">
        <p className="text-5xl">🚧</p>
        <p className="mt-3 font-medium text-slate-700">Trang đang được phát triển</p>
        <p className="mt-1 max-w-md text-sm text-slate-500">
          Hãy tạo component cho trang này theo đúng mẫu của{' '}
          <code className="rounded bg-slate-100 px-1">ManageUsers.tsx</code> (bộ lọc +
          bảng dữ liệu + service riêng).
        </p>
      </div>
    </div>
  )
}
