import { ReferralFormField, ReferralFormValues } from "./referralFields";
import { apiFetch, Endpoint, objectToFormData } from "../../util/endpoints";
import { getDisabilities, getOtherDisabilityId } from "../../util/hooks/disabilities";
import { appendPic } from "../../util/referralImageSubmission";
import { appendMobilePict } from "../../util/mobileImageSubmisson";
import { Impairments, MentalConditions } from "../../util/referrals";

const addReferral = async (referralInfo: FormData) => {
    const init: RequestInit = {
        method: "POST",
        body: referralInfo,
    };

    return await apiFetch(Endpoint.REFERRALS, "", init)
        .then((res) => res.json())
        .then((res) => res);
};

export const referralHandleSubmit = async (values: ReferralFormValues, source: string) => {
    console.log("--------- --------- --------- --------- ---------");
    console.log(values);
    const disabilities = await getDisabilities();
    const newReferral = {
        client_id: values[ReferralFormField.client_id],
        wheelchair: values[ReferralFormField.wheelchair],
        wheelchair_experience: values[ReferralFormField.wheelchair]
            ? values[ReferralFormField.wheelchairExperience]
            : "",
        hip_width: values[ReferralFormField.wheelchair] ? values[ReferralFormField.hipWidth] : 0,
        wheelchair_owned: values[ReferralFormField.wheelchair]
            ? values[ReferralFormField.wheelchairOwned]
            : false,
        wheelchair_repairable:
            values[ReferralFormField.wheelchair] && values[ReferralFormField.wheelchairOwned]
                ? values[ReferralFormField.wheelchairRepairable]
                : false,
        physiotherapy: values[ReferralFormField.physiotherapy],
        condition: values[ReferralFormField.physiotherapy]
            ? Number(values[ReferralFormField.condition]) === getOtherDisabilityId(disabilities)
                ? values[ReferralFormField.conditionOther]
                : disabilities.get(Number(values[ReferralFormField.condition]))
            : "",
        prosthetic: values[ReferralFormField.prosthetic],
        prosthetic_injury_location: values[ReferralFormField.prosthetic]
            ? values[ReferralFormField.prostheticInjuryLocation]
            : "",
        orthotic: values[ReferralFormField.orthotic],
        orthotic_injury_location: values[ReferralFormField.orthotic]
            ? values[ReferralFormField.orthoticInjuryLocation]
            : "",

        hha_nutrition_and_agriculture_project:
            values[ReferralFormField.hhaNutritionAndAgricultureProject],
        emergency_food_aid: values[ReferralFormField.emergencyFoodAidRequired],
        agriculture_livelihood_program_enrollment:
            values[ReferralFormField.agricultureLivelihoodProgramEnrollment],

        mental_health: values[ReferralFormField.mentalHealth],
        mental_health_condition: values[ReferralFormField.mentalHealth]
            ? values[ReferralFormField.mentalHealthCondition] === MentalConditions.OTHER
                ? values[ReferralFormField.mentalConditionOther]
                : values[ReferralFormField.mentalHealthCondition]
            : "",

        services_other: values[ReferralFormField.servicesOther]
            ? values[ReferralFormField.otherDescription] === Impairments.OTHER
                ? values[ReferralFormField.referralOther]
                : values[ReferralFormField.otherDescription]
            : "",
    };

    const referralObj = objectToFormData(newReferral);

    //if referral picture exist, then attached into form data
    if (values[ReferralFormField.picture]) {
        if (source === "web") {
            await appendPic(referralObj, values[ReferralFormField.picture]);
        } else {
            await appendMobilePict(referralObj, values[ReferralFormField.picture]);
        }
    }

    return source === "web" ? await addReferral(referralObj) : newReferral;
};
