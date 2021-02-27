import { makeStyles } from "@material-ui/core/styles";
import { mediaMobile } from "theme.styles";

export const useStyles = makeStyles(
    {
        timeline: {
            [mediaMobile]: {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
        timelineEntry: {
            margin: 10,
            marginRight: 0,
            padding: 10,
            border: "1px solid #aaa",
            borderRadius: 5,
            fontSize: "120%",
        },
        riskEntry: {
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#eee",
            },
        },
        timelineDate: {
            alignSelf: "center",
            flex: 0,
            paddingLeft: 0,
        },
        hidden: {
            visibility: "hidden",
        },
        textCenter: {
            textAlign: "center",
        },
    },
    { index: 1 }
);
