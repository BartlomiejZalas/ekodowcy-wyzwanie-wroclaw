import { useEffect, useState } from 'react';
import { Warning, WarningsApi } from '../../api/WarningsApi';

enum AsyncStatus {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
}

export const useWarningsFetching = () => {
  const [status, setStatus] = useState(AsyncStatus.LOADING);
  const [warnings, setWarnings] = useState<Warning[]>([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      setStatus(AsyncStatus.LOADING);
      try {
        const warnings = await WarningsApi.getWarnings();
        setWarnings(warnings);
        setStatus(AsyncStatus.LOADED);
      } catch (e) {
        setStatus(AsyncStatus.ERROR);
      }
    };
    fetchMarkers();
  }, []);

  return {
    isLoading: status === AsyncStatus.LOADING,
    isError: status === AsyncStatus.ERROR,
    warnings,
  };
};
