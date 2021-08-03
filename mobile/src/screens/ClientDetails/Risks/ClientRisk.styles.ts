import { themeColors } from "@cbr/common";
import { StyleSheet } from "react-native";

const useStyles = () =>
    StyleSheet.create({
        cardSectionTitle: {
            textAlign: "center",
            marginTop: 14,
            marginBottom: 14,
            fontSize: 32,
        },
        riskCardStyle: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
            marginBottom: 20,
            paddingBottom: 15,
            paddingTop: 15,
            alignItems: "center",
            borderRadius: 20,
        },
        riskCardContentStyle: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            height: 70,
            width: 350,
            marginTop: 15,
        },
        riskTitleStyle: {
            marginTop: 10,
            fontSize: 32,
            justifyContent: "center",
            fontWeight: "bold",
            //Add colour here
        },
        riskHeaderStyle: {
            marginTop: 14,
            marginBottom: 2,
            fontSize: 18,
            justifyContent: "flex-start",
            fontWeight: "bold",
        },
        riskRequirementStyle: {
            fontSize: 16,
            justifyContent: "flex-start",
        },
        clientDetailsFinalView: {
            alignItems: "center",
            justifyContent: "flex-end",
            display: "flex",
            flexDirection: "row",
            height: 40,
            width: 350,
            marginTop: 15,
            marginBottom: 15,
        },
        clientDetailsFinalButtons: {
            padding: 3,
            marginTop: 3,
            marginBottom: 15,
            marginLeft: 10,
            marginRight: 10,
            width: 112,
            borderRadius: 5,
        },
        modalStyle: {
            height: 450,
            marginHorizontal: 20,
            marginTop: 140,
            display: "flex",
            backgroundColor: "white",
            borderRadius: 10,
            justifyContent: "space-between",
        },
        riskTextStyle: {
            alignContent: "flex-start",
            marginTop: 10,
            marginBottom: 10,
            height: 100,
            width: 320,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
            borderRadius: 5,
            borderWidth: 1,
            padding: 10,
            borderColor: themeColors.blueBgDark,
        },
        riskLevelTextStyle: {
            alignContent: "flex-start",
            marginTop: 10,
            width: 320,
            marginBottom: 10,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
            borderRadius: 5,
            borderWidth: 1,
            padding: 10,
            borderColor: themeColors.blueBgDark,
        },
        riskModalStyle: {
            alignContent: "center",
            alignItems: "center",
            padding: 10,
        },
    });

export default useStyles;

export const riskStyles = (textColour: string) =>
    StyleSheet.create({
        riskSubtitleStyle: {
            fontWeight: "bold",
            height: "auto",
            width: "auto",
            padding: 14,
            marginTop: 14,
            fontSize: 18,
            alignItems: "center",
            justifyContent: "flex-end",
            display: "flex",
            flexDirection: "row",
            color: textColour,
            borderColor: textColour,
            borderRadius: 5,
            borderWidth: 1,
        },
    });
