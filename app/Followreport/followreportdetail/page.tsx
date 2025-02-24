"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import Link from "next/link";
import { useGetComplaintById } from "../../../hooks/useGetComplaintById";
import useDecryptData from "../../../hooks/Encryption/Decryption";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DescriptionIcon from '@mui/icons-material/Description';
import TimelineIcon from '@mui/icons-material/Timeline';
import CustomTabPanel, { a11yProps } from "../../../components/tabs";
import Card from "@mui/material/Card";
const MainPage: React.FC = () => {
  const { session } = useSession();
  const { logout } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [decryptedId, setDecryptedId] = useState<string | null>(null);
  const [urlId, setUrlId] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const { data: dataById } = useGetComplaintById(decryptedId?.toString());
  const { mutate: decrypt } = useDecryptData();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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

  const handleLogout = async () => {
    try {
      logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("รหัสผ่านหรืออีเมลไม่ถูกต้อง");
    }
  };
  const getStatusColor = (state: string) => {
    // ตรวจสอบว่ามี stageStatus หรือไม่
    const currentState = dataById?.data.stageStatus.some((status: { state: string; }) => status.state === state);

    if (currentState) {
      // กำหนดสีตามสถานะ
      switch (state) {
        case 'รอดำเนินการ':
          return '#FFA500';  // สีส้ม
        case 'กำลังดำเนินการ':
          return '#3190FF';  // สีส้ม
        case 'เสร็จสิ้น':
          return '#008000';  // สีเขียว
        default:
          return '#CCCCCC';  // สีเทา
      }
    }

    // ถ้าไม่มีสถานะที่ตรงกัน ให้ใช้สีเทา
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
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="complaint details tabs"
              variant="fullWidth"
            >
              <Tab
                icon={<DescriptionIcon />}
                iconPosition="start"
                label="รายละเอียดการร้องเรียน"
                {...a11yProps(0)}
              />
              <Tab
                icon={<TimelineIcon />}
                iconPosition="start"
                label="Timeline"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>

          <CustomTabPanel value={tabValue} index={0}>
            <div className="grid grid-cols-2 gap-6">
              {/* ฝั่งซ้าย - ข้อมูลผู้ร้องเรียน */}
              <Card className="p-6 h-full">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-[#3190FF] pb-2 border-b">
                    ข้อมูลผู้ร้องเรียน
                  </h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-[120px,1fr] gap-2 items-baseline">
                      <span className="text-gray-600">ชื่อ-นามสกุล:</span>
                      <span className="font-medium text-gray-900">{dataById?.data?.fullName}</span>
                    </div>

                    <div className="grid grid-cols-[120px,1fr] gap-2 items-baseline">
                      <span className="text-gray-600">อีเมล:</span>
                      <span className="font-medium text-gray-900">{dataById?.data?.emailAddress}</span>
                    </div>

                    <div className="grid grid-cols-[120px,1fr] gap-2 items-baseline">
                      <span className="text-gray-600">เบอร์โทร:</span>
                      <span className="font-medium text-gray-900">{dataById?.data?.telephone}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* ฝั่งขวา - รายละเอียดการร้องเรียน */}
              <Card className="p-6 h-full">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-[#3190FF] pb-2 border-b">
                    รายละเอียดการร้องเรียน
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-gray-600 mb-2">หัวข้อร้องเรียน</h4>
                      <div className="p-3 bg-gray-50 rounded-lg font-medium text-gray-900">
                        {dataById?.data?.detailsOfTheTopic}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-gray-600 mb-2">รายละเอียด</h4>
                      <div className="p-3 bg-gray-50 rounded-lg font-medium text-gray-900 min-h-[200px] whitespace-pre-wrap">
                        {dataById?.data?.problemDetail}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={1}>
          <h2 className="text-2xl font-bold mb-4 text-[#3190FF]">STATE</h2>
            <Timeline>
              {reorganizedStages.map((stageGroup, index) => {
                return stageGroup.stages.map((stage, stageIndex) => {
                  const isCurrentState = dataById?.data.stageStatus.some((status: { state: any; }) => status.state === stage.state);
                  return (
                    <TimelineItem key={`${stageGroup.activity}-${index}-${stageIndex}`}>
                      <TimelineSeparator>
                        <TimelineDot
                          style={{
                            backgroundColor: getStatusColor(stage.state),
                            width: '48px',
                            height: '48px',
                            transition: 'all 0.3s ease',
                          }}
                        />
                        {(index === reorganizedStages.length - 1 || stageIndex < stageGroup.stages.length - 1) && stage.state !== 'เสร็จสิ้น' && (
                          <TimelineConnector
                            style={{
                              backgroundColor: getStatusColor(stage.state),
                              width: '2px',
                              height: '60px',
                            }}
                          />
                        )}
                        {(index === reorganizedStages.length - 1 && stageIndex === stageGroup.stages.length - 1) && stage.state !== 'เสร็จสิ้น' && (
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
                            {stage.state}
                          </h3>
                          {isCurrentState && (
                            <div className="mt-2">
                              <p className="text-gray-600">
                                {new Date(stage.createDate).toLocaleString('th-TH', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </p>
                              {stage.detailsOfTheTopic && (
                                <p className="mt-1 text-gray-700">{stage.detailsOfTheTopic}</p>
                              )}
                            </div>
                          )}
                        </div>
                      </TimelineContent>
                    </TimelineItem>
                  );
                });
              })}
            </Timeline>
          </CustomTabPanel>
        </Box>
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