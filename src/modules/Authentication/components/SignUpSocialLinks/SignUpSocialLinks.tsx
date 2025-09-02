import { CustomTextField } from '@muc/components'
import { Stack } from '@mui/material'


const SignUpSocialLinks = () => {
    return (
        <Stack gap={'20px'}>
            <CustomTextField name="facebook" label="Facebook" type="text" placeholder='facebook link' />
            <CustomTextField name="twitter" label="Twitter" type="text" placeholder='twitter link' />
            <CustomTextField name="linkedin" label="LinkedIn" type="text" placeholder='linkedin link' />
            <CustomTextField name="instagram" label="Instagram" type="text"
                placeholder='instagram link' />
        </Stack>
    )
}

export default SignUpSocialLinks
