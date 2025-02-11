import { LoadingSpinner } from '@components'
import { useQuery } from '@tanstack/react-query'
import './App.styles.scss'

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos'),
  })

  return (
    <div className="App">
      <LoadingSpinner
        className="App_LoadingSpinner"
        show={!isLoading}
        text="Loading data..."
      />
    </div>
  )
}

export default App
