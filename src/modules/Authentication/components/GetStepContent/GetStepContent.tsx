import SignUpPersonalInfo from "../SignUpPersonalInfo/SignUpPersonalInfo";
import SignUpSocialLinks from "../SignUpSocialLinks/SignUpSocialLinks";


type Props = { step: number };

const GetStepContent = ({ step }: Props) => {
    switch (step) {
        case 0:
            return <SignUpPersonalInfo />;
        // case 1:
        //     return <SignUpEducationAndLanguages />;
        // case 2:
        //     return <SignUpWorkExperience />;
        case 1:
            return <SignUpSocialLinks />;
        default:
            return null;
    }
};




export default GetStepContent
