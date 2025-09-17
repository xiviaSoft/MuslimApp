import { AppLayout, SettingLayout } from "@muc/layout";
import { Stack, } from "@mui/material";
import { useParams } from "react-router-dom";
import EditPhotoContainer from "../EditPhotoContainer/EditPhotoContainer";
// import EducationAndWork from "../../components/EducationAndWork/EducationAndWork";
// import UserReligion from "../../components/UserReligion/UserReligion";
// import UserPersonal from "../../components/UserPersonal/UserPersonal";
import Notifications_PreferencesContainer from "../Notifications_PreferencesContainer/Notifications_PreferencesContainer";
import EditPersonalInfoContainer from "../EditPersonalInfoContainer/EditPersonalInfoContainer";
import CommunicationPreferencesContainer from "../CommunicationPreferencesContainer/CommunicationPreferencesContainer";
import DeviceContainer from "../DeviceContainer/DeviceContainer";
import PhotoAccessContainer from "../PhotoAccessContainer/PhotoAccessContainer";
import ChangeUserName from "../../components/ChangeUserName/ChangeUserName";
import ChangePassword from "../../components/ChangePasswrod/ChangePassword";
import ChangeEmail from "../../components/ChangeEmail/ChangeEmail";
import BlockUser from "../../components/BlockUser/BlockUser";
import MembershipHistory from "../../components/MembershipHistory/MembershipHistory";
import DeleteProfile from "../../components/DeleteProfile/DeleteProfile";
import ChangePhoneNumber from "../../components/ChangePhoneNumber/ChangePhoneNumber";
import EditProfile from "../../components/EditProfile/EditProfile";

const ProfileSetting = () => {
  const { tab } = useParams();

  const renderComponent = () => {
    switch (tab) {
      case "edit-profile":
        return (
          <Stack gap={"20px"} py={2}>
            <EditProfile />
            {/* <EducationAndWork />
            <UserPersonal />
            <UserReligion /> */}
          </Stack>
        );
      case "edit-personal-info":
        return <EditPersonalInfoContainer />;
      case "notifications":
        return <Notifications_PreferencesContainer />;
      case "edit-photos":
        return <EditPhotoContainer />;
      case "communication":
        return <CommunicationPreferencesContainer />;
      case "devices":
        return <DeviceContainer />;
      case "change-password":
        return <ChangePassword />;
      case "photo-access":
        return <PhotoAccessContainer />;
      case "change-email":
        return <ChangeEmail />;
      case "change-username":
        return <ChangeUserName />;
      case "blocked-users":
        return <BlockUser />;
      case "membership-history":
        return <MembershipHistory />;
      case "change-phone":
        return <ChangePhoneNumber />;
      case "delete-profile":
        return <DeleteProfile />;
      default:
        return null;
    }
  };

  return (
    <>
      <AppLayout>
        <SettingLayout>{renderComponent()}</SettingLayout>
      </AppLayout>
    </>
  );
};

export default ProfileSetting;
