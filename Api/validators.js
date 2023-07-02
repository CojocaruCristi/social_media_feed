export function validateAxiosResponse(response) {
    if (response?.status >= 200 && response?.status < 300) {
      return response.data;
    } else {
      const error = new Error(JSON.stringify(response));
      error.response = response;
      throw error;
    }
}