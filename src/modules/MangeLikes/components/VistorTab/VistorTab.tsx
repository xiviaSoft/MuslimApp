import { CustomUserList } from "@muc/components";
import { COLORS } from "@muc/constants";
import { auth, db } from "@muc/libs";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const VisitorTab = () => {
    const [visitorUsers, setVisitorUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchVisitors = async () => {
            if (!auth.currentUser?.uid) return;

            // ✅ Get my user document
            const userRef = doc(db, "users", auth.currentUser.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) return;

            
            const visitorIds: string[] = userSnap.data().visits || [];
            console.log(visitorIds, "this is visitor ids");

            if (visitorIds.length === 0) {
                setVisitorUsers([]);
                return;
            }

            // ✅ Query users by their IDs (max 10 at a time)
            const q = query(collection(db, "users"), where("__name__", "in", visitorIds));
            const snap = await getDocs(q);

            const users = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setVisitorUsers(users);
        };

        fetchVisitors();
    }, []);

    console.log(visitorUsers, "this is visitor users");

    return (
        <Stack
            sx={{
                bgcolor: "white",
                padding: "20px",
                mb: "20px",
                width: "100%",
            }}
        >
            <Typography
                variant="h6"
                component={"h3"}
                sx={{ color: COLORS.gray.lightGray, padding: "8px 16px" }}
            >
                Members that have visited my profile
            </Typography>

            <Box>
                <Grid container spacing={2} sx={{ p: 2 }}>
                    {visitorUsers.length > 0 ? (
                        visitorUsers.map((user) => (
                            <Grid key={user.id} item md={4} sm={6} xs={12}>
                                <CustomUserList
                                    bio={user.bio || "no bio available"}
                                    name={`${user.firstName || ""} ${user.lastName || ""}`}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Typography
                            variant="body1"
                            sx={{ color: COLORS.gray.main, textAlign: "center", width: "100%" }}
                        >
                            No one has visited your profile yet.
                        </Typography>
                    )}
                </Grid>
            </Box>
        </Stack>
    );
};

export default VisitorTab;
