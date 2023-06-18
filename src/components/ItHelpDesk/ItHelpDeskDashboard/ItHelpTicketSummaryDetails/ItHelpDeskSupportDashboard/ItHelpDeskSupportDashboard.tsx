import { useCallback, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import Picker from "emoji-picker-react";
import { Avatar, Badge, Button, Col, Image, Row } from "antd";
import { CaretDownOutlined, CloseCircleOutlined, FileProtectOutlined, FileTextOutlined } from "@ant-design/icons";
import {
  useGetHelpDeskByTicketIdRequestQuery,
  usePatchCommentsRequestMutation,
  usePostMediaRequestMutation,
} from "../../../../../store/Slices/ItHelpDesk";
import dateIcon from "../../../../../assets/icons/ItHelpDesk/dateIcon.svg";
import chatImages from "../../../../../assets/icons/ItHelpDesk/chatImages.svg";
import documentImages from "../../../../../assets/icons/ItHelpDesk/documentImages.svg";
import profile from "../../../../../assets/images/itHelpDesk/profile.svg";
import chatAmount from "../../../../../assets/images/itHelpDesk/chatAmount.svg";
import UploadChat from "../../../../../assets/images/itHelpDesk/uploadChat.svg";
import chatEmoji from "../../../../../assets/images/itHelpDesk/emojiImage.svg";
import "./ItHelpDeskSupportDashboard.scss";

const ItHelpDeskSupportDashboard = () => {
  const userData = JSON.parse(localStorage.getItem("careUserData") || "{}");
  const [toggleEmoji, setToggleEmoji] = useState<boolean>(false);
  const [userMessage, setUserMessage] = useState<{ message: string; isReciever: boolean; time: string }>({
    message: "",
    isReciever: false,
    time: "",
  });
  const [inputMessage, setInputMessage] = useState<string>("");
  const [image, setImage] = useState<any>({ preview: "", raw: "" });
  const [uploadImgId, setUploadImgId] = useState<any>();

  const dateTime: any = dayjs().format("LT");
  const { state: ticketData } = useLocation();

  //******************
  const [patchCommentsRequest, { isLoading }] = usePatchCommentsRequestMutation();
  const [postMediaRequest] = usePostMediaRequestMutation();

  const {
    data: ticketByIdData,
    isSuccess: isSuccessTicketById,
    isError: isErrorTicketById,
    error: ticketByIdError,
  } = useGetHelpDeskByTicketIdRequestQuery({
    refetchOnMountOrArgChange: true,
    id: ticketData?._id,
  });

  //Ticket data by id
  let ticketDataById: any;
  if (isSuccessTicketById) {
    ticketDataById = ticketByIdData;
  } else if (isErrorTicketById) {
    ticketDataById = ticketByIdError;
  }

  const handleAddImg = async (e: any) => {
    let CommentData = new FormData();
    if (e.target.files.length) {
      CommentData.append("file", e.target.files[0]);
      const { data: uploadData }: any = await postMediaRequest(CommentData);
      setUploadImgId(uploadData);

      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };
  //************* */

  const onEmojiClick = (event: any, emojiObject: any) => {
    setInputMessage(inputMessage + "".concat(emojiObject.emoji));
    setUserMessage({ ...userMessage, message: inputMessage });
  };

  const handleSubmit = useCallback(
    (e: React.ChangeEvent<HTMLFormElement> | any) => {
      e.preventDefault();

      const payload: any = {};

      if (inputMessage !== "") {
        payload["comment"] = inputMessage;
      }
      if (uploadImgId) {
        payload["attachment"] = uploadImgId?.data?._id;
      }
      if (Object.keys(payload).length > 0) {
        patchCommentsRequest({ payload, commentId: ticketData._id });
      }
      setInputMessage("");
      setImage({ raw: "", preview: "" });
    },
    [dateTime, inputMessage, userMessage, image.raw]
  );

  //***************** */
  const profileImg = ticketDataById?.data?.response?.userDetails?.profilePhoto
    ? `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${ticketDataById?.data?.response?.userDetails?.profilePhoto}.jpeg`
    : profile;

  const handleImageType1 = (imageType: any) => {
    return (
      imageType?.startsWith("image/") &&
      (imageType?.endsWith("png") || imageType?.endsWith("jpg") || imageType?.endsWith("jpeg") || imageType?.endsWith("webp"))
    );
  };
  const messagesEndRef: any = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [ticketDataById?.data?.response?.comments]);

  return (
    <div className="wrap-support-dashboard">
      {isErrorTicketById ? (
        <p style={{ color: "red", fontSize: "50px", textAlign: "center" }}>{ticketDataById?.message}</p>
      ) : (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" sm={24} md={24} lg={10} xl={7}>
            <div className="wrap-chat" style={{ backgroundColor: "" }}>
              <div className="wrap-profile-image">
                <Avatar size={235} style={{ marginTop: "16px", border: "5px solid #34BC85" }} src={profileImg} />
              </div>
              <div className="chat-name">
                <h6 className="m-0 fs-14 fw-600">Name</h6>
                <p
                  className="m-0 fs-14 fw-400"
                  style={{ textTransform: "capitalize" }}
                >{`${ticketDataById?.data?.response?.userDetails?.firstName} ${ticketDataById?.data?.response?.userDetails?.lastName}`}</p>
              </div>
              <div className="chat-user-type">
                <h6 className="m-0 fs-14 fw-600">User Type</h6>
                <p className="m-0 fs-14 fw-400">{ticketDataById?.data?.response?.userDetails?.userType?.name}</p>
              </div>
              <div className="chat-email">
                <h6 className="m-0 fs-14 fw-600">Email</h6>
                <p className="m-0 fs-14 fw-400">{ticketDataById?.data?.response?.userDetails?.email}</p>
                <hr />
              </div>
              <div>
                <div className="d-flex justify-between chat-margin">
                  <h6 className="m-0 fw-700 fs-14">Images</h6>
                  <p className="m-0 fw-400 fs-14 cursor">Show all</p>
                  {/* <hr /> */}
                </div>
                <div className="d-flex">
                  <img src={chatImages} alt="" />
                  <img src={chatImages} alt="" />
                  <img src={chatImages} alt="" />
                </div>
              </div>
              <div className="wrap-chat-document">
                <div className="d-flex justify-between chat-margin">
                  <h6 className="m-0 fw-700 fs-14">Documents</h6>
                  <p className="m-0 fw-400 fs-14 cursor">Show all</p>
                </div>
                <div className="d-flex align-center chat-margin">
                  <div className="documents-img d-flex justify-center align-center cursor">
                    <img src={documentImages} alt="" />
                  </div>
                  <div className="document-content cursor">
                    <h6 className="m-0">Error doc</h6>
                    <span>197 kb</span>
                  </div>
                </div>
                <div className="d-flex align-center chat-margin">
                  <div className="documents-img d-flex justify-center align-center cursor">
                    <img src={documentImages} alt="" />
                  </div>
                  <div className="document-content cursor">
                    <h6 className="m-0">Error doc</h6>
                    <span>197 kb</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col className="gutter-row" sm={24} md={24} lg={14} xl={17}>
            <div style={{ backgroundColor: "white", boxShadow: " 10px 54px 74px rgba(0, 0, 0, 0.03)" }}>
              <div className="d-flex justify-between" style={{ padding: "20px" }}>
                <div className="d-flex">
                  <div>
                    <Avatar size={43} src={profileImg} style={{ marginRight: "18px" }} />
                  </div>

                  <div>
                    <h6
                      className="fw-500 fs-16 m-0"
                      style={{ textTransform: "capitalize" }}
                    >{`${ticketDataById?.data?.response?.userDetails?.firstName} ${ticketDataById?.data?.response?.userDetails?.lastName}`}</h6>
                    <p className="m-0" style={{ textTransform: "capitalize" }}>
                      <Badge
                        style={{ paddingRight: ".5rem" }}
                        color={ticketDataById?.data?.response?.userDetails?.status === "active" ? "#34BC85" : "#FF4D4F"}
                      />
                      {ticketDataById?.data?.response?.userDetails?.status}
                    </p>
                  </div>
                </div>
                <div className="d-flex align-center justify-between" style={{ gap: "30px" }}>
                  <p className="m-0 fs-14 fw-400 d-flex">
                    <img src={chatAmount} alt="amount" style={{ marginRight: "7px" }} />
                    {ticketDataById?.data?.response?.ticket}
                  </p>
                  <p className="m-0 fs-400 d-flex">
                    <img src={dateIcon} alt="dateicon" className="cursor" style={{ marginRight: "7px" }} />
                    {dayjs(ticketDataById?.data?.response?.date).format("DD/MM/YYYY")}
                  </p>
                </div>
              </div>
            </div>

            <div className=" chat-padding">
              <div>
                <h6 className="text-center fw-500 fs-14 m-0">
                  <span className="fw-500 fs-16">Subject: </span>
                  {ticketDataById?.data?.response?.subject}
                </h6>
              </div>
              <div>
                <h6 className="fw-500 fs-16 m-0">
                  <span className="fw-500 fs-14">Description:</span> {ticketDataById?.data?.response?.description}
                </h6>
                <hr />
              </div>
            </div>
            <div style={{ height: "56.1vh", overflowY: "scroll" }}>
              {ticketDataById?.data?.response?.comments &&
                ticketDataById?.data?.response?.comments?.map((item: any) => {
                  return (
                    <div className="gutter-row">
                      <div className="d-flex chat-margin" style={{ justifyContent: item.userId === userData.id ? "center" : "start" }}>
                        <div className="img">
                          <Avatar size={43} src={profileImg} style={{ marginRight: "18px" }} />
                        </div>
                        <div
                          className="message-content border-radius-10"
                          style={{ width: "478px", backgroundColor: item.userId === userData.id ? "#EFF0F7" : "#65CDF0", padding: "12px 35px" }}
                        >
                          <div className="d-flex justify-between" style={{ marginBottom: "11px" }}>
                            <h6 className="m-0 fs-14 fw-600">{`${item?.user?.firstName} ${item?.user?.lastName}`}</h6>
                            <p className="m-0 fw-400 fs-12">{dayjs(item.createdAt).format("hh:mm a")}</p>
                          </div>
                          <div className="messages">
                            {item?.comment && <p className="m-0 fs-14 fw-600">{item?.comment}</p>}
                            {item?.media && (
                              <>
                                {handleImageType1(item?.media?.mediaMeta?.mimetype) ? (
                                  <Image
                                    src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${item?.media?.mediaId}.${item?.media?.mediaMeta?.extension}`}
                                    alt="uploaded img"
                                    style={{ objectFit: "cover", borderRadius: "5px" }}
                                    height="100%"
                                    width="100%"
                                  />
                                ) : (
                                  <a
                                    href={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${item?.media?.mediaId}.${item?.media?.mediaMeta?.extension}`}
                                    download
                                  >
                                    <div className="document-file-type cursor-pointer">
                                      <FileProtectOutlined className="document-icon" />
                                      <p className="m-0 secondary-color">
                                        {item?.media?.fileName}.{item?.media?.mediaMeta?.extension}
                                      </p>
                                    </div>
                                  </a>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              <div ref={messagesEndRef} />
            </div>
            <Row style={{ position: "relative" }}>
              {image.preview && (
                <div
                  className="image-preview-box"
                  style={{
                    position: "absolute",
                    background: "#767575",
                    zIndex: "1",
                    bottom: "3.7rem",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <CloseCircleOutlined
                      onClick={() => setImage({ preview: "", raw: "" })}
                      style={{
                        fontSize: handleImageType1(image?.raw?.type) ? "1.3rem" : "1rem",
                        position: "absolute",
                        right: "-11px",
                        top: "-10px",
                        cursor: "pointer",
                      }}
                    />
                    {handleImageType1(image?.raw?.type) ? (
                      <img
                        src={image.preview}
                        alt="chat profile image"
                        style={{ objectFit: "cover", height: "100px", width: "100px", borderRadius: "5px", cursor: "pointer" }}
                        height="100%"
                        width="100%"
                      />
                    ) : (
                      <div>
                        <FileTextOutlined
                          style={{
                            fontSize: "5rem",
                          }}
                        />
                        <p className="m-0">{image?.raw?.name}</p>
                      </div>
                    )}
                    <CaretDownOutlined
                      style={{
                        position: "absolute",
                        top: handleImageType1(image?.raw?.type) ? "6.56rem" : "6.2rem",
                        fontSize: "20px",
                        left: handleImageType1(image?.raw?.type) ? "2.5rem" : "2.3rem",
                        color: "#767575",
                      }}
                    />
                  </div>
                </div>
              )}
              <Col className="gutter-row" span={24}>
                <div className="d-flex align-center justify-center gap">
                  <div style={{ position: "relative", width: "100%" }}>
                    <form onSubmit={handleSubmit}>
                      <textarea
                        className="chat-message-input custom-scroll"
                        autoComplete="off"
                        onKeyPress={(e: any) => {
                          if (e.key === "Enter" && !e.shiftKey) handleSubmit(e);
                        }}
                        wrap="hard"
                        rows={2}
                        placeholder="Write here"
                        style={{ width: "100%", boxShadow: "inset 0px 0px 5px rgb(0 0 0 / 20%)", borderRadius: "6px", border: "none " }}
                        name="message"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onFocus={() => setToggleEmoji(false)}
                      />
                    </form>
                    <div className="d-flex" style={{ position: "absolute", right: "25px", top: "12px" }}>
                      <div>
                        <label htmlFor="file-input">
                          <img src={UploadChat} alt="Image 1" style={{ marginRight: "10px", cursor: "pointer" }} />
                        </label>
                        <input hidden id="file-input" type="file" accept="image/*" onChange={handleAddImg} />
                      </div>
                      <div style={{ position: "relative" }}>
                        <img src={chatEmoji} alt="Image 2" className="cursor" onClick={() => setToggleEmoji(!toggleEmoji)} />
                        <div className="emoji-div" style={{ zIndex: 10, position: "absolute", top: "-333px", right: "-25px" }}>
                          {toggleEmoji && <Picker onEmojiClick={onEmojiClick} />}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button loading={isLoading} className="btn-secondary cursor" onClick={(e) => handleSubmit(e)}>
                    Send
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ItHelpDeskSupportDashboard;
