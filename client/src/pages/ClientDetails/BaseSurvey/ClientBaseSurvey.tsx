import {
    Button,
    FormControl,
    FormLabel,
    MenuItem,
    Step,
    StepContent,
    StepLabel,
    Stepper,
} from "@material-ui/core";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import React, { useState } from "react";
import {
    fieldLabels,
    FormField,
    initialValidationSchema,
    initialValues,
    otherServicesValidationSchema,
    rateLevelValidationSchema,
} from "./surveyFormFields";
import { handleSubmit } from "./surveyHandler";
import { ArrowBack } from "@material-ui/icons";
import history from "util/history";
import { useParams } from "react-router-dom";
import { useStyles } from "./BaseSurvey.style";
import { Alert } from "@material-ui/lab";
import {
    childNourish,
    deviceType,
    grade,
    isSelfEmployed,
    rateLevel,
    reasonNotSchool,
} from "util/survey";

const surveyTypes: FormField[] = [
    FormField.health,
    FormField.education,
    FormField.social,
    FormField.livelihood,
    FormField.foodAndNutrition,
    FormField.empowerment,
    FormField.shelterAndCare,
];

interface IFormProps {
    formikProps: FormikProps<any>;
}

interface ISurvey {
    label: string;
    Form: (props: IFormProps) => JSX.Element;
    validationSchema: () => any;
}

const HealthForm = () => {
    return (
        <div>
            <FormLabel>Rate your general health</FormLabel>
            <br />
            <br />

            <FormControl fullWidth variant="outlined">
                <Field
                    component={TextField}
                    select
                    variant="outlined"
                    label={fieldLabels[FormField.rateLevel]}
                    name={FormField.rateLevel}
                >
                    {Object.entries(rateLevel).map(([value, { name }]) => (
                        <MenuItem key={value} value={value}>
                            {name}
                        </MenuItem>
                    ))}
                </Field>

                <div>
                    <Field
                        component={CheckboxWithLabel}
                        type="checkbox"
                        name={FormField.getService}
                        Label={{ label: fieldLabels[FormField.getService] }}
                    />
                    <br />
                    <Field
                        component={CheckboxWithLabel}
                        type="checkbox"
                        name={FormField.needService}
                        Label={{ label: fieldLabels[FormField.needService] }}
                    />
                    <br />
                    <Field
                        component={CheckboxWithLabel}
                        type="checkbox"
                        name={FormField.deviceWoking}
                        Label={{ label: fieldLabels[FormField.deviceWoking] }}
                    />
                    <br />

                    <Field
                        component={CheckboxWithLabel}
                        type="checkbox"
                        name={FormField.haveDevice}
                        Label={{ label: fieldLabels[FormField.haveDevice] }}
                    />
                    <br />
                    <Field
                        component={CheckboxWithLabel}
                        type="checkbox"
                        name={FormField.needDevice}
                        Label={{ label: fieldLabels[FormField.needDevice] }}
                    />
                    <br />
                </div>

                <FormLabel>What assistive device do you need?</FormLabel>
                <br />

                <Field
                    component={TextField}
                    select
                    variant="outlined"
                    label={fieldLabels[FormField.deviceType]}
                    name={FormField.deviceType}
                >
                    {Object.entries(deviceType).map(([value, { name }]) => (
                        <MenuItem key={value} value={value}>
                            {name}
                        </MenuItem>
                    ))}
                </Field>

                <FormLabel>Are you satisfied with the health services you receive</FormLabel>
                <br />
                <Field
                    component={TextField}
                    select
                    variant="outlined"
                    label={fieldLabels[FormField.deviceSatisf]}
                    name={FormField.deviceSatisf}
                >
                    {Object.entries(rateLevel).map(([value, { name }]) => (
                        <MenuItem key={value} value={value}>
                            {name}
                        </MenuItem>
                    ))}
                </Field>
            </FormControl>
            <br />
            <br />
        </div>
    );
};

