import axios from "axios";

export const getVideos = () => {
	return axios.get().then(({ data }) => {
		return data;
	});
};
