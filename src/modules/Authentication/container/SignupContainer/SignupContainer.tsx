import { Stack } from "@mui/material"
import AuthLayout from "../../AuthLayout/AuthLayout"
import SignupForm from "../../components/SignupForm/SignupForm"


const SignupContainer = () => {
    return (
        <AuthLayout>
            <Stack alignItems={'center'} justifyContent={'center'} width={'100%'} height={'90vh'} sx={{overflowY:'auto'}}>

                <SignupForm />
            </Stack>
        </AuthLayout>
    )
}

export default SignupContainer
