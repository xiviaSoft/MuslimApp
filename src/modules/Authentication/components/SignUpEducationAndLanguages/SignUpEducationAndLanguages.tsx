import { CustomTextField } from '@muc/components'
import { Stack } from '@mui/material'


const SignUpEducationAndLanguages = () => {
    return (
        <Stack gap={'20px'}>
            <CustomTextField name="highestDegree" label="Highest Degree" type="text" rules={{ required: "Required" }} placeholder='highest degree' />
            <CustomTextField name="Skills" label="Skills" type="text" rules={{ required: "Required" }} placeholder='Skills you have' />
            <CustomTextField name="languages" label="Languages" type="text" rules={{ required: "Required" }} placeholder='languages' />


        </Stack>
    )
}

export default SignUpEducationAndLanguages
