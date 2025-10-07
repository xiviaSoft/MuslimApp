import { Button, ButtonGroup } from "@mui/material";
import { useState, useEffect } from "react";
import { auth, db } from "@muc/libs";
import { doc, updateDoc, getDoc } from "firebase/firestore";


const CustomSwitchButton = () => {


  const myUid = auth.currentUser?.uid;
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchVisibility = async () => {
      if (!myUid) return;
      const docSnap = await getDoc(doc(db, "users", myUid));
      setIsVisible(docSnap.data()?.isVisible ?? true);
    };
    fetchVisibility();
  }, [myUid]);

  const handleToggle = async (value: boolean) => {
    setIsVisible(value);
    if (!myUid) return;
    await updateDoc(doc(db, "users", myUid), { isVisible: value });
  };

  console.log()
  return (
    <ButtonGroup>
      <Button
        variant={isVisible ? "contained" : "outlined"}
        onClick={() => handleToggle(true)}
        sx={{ width: 52, height: 40, bgcolor: isVisible ? "#5cb85c" : "#fff" }}
      >
        Yes
      </Button>
      <Button
        variant={!isVisible ? "contained" : "outlined"}
        onClick={() => handleToggle(false)}
        sx={{ width: 52, height: 40, bgcolor: !isVisible ? "#d43f3a" : "#fff" }}
      >
        No
      </Button>
    </ButtonGroup>
  );
};

export default CustomSwitchButton;
