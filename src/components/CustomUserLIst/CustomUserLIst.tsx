import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React from "react";


interface ListProps {
    name?: string;
    img?: string;
    bio?: string;

}


const CustomUserLIst = ({ img, name, bio }: ListProps) => {
    return (
        <List sx={{ width: '100%', maxWidth: 300, }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={name} src={img} />
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                sx={{ color: 'text.primary', display: 'inline' }}
                            >
                                {bio}
                            </Typography>

                        </React.Fragment>
                    }
                />

            </ListItem>
            <Divider variant="inset" component="li" />


        </List>
    );
}



export default CustomUserLIst
