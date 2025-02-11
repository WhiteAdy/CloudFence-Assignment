import { Data } from '@api'

const fetchData = async (): Promise<Data> => {
  const response = await fetch(
    'https://api.jsonbin.io/v3/b/679a6218acd3cb34a8d4ffe6/latest',
  )

  if (!response.ok) {
    throw new Error(`Error fetching VPC data. Status code: ${response.status}`)
  }

  const data = await response.json()
  return data
}

export { fetchData }
