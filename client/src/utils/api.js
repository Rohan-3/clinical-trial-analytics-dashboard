const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

const getAuthToken = () => "dummy-jwt-token";

export const api = async (uri, options = {}, base = BASE_URL) => {
  try {
    const headers = {
      ...DEFAULT_HEADERS,
      ...(options.headers || {}),
      ...(options.tokenRequired && {
        Authorization: `Bearer ${getAuthToken()}`,
      }),
    };

    const response = await fetch(base + uri, {
      method: options.method || "GET",
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Request failed: ${response.status}`
      );
    }

    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error("API error:", error.message);
    throw error;
  }
};