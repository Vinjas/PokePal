import axios from 'axios';

const API_URL = 'https://hatscripts.github.io/circle-flags/flags';

export const getCircleFlagUri = async (country: string) => {
  try {
    const response = await axios.get(`${API_URL}/${country}.svg`);

    return response.data;
  } catch (error) {
    throw error;
  }
};
