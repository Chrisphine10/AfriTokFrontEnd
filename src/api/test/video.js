const Videos = async () => {
    const API_KEY = "563492ad6f91700001000001562a8e890c124dc78e84162aaa8f119c"
    const API_URL = "https://api.pexels.com/videos/search?query=fire&orientation=portrait&size=small&per_page=1"

    try {
      const response = await fetch(API_URL,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
                }
            });
      const { videos } = await response.json();
      return videos;
    } catch (error) {
      console.error(error);
    }
};
export default Videos;