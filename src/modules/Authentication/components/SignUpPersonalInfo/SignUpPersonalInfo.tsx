import { CustomSelect, CustomTextField } from '@muc/components'
import { GenderTypes, } from '@muc/constants'
import { Stack } from '@mui/material'


const SignUpPersonalInfo = () => {
    return (
        <Stack gap={'20px'}>
            <CustomTextField
                placeholder='First Name'
                name="firstName"
                label="First Name"
                type="text"
            // rules={{ required: "Required" }}
            />
            <CustomTextField
                placeholder='Last Name'
                name="lastName"
                label="Last Name"
                type="text"
            // rules={{ required: "Required" }}
            />
            <CustomTextField
                placeholder='Email'
                name="email"
                label="Email"
                type="email"
            // rules={{ required: "Required" }}
            />
            <CustomTextField
                placeholder='password'
                name="password"
                label="Password"
                type="password"
            // rules={{ required: "Required" }}
            />
            <CustomTextField
                placeholder='phoneNumber'
                name="phoneNumber"
                label="Phone Number"
                type="number"
            // rules={{ required: "Required" }}
            />
            <CustomTextField
                name="dateOfBirth"
                label='Date of Birth'
                placeholder='Date of Birth'
                type="date"
            // rules={{ required: "Required" }}
            />



            {/* <CustomTextField
                placeholder='Religion'
                name="religion"
                label="Religion"
                type="text"
                rules={{ required: "Required" }}
            /> */}
            {/* <CustomTextField
                placeholder='Bio'
                name="bio"
                label="Bio"
                type="text"
                rules={{ required: "Required" }}
            /> */}
            {/* <CustomTextField
                placeholder='Address'
                name="address"
                label="Address"
                type="text"
                rules={{ required: "Required" }}
            /> */}
            <CustomSelect
                name="gender"
                label="Gender"
                // labelOutside={true}

                options={GenderTypes.map((item) => ({
                    label: item,
                    value: item,
                }))}
            />
            {/* <CustomSelect
                name="maritalStatus"
                label="Marital Status"
                // labelOutside={true}

                options={MaritalStatus.map((item) => ({
                    label: item,
                    value: item,
                }))}
            /> */}
        </Stack>
    )
}

export default SignUpPersonalInfo
