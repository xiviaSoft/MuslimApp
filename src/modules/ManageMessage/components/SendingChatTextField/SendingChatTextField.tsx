import { CustomTextField } from "@muc/components";
import { Telegram } from "@mui/icons-material";
import { Box } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useSendMessage } from "../../hooks/useSendMessage";
import { CustomButton } from "@muc/components";
import { useToast } from "@muc/context";

interface SendingChatTextFieldProps {
  meUid: string;
  otherUid: string;
} // Maximum messages per user per thread
const SendingChatTextField = ({
  meUid,
  otherUid,
}: SendingChatTextFieldProps) => {
  const methods = useForm({
    defaultValues: {
      messaging: "",
    },
  });

  const { mutateAsync: sendMessage, isPending } = useSendMessage();
  const { showToast } = useToast();

  const submitHandle = async (data: any) => {
    if (!data.messaging.trim()) return;

    try {
      await sendMessage({
        meUid,
        otherUid,
        text: data.messaging.trim(),
      });
      methods.reset();
      showToast("Message sent successfully", "success");
    } catch (err: any) {
      alert(err.message); // shows: "You can send only 5 messages in this chat."
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitHandle)}>
        <Box
          sx={{
            border: "1px solid #d3d3d3",
            height: "80px",
            borderRadius: "8px",
            px: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <CustomTextField
            name="messaging"
            type="text"
            placeholder="Type your message..."
            disabled={isPending}
          />
          <CustomButton
            type="submit"
            icon={<Telegram />}
            isLoading={isPending}
            title={isPending ? "Sending..." : "Send"}
            width="100px"
            height="59px"
          />
        </Box>
      </form>
    </FormProvider>
  );
};

export default SendingChatTextField;
