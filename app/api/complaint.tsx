import axios from 'axios';
import { ComplaintCreate } from '../../types/complaintCreate';

export const complaintCreateApi = async (payload:ComplaintCreate) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/complaint/add`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );
      return response?.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        console.error("Axios error details:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
      throw error;
    }
  }