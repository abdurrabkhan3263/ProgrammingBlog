async function apiHandling(num, tag) {
  let api = await fetch(
    `https://dev.to/api/articles?username=nataliedeweerd&tag=${tag}&page=${num}`
  );
  let response = await api.json();
  if (response.length !== 0) {
    return response;
  }
}

export default apiHandling;
