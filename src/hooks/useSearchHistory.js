import {useLocalStorage} from "@/hooks";

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useLocalStorage(
    "search_history",
    []
  );

  const saveSearchHistory = searchQuery => {
    if (!searchQuery) return;
    const history = [...new Set([searchQuery, ...searchHistory])];
    history.splice(10, history.length + 10);
    setSearchHistory(history);
  };

  return {searchHistory, saveSearchHistory};
}

export default useSearchHistory;
