import axios from "axios";

interface Room {
  roomData: {
    fetchedRooms: any;
  };
  handleSuccess: (data: any) => void;
  handleError: (error: any) => void;
}

const fetchAllRooms = async function (this: Room) {
  try {
    const response = await axios.get("http://localhost:3000/rooms", {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:5173/",
      },
    });
    this.roomData.fetchedRooms = response.data;
    this.handleSuccess(response.data);
  } catch (error) {
    this.handleError(error);
  }
};

const fetchRecommendedRooms = async function (this: Room) {
  try {
    const response = await axios.get(
      "http://localhost:3000/rooms/recommended",
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:5173/",
        },
      }
    );
    this.roomData.fetchedRooms = response.data;
    this.handleSuccess(response.data);
  } catch (error) {
    this.handleError(error);
  }
};

export { fetchAllRooms };
