import React from "react";
import { Box, Collapse, IconButton } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@material-ui/lab";

const AlertNotification = (props: any) => {
    return (
        <Box>
            <Collapse in={props.setOpen}>
                <Alert
                    severity="info"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                props.setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    New message! — <b>{props.alertInfo["subject"]}:</b> "
                    {props.alertInfo["alert_message"]}"
                </Alert>
            </Collapse>
        </Box>
    );
};

export default AlertNotification;
