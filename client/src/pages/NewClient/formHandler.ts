import { FormikHelpers } from "formik";
import { TFormValues } from "./formFields";
import { Endpoint, apiFetch } from "../../util/endpoints";
import history from "../../util/history";
import { timestampFromFormDate } from "util/dates";

const addClient = async (clientInfo: FormData) => {
    const init: RequestInit = {
        method: "POST",
        body: clientInfo,
    };

    return await apiFetch(Endpoint.CLIENTS, "", init)
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            return res;
        });
};

// TODO: implement latitude/longitude functionality (Added 0.0 for now as they are required fields in the database.)
export const handleSubmit = async (values: TFormValues, helpers: FormikHelpers<TFormValues>) => {
    const newClient = {
        birth_date: timestampFromFormDate(values.birthDate),
        disability: values.disability,
        first_name: values.firstName,
        last_name: values.lastName,
        gender: values.gender,
        phone_number: values.phoneNumber,
        longitude: 0.0,
        latitude: 0.0,
        zone: values.zone,
        village: values.village,
        caregiver_present: values.caregiverPresent,
        caregiver_name: values.caregiverName,
        caregiver_phone: values.caregiverPhone,
        caregiver_email: values.caregiverEmail,
        health_risk: {
            risk_level: values.healthRisk,
            requirement: values.healthRequirements,
            goal: values.healthGoals,
        },
        social_risk: {
            risk_level: values.socialRisk,
            requirement: values.socialRequirements,
            goal: values.socialGoals,
        },
        educat_risk: {
            risk_level: values.educationRisk,
            requirement: values.educationRequirements,
            goal: values.educationGoals,
        },
    };

    const formData = new FormData();
    Object.entries(newClient).forEach(([key, val]) => {
        const vals = Array.isArray(val) ? val : [val];
        vals.forEach((v) => formData.append(key, String(v)));
    });

    // TODO: creating client fails when using formData.
    // const clientProfilePicture = await (await fetch(values.picture)).blob();
    // formData.append(
    //     "picture",
    //     clientProfilePicture,
    //     Math.random().toString(36).substring(7) + ".png"
    // );
    // console.log(clientProfilePicture);

    try {
        const client = await addClient(formData);
        history.push(`/client/${client.id}`);
    } catch (e) {
        alert("Encountered an error while trying to create the client!");
        helpers.setSubmitting(false);
    }
};

export const handleReset = (resetForm: () => void) => {
    if (window.confirm("Are you sure you want to clear the form?")) {
        resetForm();
    }
};
