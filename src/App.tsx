import { ErrorMessage, LoadingSpinner } from '@components';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@api';
import './App.styles.scss';
import { useEffect } from 'react';

function App() {
  const {
    data: dataRecords,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchData,
    select: (data) => data.record.data,
  });

  useEffect(() => {
    if (dataRecords) {
      console.log('dataRecords: ', dataRecords);
    }
  }, [dataRecords]);

  return (
    <div className="App">
      <LoadingSpinner
        className="App_LoadingSpinner"
        show={isLoading}
        text="Loading data..."
      />
      {error && <ErrorMessage text={error.message} />}
      {!dataRecords?.length ? (
        <div className="App_Error">No data was found.</div>
      ) : null}
    </div>
  );
}

export default App;
