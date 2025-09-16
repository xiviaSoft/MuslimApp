
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { addDoc, collection, serverTimestamp, setDoc } from "firebase/firestore";
import { db, auth } from "@muc/libs";
import { ReasonType } from "@muc/collections";
import { useMutation } from "@tanstack/react-query";


interface ReportFormData {
    reason: ReasonType;
    details?: string;
}

interface ReportDialogProps {
    open: boolean;
    onClose: () => void;
    reportedUserId: string;
}

const ReportDialog = ({ open, onClose, reportedUserId }: ReportDialogProps) => {
    const { control, handleSubmit, reset } = useForm<ReportFormData>({
        defaultValues: { reason: ReasonType.spam, details: "" },
    });

    const onSubmit = async (formData: ReportFormData) => {
        reportMutation.mutate(formData)

        reset();
        onClose();
    };
    const handleReport = async (formData: ReportFormData) => {
        const docRef = await addDoc(collection(db, "reports"), {

            reporterUserId: auth.currentUser?.uid,
            reportedUserId,
            reason: formData?.reason,
            details: formData?.details,
            status: "pending",
            createdAt: serverTimestamp(),
        });
        await setDoc(docRef, {
            id: docRef.id,
        }, { merge: true });

        return { id: docRef.id, ...formData };

    };
    const reportMutation = useMutation({
        mutationFn: handleReport,
        onSuccess: (data) => {
            console.log('user reported', data)
        }
    })



    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Report User</DialogTitle>
            <DialogContent>
                <Box mt={1}>
                    <Controller
                        name="reason"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                label="Reason"
                                fullWidth
                                margin="normal"
                            >
                                {Object.values(ReasonType).map((reason) => (
                                    <MenuItem key={reason} value={reason}>
                                        {reason}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />


                    <Controller
                        name="details"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Additional Details"
                                fullWidth
                                multiline
                                rows={3}
                                margin="normal"
                            />
                        )}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
                <Button onClick={handleSubmit(onSubmit)} disabled={reportMutation.isPending} variant="contained" color="primary">
                    Submit Report
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReportDialog;
