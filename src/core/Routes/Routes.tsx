
import { ROUTES } from "@muc/constants";
import { SecureRoutes } from "@muc/hoc";
// import { SearchContainer, SearchResultContainer } from "@muc/modules";
import {
  ContactUs,
  Gallery,
  Home,
  LandingScreen,
  Likes,
  Loging,
  // MemberShipPakages,
  Messages,
  Privacy,
  Signup,
  Success,
  TermAndConditionsPage,
  UserInfo,
  UserSetting,
} from "@muc/screens";
import { Route, Routes as ReactRoutes } from "react-router-dom";


const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/home" element={<Home />} />
      <Route path={ROUTES.FOLLOWING} element={
        // <SecureRoutes>
        <Gallery />
        // </SecureRoutes>

      } />
      {/* <Route path="/search" element={<SearchContainer />} /> */}
      {/* <Route path="/search/search_result" element={<SearchResultContainer />} /> */}
      {/* <Route path="/membership_pakages" element={<MemberShipPakages />} /> */}
      <Route element={<SecureRoutes />}>
        <Route path="/messages" element={<Messages />} />
        <Route path={"/likes"} element={<Likes />
        } />
      </Route>
      {/* <Route path={ROUTES.HOME} element={<LandingScreen />} /> */}
      <Route path={ROUTES.Login} element={<Loging />} />
      <Route path={ROUTES.SIGNUP} element={<Signup />} />
      <Route path="/user_info/:id" element={<UserInfo />} />
      <Route path="/user_setting/:tab" element={<UserSetting />} />
      <Route path={ROUTES.TERM_AND_CONDITION} element={<TermAndConditionsPage />} />
      <Route path={ROUTES.PRIVACY} element={<Privacy />} />
      <Route path={ROUTES.STORIES} element={<Success />} />
      <Route path={ROUTES.CONTACT} element={<ContactUs />} />
    </ReactRoutes>
  );
};

export default Routes;
