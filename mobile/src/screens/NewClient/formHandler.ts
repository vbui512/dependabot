import { handleNewClientSubmit, TClientValues } from "@cbr/common";
import { FormikHelpers } from "formik";
import { StackScreenName } from "../../util/StackScreenName";
import { AppStackNavProp } from "../../util/stackScreens";

// TODO: profile picture does not upload correctly to server
export const handleSubmit = async (
    values: TClientValues,
    helpers: FormikHelpers<TClientValues>,
    navigation: AppStackNavProp,
    scrollToTop: () => void
) => {
    helpers.setSubmitting(true);
    return handleNewMobileClientSubmit(values, helpers, "mobile").then((res) => {
        if (res) {
            scrollToTop();
            navigation.navigate(StackScreenName.CLIENT, {
                clientID: res.id,
            });
            helpers.resetForm();
        }
    });
};
