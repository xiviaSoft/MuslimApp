import { Button, ButtonGroup } from "@mui/material";
import { useState, useEffect } from "react";
import { auth, db } from "@muc/libs";
import { doc, updateDoc, getDoc } from "firebase/firestore";

interface Props {
  field: string; //  dynamic field name
}

const CustomSwitchButton = ({ field }: Props) => {
  const myUid = auth.currentUser?.uid;
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const fetchValue = async () => {
      if (!myUid) return;
      const docSnap = await getDoc(doc(db, "users", myUid));
      setEnabled(docSnap.data()?.[field] ?? true);
    };
    fetchValue();
  }, [myUid, field]);

  const handleToggle = async (value: boolean) => {
    setEnabled(value);
    if (!myUid) return;
    await updateDoc(doc(db, "users", myUid), {
      [field]: value,
    });
  };

  return (
    <ButtonGroup>
      <Button
        variant={enabled ? "contained" : "outlined"}
        onClick={() => handleToggle(true)}
        sx={{ width: 52, height: 40, bgcolor: enabled ? "#5cb85c" : "#fff" }}
      >
        Yes
      </Button>
      <Button
        variant={!enabled ? "contained" : "outlined"}
        onClick={() => handleToggle(false)}
        sx={{ width: 52, height: 40, bgcolor: !enabled ? "#d43f3a" : "#fff" }}
      >
        No
      </Button>
    </ButtonGroup>
  );
};

export default CustomSwitchButton;
