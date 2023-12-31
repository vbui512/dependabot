import { RiskType } from "@cbr/common";
import React from "react";
import { color } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const riskIcon = (name: string, color: string) => {
    return <Icon name={name} color={color} size={15} />;
};

export interface IRiskType {
    name: string;
    Icon: (color: string) => JSX.Element;
}

export const riskTypes: { [key: string]: IRiskType } = {
    [RiskType.HEALTH]: {
        name: "Health",
        Icon: (color: string) => riskIcon("hospital-box", color),
    },
    [RiskType.EDUCATION]: {
        name: "Education",
        Icon: (color: string) => riskIcon("school", color),
    },
    [RiskType.SOCIAL]: {
        name: "Social",
        Icon: (color: string) => riskIcon("account-voice", color),
    },
    [RiskType.NUTRITION]: {
        name: "Nutrition",
        Icon: (color: string) => riskIcon("silverware-fork-knife", color),
    },
    [RiskType.MENTAL]: {
        name: "Mental",
        Icon: (color: string) => riskIcon("heart", color),
    },
    CIRCLE: {
        name: "Circle",
        Icon: (color: string) => riskIcon("circle", color),
    },
};
