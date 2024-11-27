export default async function fetchData(urls) {
  try {
    const fetchPromises = urls.map(async (url) => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error fetching ${url}: ${response.statusText}`);
      }

      // Parse and return the JSON data
      return await response.json();
    });

    const responses = await Promise.all(fetchPromises).then((result) =>
      result.map((result) => result.images.sm)
    );

    return responses;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
