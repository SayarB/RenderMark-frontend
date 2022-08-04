import { useRouter } from 'next/router'
export default function TemplatePage () {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <h1>ID = {id}</h1>
    </div>
  )
}
