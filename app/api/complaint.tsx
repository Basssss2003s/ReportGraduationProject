import { ComplaintCreate } from '../../types/complaintCreate';
import { IResponse } from '../../other/IResponse';
import { axiosApi } from '../../utils/axios';
import axios from 'axios';


export const complaintCreateApi = async (payload:ComplaintCreate) => {
    try {
      const response = await axiosApi<IResponse>('post', `/auth/add`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
       );
      return response;
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

 export const getComplaintByIdApi = async (emailAddress: string) => {
  try {
    const response = await axiosApi<IResponse[]>('get',`/auth/email?emailAddress=${emailAddress}`);
    return response;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
};
