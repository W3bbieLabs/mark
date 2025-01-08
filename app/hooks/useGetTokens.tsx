const useGetTokens = async () => {
  try {
    console.log("Fetching tokens...");
    const response = await fetch("/api/tokens", { cache: "no-store" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching tokens.");
    return [];
  }
};

export default useGetTokens;