const EducationForm = (props: IFormProps) => {
    const styles = useStyles();

    return (
        <div>
            <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name={FormField.needDevice}
                Label={{ label: fieldLabels[FormField.needDevice] }}
            />
            <br />
            <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name={FormField.goSchool}
                Label={{ label: fieldLabels[FormField.goSchool] }}
            />
            <br />
            <div className={styles.fieldIndent}>
                {props.formikProps.values[FormField.goSchool] ? (
                    <div className={styles.fieldIndent}>
                        <FormControl fullWidth variant="outlined">
                            <FormLabel>What grade?</FormLabel>
                            <br />
                            <Field
                                component={TextField}
                                select
                                variant="outlined"
                                label={fieldLabels[FormField.grade]}
                                name={FormField.grade}
                            >
                                {Object.entries(grade).map(([value, { name }]) => (
                                    <MenuItem key={value} value={value}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Field>
                        </FormControl>
                    </div>
                ) : (
                    <div className={styles.fieldIndent}>
                        <FormControl fullWidth variant="outlined">
                            <FormLabel>Why do you not go to school?</FormLabel>
                            <br />
                            <Field
                                component={TextField}
                                select
                                variant="outlined"
                                label={fieldLabels[FormField.reasonNotSchool]}
                                name={FormField.reasonNotSchool}
                            >
                                {Object.entries(reasonNotSchool).map(([value, { name }]) => (
                                    <MenuItem key={value} value={value}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Field>
                            <Field
                                component={CheckboxWithLabel}
                                type="checkbox"
                                name={FormField.beenSchool}
                                Label={{ label: fieldLabels[FormField.beenSchool] }}
                            />
                        </FormControl>
                    </div>
                )}
            </div>
            <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name={FormField.wantSchool}
                Label={{ label: fieldLabels[FormField.wantSchool] }}
            />
        </div>
    );
};

const SocialForm = () => {
    return (
        <FormControl fullWidth variant="outlined">
            <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name={FormField.feelValue}
                Label={{ label: fieldLabels[FormField.feelValue] }}
            />
            <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name={FormField.feelIndependent}
                Label={{ label: fieldLabels[FormField.feelIndependent] }}
            />
            <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name={FormField.ableInSocial}
                Label={{ label: fieldLabels[FormField.ableInSocial] }}
            />
            <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name={FormField.disabiAffectSocial}
                Label={{ label: fieldLabels[FormField.disabiAffectSocial] }}
            />
            <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name={FormField.disabiDiscrimination}
                Label={{ label: fieldLabels[FormField.disabiDiscrimination] }}
            />
            <br />
        </FormControl>
    );
};

const LivelihoodForm = (props: IFormProps) => {
    const styles = useStyles();

    return (
        <div className={styles.fieldIndent}>
            <FormControl fullWidth variant="outlined">
                <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    name={FormField.isWorking}
                    Label={{ label: fieldLabels[FormField.isWorking] }}
                />
                {props.formikProps.values[FormField.isWorking] && (
                    <div className={styles.fieldIndent}>
                        <FormControl fullWidth variant="outlined">
                            <FormLabel>What do you do?</FormLabel>
                            <br />
                            <Field
                                type="text"
                                component={TextField}
                                variant="outlined"
                                multiline
                                label={fieldLabels[FormField.job]}
                                name={FormField.job}
                            ></Field>
                        </FormControl>
                        <br />
                    </div>
                )}

                <FormLabel>Are you employed or self-employed?</FormLabel>
                <br />
                <Field
                    component={TextField}
                    select
                    variant="outlined"
                    label={fieldLabels[FormField.isSelfEmployed]}
                    name={FormField.reasonNotSchool}
                >
                    {Object.entries(isSelfEmployed).map(([value, { name }]) => (
                        <MenuItem key={value} value={value}>
                            {name}
                        </MenuItem>
                    ))}
                </Field>
                <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    name={FormField.beenSchool}
                    Label={{ label: fieldLabels[FormField.beenSchool] }}
                />
                <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    name={FormField.meetFinanceNeeds}
                    Label={{ label: fieldLabels[FormField.meetFinanceNeeds] }}
                />

                <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    name={FormField.disabiAffectWork}
                    Label={{ label: fieldLabels[FormField.disabiAffectWork] }}
                />

                <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    name={FormField.wantWork}
                    Label={{ label: fieldLabels[FormField.wantWork] }}
                />
            </FormControl>
        </div>
    );
};

const FoodForm = (props: IFormProps) => {
    const styles = useStyles();

    return (
        <div>
            <FormControl fullWidth variant="outlined">
                <FormLabel>Food security</FormLabel>
                <br />
                <Field
                    component={TextField}
                    select
                    variant="outlined"
                    label={fieldLabels[FormField.foodSecurity]}
                    name={FormField.foodSecurity}
                >
                    {Object.entries(rateLevel).map(([value, { name }]) => (
                        <MenuItem key={value} value={value}>
                            {name}
                        </MenuItem>
                    ))}
                </Field>
                <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    name={FormField.enoughFoodPerMonth}
                    Label={{ label: fieldLabels[FormField.enoughFoodPerMonth] }}
                />
                <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    name={FormField.isChild}
                    Label={{ label: fieldLabels[FormField.isChild] }}
                />

                {props.formikProps.values[FormField.isChild] && (
                    <div className={styles.fieldIndent}>
                        <FormControl fullWidth variant="outlined">
                            <FormLabel>What is this child nutritional status?</FormLabel>
                            <br />
                            <Field
                                component={TextField}
                                select
                                variant="outlined"
                                label={fieldLabels[FormField.childNourish]}
                                name={FormField.childNourish}
                            >
                                {Object.entries(childNourish).map(([value, { name }]) => (
                                    <MenuItem key={value} value={value}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Field>
                        </FormControl>
                        <br />
                    </div>
                )}
                {props.formikProps.values[FormField.childNourish] === "MALNOURISHED" && (
                    <div className={styles.fieldIndent}>
                        <FormControl fullWidth variant="outlined">
                            <FormLabel>Please referral to health centre required?</FormLabel>
                        </FormControl>
                        <br />
                    </div>
                )}
            </FormControl>
        </div>
    );
};

const EmpowermentForm = (props: IFormProps) => {
    const styles = useStyles();

    return (
        <div>
            <FormControl fullWidth variant="outlined">
                <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    name={FormField.memOfOrgan}
                    Label={{ label: fieldLabels[FormField.memOfOrgan] }}
                />
                {props.formikProps.values[FormField.memOfOrgan] && (
                    <div className={styles.fieldIndent}>
                        <FormControl fullWidth variant="outlined">
                            <Field
                                component={CheckboxWithLabel}
                                type="checkbox"
                                name={FormField.awareRight}
                                Label={{ label: fieldLabels[FormField.awareRight] }}
                            />

                            <Field
                                component={CheckboxWithLabel}
                                type="checkbox"
                                name={FormField.ableInfluence}
                                Label={{ label: fieldLabels[FormField.ableInfluence] }}
                            />
                        </FormControl>
                        <br />
                    </div>
                )}
            </FormControl>
        </div>
    );
};

const ShelterForm = () => {
    return (
        <div>
            <FormControl fullWidth variant="outlined">
                <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    name={FormField.haveShelter}
                    Label={{ label: fieldLabels[FormField.haveShelter] }}
                />

                <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    name={FormField.accessItem}
                    Label={{ label: fieldLabels[FormField.accessItem] }}
                />
            </FormControl>
        </div>
    );
};

const NewSurvey = () => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [submissionError, setSubmissionError] = useState(false);
    const { clientId } = useParams<{ clientId: string }>();

    const surveys: { [key: string]: ISurvey } = {
        [FormField.health]: {
            label: `${fieldLabels[FormField.health]} Survey`,
            Form: HealthForm,
            validationSchema: rateLevelValidationSchema,
        },
        [FormField.education]: {
            label: `${fieldLabels[FormField.education]} Survey`,
            Form: EducationForm,
            validationSchema: rateLevelValidationSchema,
        },

        [FormField.social]: {
            label: `${fieldLabels[FormField.social]} Survey`,
            Form: SocialForm,
            validationSchema: otherServicesValidationSchema,
        },

        [FormField.social]: {
            label: `${fieldLabels[FormField.social]} Survey`,
            Form: LivelihoodForm,
            validationSchema: otherServicesValidationSchema,
        },

        [FormField.social]: {
            label: `${fieldLabels[FormField.social]} Survey`,
            Form: FoodForm,
            validationSchema: otherServicesValidationSchema,
        },

        [FormField.social]: {
            label: `${fieldLabels[FormField.social]} Survey`,
            Form: EmpowermentForm,
            validationSchema: otherServicesValidationSchema,
        },

        [FormField.social]: {
            label: `${fieldLabels[FormField.social]} Survey`,
            Form: ShelterForm,
            validationSchema: otherServicesValidationSchema,
        },
    };

    const surveySteps: ISurvey[] = [
        {
            label: "Health",
            Form: () => HealthForm(),
            validationSchema: initialValidationSchema,
        },
        {
            label: "Education(under 18)",
            Form: (formikProps) => EducationForm(formikProps),
            validationSchema: initialValidationSchema,
        },
        {
            label: "Social",
            Form: () => SocialForm(),
            validationSchema: initialValidationSchema,
        },
        {
            label: "Livelihood (over 16)",
            Form: (formikProps) => LivelihoodForm(formikProps),
            validationSchema: initialValidationSchema,
        },
        {
            label: "Food and Nutrition",
            Form: (formikProps) => FoodForm(formikProps),
            validationSchema: initialValidationSchema,
        },
        {
            label: "Empowerment",
            Form: (formikProps) => EmpowermentForm(formikProps),
            validationSchema: initialValidationSchema,
        },
        {
            label: "Shelter and Care",
            Form: () => ShelterForm(),
            validationSchema: initialValidationSchema,
        },
    ];
    const isFinalStep = activeStep + 1 === surveyTypes.length && activeStep !== 0;
    const prevStep = () => setActiveStep(activeStep - 1);
    const nextStep = (values: any, helpers: FormikHelpers<any>) => {
        if (isFinalStep) {
            handleSubmit(values, helpers, setSubmissionError);
        } else {
            if (activeStep === 0) {
                helpers.setFieldValue(`${[FormField.client]}`, clientId);
            }
            setActiveStep(activeStep + 1);
            helpers.setSubmitting(false);
            helpers.setTouched({});
        }
    };

    const isNoSurveyChecked = (formikProps: FormikProps<any>) => {
        return !surveyTypes
            .map((serviceType) => Boolean(formikProps.values[serviceType]))
            .reduce((disabledState, serviceState) => disabledState || serviceState);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={surveySteps[activeStep].validationSchema}
            onSubmit={nextStep}
            enableReinitialize
        >
            {(formikProps) => (
                <Form>
                    {submissionError && (
                        <Alert onClose={() => setSubmissionError(false)} severity="error">
                            Something went wrong submitting the survey. Please try again.
                        </Alert>
                    )}
                    <Button onClick={history.goBack}>
                        <ArrowBack /> Go back
                    </Button>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {surveySteps.map((surveyStep, index) => (
                            <Step key={index}>
                                <StepLabel>{surveyStep.label}</StepLabel>
                                <StepContent>
                                    <surveyStep.Form formikProps={formikProps} />
                                    <br />
                                    {activeStep !== 0 && (
                                        <Button
                                            style={{ marginRight: "5px" }}
                                            variant="outlined"
                                            color="primary"
                                            onClick={prevStep}
                                        >
                                            Prev Step
                                        </Button>
                                    )}
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={isNoSurveyChecked(formikProps)}
                                    >
                                        {isFinalStep && index === activeStep
                                            ? "Submit"
                                            : "Next Step"}
                                    </Button>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </Form>
            )}
        </Formik>
    );
};

export default NewSurvey;
