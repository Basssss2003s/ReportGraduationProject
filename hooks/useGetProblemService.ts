import { useQuery } from "@tanstack/react-query"
import { getComplaintByIdApi } from "../app/api/complaint";
import { IResponse } from "../other/IResponse";
import { getComplaintById } from "./queries/QueriesKey";

export const useGetComplaintById = (emailAddress: string | undefined) => {
    return useQuery<IResponse[], { message: string }>({
        queryKey: [getComplaintById, emailAddress], // ✅ ควรใช้ string เป็น queryKey
        queryFn: async () => {
            if (!emailAddress) {
                throw new Error('Invalid emailAddress');
            }
            return await getComplaintByIdApi(emailAddress);
        },
        enabled: !!emailAddress, // ✅ ป้องกันการเรียก API ถ้าไม่มี emailAddress
    });
};

