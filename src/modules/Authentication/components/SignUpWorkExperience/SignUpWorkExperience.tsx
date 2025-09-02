import { CustomTextField } from '@muc/components'
import { Stack } from '@mui/material'


const SignUpWorkExperience = () => {
    return (
        <Stack gap={'20px'}>
            <CustomTextField
                name="companyName"
                label="Company Name"
                type="text"
                rules={{ required: "Required" }}
                placeholder='company name'
            />
            <CustomTextField
                name="role"
                label="Role"
                type="text"
                rules={{ required: "Required" }}
                placeholder='role'
            />
            <CustomTextField
                name="startDate"
                label="Start Date"
                type="date"
                rules={{ required: "Required" }}
                placeholder='start date'
            />
            <CustomTextField
                name="companyaddress"
                label="Address"
                type="text"
                rules={{ required: "Required" }}
                placeholder='company address'
            />
            <CustomTextField
                name="companydescription"
                label="Compnay Description"
                type="text"
                rules={{ required: "Required" }}
                placeholder='company description'
            />
            <CustomTextField
                name="endDate"
                label="End Date"
                type="date"
                placeholder='end date'
            />
            <CustomTextField
                name="isCurrent"
                label="Currently Working (true/false)"
                type="text"
                placeholder='is current'
            />

        </Stack>
    )
}

export default SignUpWorkExperience
