import SignUpEducationAndLanguages from "../SignUpEducationAndLanguages/SignUpEducationAndLanguages";
import SignUpPersonalInfo from "../SignUpPersonalInfo/SignUpPersonalInfo";
import SignUpSocialLinks from "../SignUpSocialLinks/SignUpSocialLinks";
import SignUpWorkExperience from "../SignUpWorkExperience/SignUpWorkExperience";

type Props = { step: number };

const GetStepContent = ({ step }: Props) => {
    switch (step) {
        case 0:
            return <SignUpPersonalInfo />;
        case 1:
            return <SignUpEducationAndLanguages />;
        case 2:
            return <SignUpWorkExperience />;
        case 3:
            return <SignUpSocialLinks />;
        default:
            return null;
    }
};




export default GetStepContent
