const API_KEY = "563492ad6f91700001000001562a8e890c124dc78e84162aaa8f119c"
const API_URL = "https://api.pexels.com/v1/search?query=art&orientation=portrait&size=small&per_page=20"

const Images = async () => {
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
      const { photos } = await response.json();
      return photos;
    } catch (error) {
      console.error(error);
    }
};

export default Images;