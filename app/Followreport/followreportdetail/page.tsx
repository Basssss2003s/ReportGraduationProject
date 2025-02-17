"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PersonIcon from '@mui/icons-material/Person';
import { useSession } from "../../../utils/useSession";
import { useAuth } from "../../../utils/auth";
import Navbar from "../../navbar/page";
import ApplicantTracking from "../../../navbar/Breadcrump";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import Link from "next/link";
import { useGetComplaintById } from "../../../hooks/useGetComplaintById";
import useDecryptData from "../../../hooks/Encryption/Decryption";
import { GetComplaint } from "../../../types/complaintCreate";
const MainPage: React.FC = () => {
  const { session } = useSession();
  const { logout } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [decryptedId, setDecryptedId] = useState<string | null>(null);
  const [urlId, setUrlId] = useState<string | null>(null);
  const { data: dataById, isSuccess } = useGetComplaintById(decryptedId?.toString());
  const { mutate: decrypt } = useDecryptData();

  //   const [formData, setFormData] = useState<GetComplaint>({
  //     id: dataById?.data.id || null,
  //     firstName: dataById?.data.firstName || null,
  //     lastName: dataById?.data.lastName || null,
  //     emailAddress: dataById?.data.lastName || null,
  //     topicOfComplaint:  dataById?.data.lastName || null,
  //     detailsOfTheTopic:  dataById?.data.lastName || null,
  //     problemDetail:  dataById?.data.lastName || null,
  //     telephone: dataById?.data.lastName || null, 
  //     status:  dataById?.data.lastName || null, 
  //     createDate: dataById?.data.createDate ? new Date(dataById.data.createDate) : null,
  //     fullName: dataById?.data.fullName || null,
  // });
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    setUrlId(id);
  }, []);

  const stages = dataById?.data?.stageStatus ?? [];


  const sortedStages = stages.sort((a: any, b: any) => {
    // ถ้าเป็นสถานะ 'OPEN' ให้จัดอันดับให้ไปที่จุดเริ่มต้น
    if (a.activity === 'รอดำเนินการ' && b.activity !== 'รอดำเนินการ') return -1;
    if (a.activity !== 'รอดำเนินการ' && b.activity === 'รอดำเนินการ') return 1;

    // สำหรับสถานะที่ไม่ใช่ 'OPEN' ให้จัดเรียงตามลำดับที่ปรากฏ
    return 0;
  });

  const groupedStages = sortedStages.reduce((acc: any, stage: any) => {
    if (!acc[stage.activity]) {
      acc[stage.activity] = [];
    }
    acc[stage.activity].push(stage);
    return acc;
  }, {});


  const reorganizeStages = (groupedStages: { [x: string]: any[]; }) => {
    const allActivities = Object.keys(groupedStages);
    const reorganizedStages = [];
    let latestActivity: null = null;
    let latestStages: any[] = [];

    // เรียงลำดับทุก stage ตาม createDate จากเก่าสุดไปใหม่สุด
    const allStagesSorted = allActivities.flatMap(activity =>
      groupedStages[activity].map(stage => ({ ...stage, activity }))
    ).sort((a, b) => new Date(a.createDate).getTime() - new Date(b.createDate).getTime());

    allStagesSorted.forEach((stage) => {
      if (latestActivity !== stage.activity) {
        if (latestActivity) {
          reorganizedStages.push({
            activity: latestActivity,
            stages: latestStages // ไม่ต้อง reverse เพราะตอนนี้เรียงจากเก่าสุดอยู่บนแล้ว
          });
        }
        latestActivity = stage.activity;
        latestStages = [stage];
      } else {
        latestStages.push(stage);
      }
    });

    // เพิ่ม activity สุดท้าย
    if (latestActivity) {
      reorganizedStages.push({
        activity: latestActivity,
        stages: latestStages // ไม่ต้อง reverse
      });
    }

    return reorganizedStages;
  };

  const reorganizedStages = reorganizeStages(groupedStages);

  useEffect(() => {
    console.log("dataById:", dataById);
    console.log("stageStatus:", dataById?.data?.stageStatus);
  }, [dataById]);

  useEffect(() => {
    if (session?.fullName) {
      setUserName(session.fullName);
    }
  }, [session]);

  useEffect(() => {
    if (urlId) {
      decrypt(urlId, {
        onSuccess: (decryptedId) => {
          window.history.replaceState({}, '', `/followreport/followreportdetail?id=${urlId}`);
          setDecryptedId(decryptedId);
        },
        onError: (err) => {
          console.error('Decryption failed:', err);
        }
      });
    }
  }, [urlId, decrypt]);

  useEffect(() => {
    console.log("1. Original stages:", stages);
    console.log("2. Sorted stages:", sortedStages);
    console.log("3. Grouped stages:", groupedStages);
    console.log("4. Reorganized stages:", reorganizedStages);
  }, [stages, sortedStages, groupedStages, reorganizedStages]);

  //   useEffect(() => {
  //     if (isSuccess && dataById) {
  //         // ค้นหา stages ที่มี activity เป็น "In progress"
  //         const inProgressStages = dataById.data.stageStatus.filter((stage: { activity: string; }) => stage.activity === "IN PROGRESS");
  //         const resolvedStage = dataById.data.stageStatus.filter((stage: { activity: string; }) => stage.activity === "RESOLVED");

  //         // ดึง stageStatus ล่าสุดที่ตรงกับ "In progress"
  //         const latestInProgressStage = inProgressStages[inProgressStages.length - 1];
  //         const latestInResolved = resolvedStage[resolvedStage.length - 1];


  //         // ตั้งค่า comment ของ stageStatus ล่าสุด
  //         setLatestComment(latestInProgressStage?.comment || 'No comment');
  //         setLatestCommens(latestInResolved?.comment || 'No comment');
  //     }
  // }, [dataById, isSuccess]);


  const handleLogout = async () => {
    try {
      logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("เกิดข้อผิดพลาดในการออกจากระบบ กรุณาลองใหม่อีกครั้ง");
    }
  };

  // const getBgColor = (status: any) => {
  //   if (status === 'รอดำเนินการ') {
  //     const bgCancelColor = '#c12314';
  //     return bgCancelColor ? bgCancelColor : '#CCCCCC';
  //   }
  //   return getStatusColor(status);
  // };


  const getStatusColor = (state: string) => {
    const currentState = dataById?.data.stageStatus[0].state;
    if (state === currentState) {
      switch (state) {
        case 'รอดำเนินการ':
          return '#FFA500';
        case 'กำลังดำเนินการ':
          return '#FFA500';
        case 'เสร็จสิ้น':
          return '#008000';
        default:
          return '#CCCCCC';
      }
    }
    return '#CCCCCC';
  };

  return (
    <div className="min-h-screen bg-[#e8edff] flex flex-col items-center">
      <div className="w-full bg-gradient-to-b from-green-200 to-blue-200 h-32 rounded-b-lg shadow-md">
        <Link href="/main" className="hover:underline">
          <img
            src="/images/logo.png"
            width={150}
            className="absolute top-2 left-2 z-20"
            alt="Logo"
          />
        </Link>
        <div className="text-right mr-[60px] mt-[40px] w-[95%]">
          <button
            onClick={handleLogout}
            className="inline-flex items-center"
          >
            <span className="text-gray-800 font-medium">
              {userName}
              <PersonIcon style={{ marginBottom: "8px", marginLeft: "5px" }} />
            </span>
          </button>
        </div>
      </div>

      <div className="w-full max-w-[90%] -mt-10 z-10">
        <div className="bg-white shadow-lg rounded-xl">
          <Navbar />
        </div>
      </div>

      <div className="rounded-lg mt-6 ml-8 w-[90%]">
        <ApplicantTracking />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 mt-2 max-w-[90%] w-full flex-grow mb-12">
        <div className="mb-6 items-center">
          <h2 className="text-xl font-semibold">รายละเอียดการร้องเรียน</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <p><strong>ชื่อผู้ร้องเรียน:</strong> {dataById?.data.fullName}</p>
            <p><strong>อีเมล:</strong> {dataById?.data.emailAddress}</p>
            <p><strong>เบอร์โทร:</strong> {dataById?.data.telephone}</p>
            <p><strong>หัวข้อ:</strong> {dataById?.data.detailsOfTheTopic}</p>
            <p><strong>รายละเอียด:</strong> {dataById?.data.problemDetail}</p>
          </div>
        </div>
        <div className="mb-6 ">
          <h2 className="text-2xl font-bold mb-4 text-[#3190FF]">STATE</h2>
        </div>
        <Timeline>
          {reorganizedStages.map((stageGroup, index) => {
            const isCurrentState = stageGroup.stages[0].state === dataById?.data.stageStatus[0].state;
            return (
              <TimelineItem key={`${stageGroup.activity}-${index}`}>
                <TimelineSeparator>
                  <TimelineDot
                    style={{
                      backgroundColor: getStatusColor(stageGroup.stages[0].state),
                      width: '48px',
                      height: '48px',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  {/* แสดงเส้นทุกครั้งยกเว้น item สุดท้าย */}
                  <TimelineConnector
                    style={{
                      backgroundColor: '#CCCCCC',
                      width: '2px',
                      height: '60px'
                    }}
                  />
                  {/* จุดเล็กที่ปลายเส้นสุดท้าย */}
                  {index === reorganizedStages.length - 1 && (
                    <TimelineDot
                      style={{
                        backgroundColor: '#CCCCCC',
                        width: '24px',
                        height: '24px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                    />
                  )}
                </TimelineSeparator>
                <TimelineContent>
                  <div className="ml-4">
                    <h3 className={`font-semibold text-lg ${isCurrentState ? 'text-gray-900' : 'text-gray-400'}`}>
                      {stageGroup.stages[0].state}
                    </h3>
                    {isCurrentState && (
                      <div className="mt-2">
                        <p className="text-gray-600">
                          {new Date(stageGroup.stages[0].createDate).toLocaleString('th-TH', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        {stageGroup.stages[0].detailsOfTheTopic && (
                          <p className="mt-1 text-gray-700">{stageGroup.stages[0].detailsOfTheTopic}</p>
                        )}
                      </div>
                    )}
                  </div>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </div>

      <style jsx global>{`
  .swal2-popup {
    width: 700px !important;
  }
`}</style>
    </div>
  );

}


export default MainPage;