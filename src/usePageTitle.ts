import { useEffect } from 'react'

const SUFFIX = 'INSCH Aps Team & Business Coaching'

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | ${SUFFIX}`
  }, [title])
}
