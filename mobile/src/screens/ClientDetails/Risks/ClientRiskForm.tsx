import * as React from "react";
import { Component, Dispatch, SetStateAction } from "react";
import { View, TextInput as NativeText } from "react-native";
import { Button, Modal, Portal, TextInput, Text, Menu, RadioButton } from "react-native-paper";
import { useState } from "react";
import useStyles, { riskStyles } from "./ClientRisk.styles";
import {
    handleMobileSubmit,
    handleSubmit,
    IRisk,
    RiskLevel,
    riskLevels,
    RiskType,
    toastValidationError,
    validationSchema,
} from "@cbr/common";
import { Formik } from "formik";

export interface ClientRiskFormProps {
    riskData: IRisk;
    setRisk: (risk: IRisk) => void;
}

export const ClientRiskForm = (props: ClientRiskFormProps) => {
    const styles = useStyles();
    const [showModal, setShowModal] = useState(false);
    return (
        <View style={styles.riskModalStyle}>
            <Button
                mode="contained"
                style={styles.modalUpdateButton}
                onPress={() => {
                    setShowModal(true);
                }}
            >
                Update
            </Button>
            <Formik
                initialValues={props.riskData}
                onSubmit={(values) => {
                    handleSubmit(values, props.riskData, props.setRisk);
                    console.log(values);
                }}
                validationSchema={validationSchema}
            >
                {(formikProps) => (
                    <Portal>
                        <Modal
                            visible={showModal}
                            style={styles.modalStyle}
                            onDismiss={() => {
                                setShowModal(false);
                                formikProps.resetForm();
                            }}
                        >
                            {formikProps.values.risk_type === RiskType.HEALTH ? (
                                <Text style={styles.riskHeaderStyle}>Update Health Risk</Text>
                            ) : (
                                <></>
                            )}
                            {formikProps.values.risk_type === RiskType.EDUCATION ? (
                                <Text style={styles.riskHeaderStyle}>Update Education Risk</Text>
                            ) : (
                                <></>
                            )}
                            {formikProps.values.risk_type === RiskType.SOCIAL ? (
                                <Text style={styles.riskHeaderStyle}>Update Social Risk</Text>
                            ) : (
                                <></>
                            )}
                            <RadioButton.Group
                                onValueChange={(newValue) =>
                                    formikProps.setFieldValue("risk_level", newValue)
                                }
                                value={formikProps.values.risk_level}
                            >
                                <View style={styles.menuField}>
                                    <View style={styles.radioIndividual}>
                                        <Text
                                            style={
                                                riskStyles(riskLevels[RiskLevel.LOW].color)
                                                    .riskRadioStyle
                                            }
                                        >
                                            {RiskLevel.LOW}
                                        </Text>
                                        <RadioButton value={RiskLevel.LOW} />
                                    </View>
                                    <View style={styles.radioIndividual}>
                                        <Text
                                            style={
                                                riskStyles(riskLevels[RiskLevel.MEDIUM].color)
                                                    .riskRadioStyle
                                            }
                                        >
                                            {RiskLevel.MEDIUM}
                                        </Text>
                                        <RadioButton value={RiskLevel.MEDIUM} />
                                    </View>
                                    <View style={styles.radioIndividual}>
                                        <Text
                                            style={
                                                riskStyles(riskLevels[RiskLevel.HIGH].color)
                                                    .riskRadioStyle
                                            }
                                        >
                                            {RiskLevel.HIGH}
                                        </Text>
                                        <RadioButton value={RiskLevel.HIGH} />
                                    </View>
                                    <View style={styles.radioIndividual}>
                                        <Text
                                            style={
                                                riskStyles(riskLevels[RiskLevel.CRITICAL].color)
                                                    .riskRadioStyle
                                            }
                                        >
                                            {RiskLevel.CRITICAL}
                                        </Text>
                                        <RadioButton value={RiskLevel.CRITICAL} />
                                    </View>
                                </View>
                            </RadioButton.Group>

                            <TextInput
                                style={styles.riskTextStyle}
                                label={"Requirements"}
                                defaultValue={formikProps.values.requirement}
                                onChangeText={formikProps.handleChange("requirement")}
                                multiline={true}
                                textAlignVertical={"top"}
                                mode={"outlined"}
                            />
                            <Text style={styles.formikErrorStyle}>
                                {formikProps.errors.requirement}
                            </Text>
                            <TextInput
                                style={styles.riskTextStyle}
                                label={"Goals"}
                                defaultValue={formikProps.values.goal}
                                onChangeText={formikProps.handleChange("goal")}
                                placeholder={"Goals"}
                                multiline={true}
                                textAlignVertical={"top"}
                                mode={"outlined"}
                            />
                            <Text style={styles.formikErrorStyle}>{formikProps.errors.goal}</Text>
                            <Button
                                mode={"contained"}
                                style={styles.submitButtonStyle}
                                onPress={() => {
                                    if (formikProps.isValid) {
                                        formikProps.handleSubmit();
                                        setShowModal(false);
                                    } else {
                                        toastValidationError();
                                    }
                                }}
                            >
                                Save
                            </Button>
                        </Modal>
                    </Portal>
                )}
            </Formik>
        </View>
    );
};
