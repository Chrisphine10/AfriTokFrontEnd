const API_KEY = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYzNjAyNzEwNn0.6Gt5Pn3Y-86Tyh--S6vk_G4DgWSLkafUvkVgjFI4EkQrM6fOifjV3YhYBXDXBBnSq32ExjFdNM8-bOuphkIT7Q"
const API_URL = "http://afritok.co:8080/api/v1/videos"

const Videos = async () => {

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
      const videos = await response.json();
      return videos;
    } catch (error) {
      console.error(error);
    }
};
export default Videos;