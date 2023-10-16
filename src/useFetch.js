import { useEffect, useState } from "react";

export function useFetch(url, options = {}) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setData(undefined); // We set these parameters to reset to default values.
    setIsLoading(true);
    setIsError(false);

    const controller = new AbortController();

    fetch(url, { signal: controller.signal, ...options })
      .then((res) => {
        if (res.ok) return res.json();
        else throw err;
      })
      .then(setData)
      .catch((e) => {
        if (e.name === "AbortError") return;
        setIsError(true);
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [url]); // Each time the url changes, we call the fetch.

  return { data, isLoading, isError };
}
