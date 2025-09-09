import { CustomTextField } from '@muc/components'
import { Stack } from '@mui/material'


const SignUpEducationAndLanguages = () => {
    return (
        <Stack gap={'20px'}>
            <CustomTextField name="institutionName" label="Institution Name" type="text" rules={{ required: "Required" }} placeholder='Institution Name' />
            <CustomTextField name="fieldOfStudy" label="Field Of Study " type="text" rules={{ required: "Required" }} placeholder='Field Of Study ' />
            <CustomTextField name="highestDegree" label="Highest Degree" type="text" rules={{ required: "Required" }} placeholder='highest degree' />
            <CustomTextField name="graduationYear" label="Graduation Year" type="text" rules={{ required: "Required" }} placeholder='Graduation Year' />

            <CustomTextField name="languages" label="Languages" type="text" rules={{ required: "Required" }} placeholder='Languages' />
            <CustomTextField name="technicalSkills" label="Technical Skills" type="text" rules={{ required: "Required" }} placeholder='Technical Skills' />
            <CustomTextField name="softSkills" label="Soft Skills" type="text" rules={{ required: "Required" }} placeholder='Soft Skills' />
          


        </Stack>
    )
}

export default SignUpEducationAndLanguages
