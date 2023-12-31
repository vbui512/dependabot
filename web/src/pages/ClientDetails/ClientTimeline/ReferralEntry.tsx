import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
    IReferral,
    orthoticInjuryLocations,
    prostheticInjuryLocations,
    wheelchairExperiences,
} from "@cbr/common/util/referrals";
import TimelineEntry from "../Timeline/TimelineEntry";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { useStyles } from "./Entry.styles";
import { timestampToDateTime } from "@cbr/common/util/dates";
import NearMeIcon from "@material-ui/icons/NearMe";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import { apiFetch, Endpoint } from "@cbr/common/util/endpoints";
import { Thumb } from "components/ReferralPhotoView/Thumb";

interface IEntryProps {
    referral: IReferral;
    refreshClient: () => void;
    dateFormatter: (timestamp: number) => string;
}

const ReferralEntry = ({ referral, refreshClient, dateFormatter }: IEntryProps) => {
    const [open, setOpen] = useState(false);
    const styles = useStyles();
    const Summary = ({ clickable }: { clickable: boolean }) => {
        const ReasonChip = ({ label }: { label: string }) => (
            <Chip label={label} clickable={clickable} color="primary" variant="outlined" />
        );

        return (
            <>
                {referral.resolved ? (
                    <CheckCircleIcon fontSize="small" className={styles.completeIcon} />
                ) : (
                    <ScheduleIcon fontSize="small" className={styles.pendingIcon} />
                )}{" "}
                <b>Referral</b> {referral.resolved ? "Resolved" : "Pending"}{" "}
                {referral.wheelchair && <ReasonChip label="Wheelchair" />}{" "}
                {referral.physiotherapy && <ReasonChip label="Physiotherapy" />}{" "}
                {referral.prosthetic && <ReasonChip label="Prosthetic" />}{" "}
                {referral.orthotic && <ReasonChip label="Orthotic" />}{" "}
                {referral.hha_nutrition_and_agriculture_project && <ReasonChip label="Nutrition" />}{" "}
                {referral.mental_health && <ReasonChip label="Mental" />}{" "}
                {referral.services_other && <ReasonChip label="Other" />}{" "}
            </>
        );
    };

    const ResolveForm = () => {
        const outcomeField = {
            key: "outcome",
            label: "Outcome",
        };

        const initialValues = {
            [outcomeField.key]: "",
        };

        const validationSchema = Yup.object().shape({
            [outcomeField.key]: Yup.string().label(outcomeField.label).max(100).trim().required(),
        });

        const handleSubmit = (values: typeof initialValues) => {
            apiFetch(Endpoint.REFERRAL, `${referral.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    resolved: true,
                    [outcomeField.key]: values[outcomeField.key],
                }),
            })
                .then(() => refreshClient())
                .catch(() => alert("Something went wrong. Please try that again."));
        };

        return (
            <Accordion variant="outlined">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                        <b>Resolve</b>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails className={styles.resolveAccordion}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <Field
                                component={TextField}
                                label={outcomeField.label}
                                name={outcomeField.key}
                                variant="outlined"
                                fullWidth
                                required
                            />
                            <br />
                            <br />
                            <Button type="submit" variant="outlined" className={styles.resolveBtn}>
                                Mark Resolved
                            </Button>
                        </Form>
                    </Formik>
                </AccordionDetails>
            </Accordion>
        );
    };

    const ReferralDialog = () => (
        <Dialog fullWidth maxWidth="sm" open={open} onClose={() => setOpen(false)}>
            <DialogTitle>
                <Summary clickable={false} />
            </DialogTitle>
            <DialogContent>
                <b>Referral Date:</b> {timestampToDateTime(referral.date_referred)}
                <br />
                <br />
                {referral.resolved && (
                    <>
                        <b>Resolution Date:</b> {timestampToDateTime(referral.date_resolved)}
                        <br />
                        <b>Outcome:</b> {referral.outcome}
                        <br />
                        <br />
                    </>
                )}
                {referral.wheelchair && (
                    <>
                        <b>Wheelchair Experience: </b>
                        {wheelchairExperiences[referral.wheelchair_experience]}
                        <br />
                        <b>Hip Width:</b> {referral.hip_width} inches
                        <br />
                        <b>Wheelchair Owned?</b> {referral.wheelchair_owned ? "Yes" : "No"}
                        <br />
                        <b>Wheelchair Repairable?</b>{" "}
                        {referral.wheelchair_repairable ? "Yes" : "No"}
                        <br />
                        <Thumb Id={referral.id} Url={referral.picture}></Thumb>
                        <br />
                    </>
                )}
                {referral.physiotherapy && (
                    <>
                        <b>Physiotherapy Condition:</b> {referral.condition}
                        <br />
                        <br />
                    </>
                )}
                {referral.prosthetic && (
                    <>
                        <b>Prosthetic Injury Location: </b>
                        {prostheticInjuryLocations[referral.prosthetic_injury_location]}
                        <br />
                        <br />
                    </>
                )}
                {referral.orthotic && (
                    <>
                        <b>Orthotic Injury Location: </b>
                        {orthoticInjuryLocations[referral.orthotic_injury_location]}
                        <br />
                        <br />
                    </>
                )}
                {referral.hha_nutrition_and_agriculture_project && (
                    <>
                        <b>Emergency Food Aid Required: </b>
                        {referral.emergency_food_aid ? "Yes" : "No"}
                        <br />
                        <b>Agriculture Livelihood Program Enrollment Required: </b>
                        {referral.agriculture_livelihood_program_enrollment ? "Yes" : "No"}
                        <br />
                        <br />
                    </>
                )}
                {referral.mental_health && (
                    <>
                        <b>Mental Health Condition: </b>
                        {referral.mental_health_condition}
                        <br />
                        <br />
                    </>
                )}
                {Boolean(referral.services_other.trim().length) && (
                    <>
                        <b>Other Services Required:</b> {referral.services_other}
                        <br />
                        <br />
                    </>
                )}
                {!referral.resolved && <ResolveForm />}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <>
            <TimelineEntry
                date={dateFormatter(referral.date_referred)}
                content={<Summary clickable={true} />}
                DotIcon={NearMeIcon}
                onClick={() => setOpen(true)}
            />
            <ReferralDialog />
        </>
    );
};

export default ReferralEntry;
