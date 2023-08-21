import { Breadcrumbs, Typography, styled } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

const BreadcrumbStyled = styled(Breadcrumbs)(({ theme }) => ({
  a: {
    color: theme.palette.text.primary
  },
  '& .MuiTypography-root': {
    color: `${theme.palette.primary.main} !important`
  }
}))
interface Breadcrumbs {
  title: string
  url: string
}

const Breadcrumb = () => {
  const route = useRouter()
  const listPath = route.route.split('/').filter(path => path.length > 0)

  const convertBreadcrumb: Record<string, Breadcrumbs> = {
    '[slug]': {
      title: 'Dự án',
      url: `/projects/${route.query.slug}/detail`
    },
    'manage-member': {
      title: 'Quản lý thành viên',
      url: ''
    },

    'manage-form': {
      title: 'Chỉnh sửa biểu mẫu',
      url: ''
    },
    update: {
      title: 'Chỉnh sửa',
      url: ''
    },
    insert: {
      title: 'Thêm mới',
      url: ''
    },
    detail: {
      title: 'Chi tiết',
      url: ''
    },
    record: {
      title: 'Thu thập',
      url: `/projects/${route.query.slug}/record/detail`
    }
  }

  const listBreadcrumb: Breadcrumbs[] = []
  listPath?.forEach(item => {
    for (const key in convertBreadcrumb) {
      if (item == key) {
        listBreadcrumb.push({ title: convertBreadcrumb[key].title, url: convertBreadcrumb[key].url })
      }
    }
  })
  const breadcrumbsLink = listBreadcrumb.slice(0, listBreadcrumb.length - 1)
  const breadcrumbsActive = listBreadcrumb[listBreadcrumb.length - 1]

  return (
    <BreadcrumbStyled aria-label='breadcrumb'>
      <Link href='/'>Dashboard</Link>
      {breadcrumbsLink?.map((breadcrumb, index) => (
        <Link key={index} href={breadcrumb.url}>
          {breadcrumb.title}
        </Link>
      ))}
      <Typography>{breadcrumbsActive.title}</Typography>
    </BreadcrumbStyled>
  )
}

export default Breadcrumb
