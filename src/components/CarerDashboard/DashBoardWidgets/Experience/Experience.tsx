import dayjs from "dayjs";
import { useGetUserOtherInfoRequestQuery } from "../../../../store/Slices/UserOtherInformation";
import { Skeleton } from "antd";
import Meta from "antd/es/card/Meta";

const Experience = () => {
  const { id }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");
  const { data, isLoading, isError, isSuccess } = useGetUserOtherInfoRequestQuery({
    refetchOnMountOrArgChange: true,
    userId: id,
    detail: "TRAININGWORK",
  });

  let experienceData: any;
  if (isLoading) {
    experienceData = <p>Loading...</p>;
  } else if (isSuccess) {
    experienceData = data;
  } else if (isError) {
    experienceData = <p>Error...</p>;
  }

  return (
    <div className="experience-card">
      {!isLoading ? (
        <div>
          <h1 className="title">Experience</h1>
          {experienceData?.data?.userprofile[0]?.workExperience?.slice(0, 2)?.map((item: any, index: number) => (
            <div key={index} className="experience">
              <div className="carer">
                <h5>{item?.positionEmployer}</h5>
                <p>
                  {dayjs(item?.startDate).format("MM/YYYY")}-{dayjs(item?.endDate).format("MM/YYYY")}
                </p>
              </div>
              <h2>{item?.leavinReason}</h2>
            </div>
          ))}
        </div>
      ) : (
        <Skeleton loading={isLoading} active>
          <Meta title="Card title" description="This is the description" />
        </Skeleton>
      )}
    </div>
  );
};

export default Experience;
