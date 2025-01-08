const useGetTokens = async () => {
  try {
    console.log("Fetching tokens...");
    const timestamp = Date.now();
    const response = await fetch(`/api/tokens?time=${timestamp}`, {
      next: { revalidate: 30 },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching tokens.");
    return [];
  }
};

export default useGetTokens;
