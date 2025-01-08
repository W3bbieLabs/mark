const useGetTokens = async () => {
  try {
    console.log("Fetching tokens...");
    const response = await fetch("/api/tokens", { next: { revalidate: 0 } });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching tokens.");
    return [];
  }
};

export default useGetTokens;
