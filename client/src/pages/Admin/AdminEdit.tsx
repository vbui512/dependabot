import { useStyles } from "./styles";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import {
    fieldLabels,
    AdminField,
    workerOptions,
    IUser,
    validationEditSchema,
    IRouteParams,
} from "./fields";
import Button from "@material-ui/core/Button";
import { useRouteMatch } from "react-router-dom";
import { FormControl, MenuItem } from "@material-ui/core";
import { useState, useEffect } from "react";
import { handleCancel, handleEditSubmit } from "./handler";
import { getAllZones, IZone } from "util/cache";
import { Alert } from "@material-ui/lab";
import { apiFetch, Endpoint } from "util/endpoints";

const AdminEdit = () => {
    const styles = useStyles();
    const { userId } = useRouteMatch<IRouteParams>().params;
    const [user, setUser] = useState<IUser>();
    const [zoneOptions, setZoneOptions] = useState<IZone[]>([]);
    const [loadingError, setLoadingError] = useState(false);

    useEffect(() => {
        const getInfo = async () => {
            try {
                const theUser: IUser = (await (
                    await apiFetch(Endpoint.USER, `${userId}`)
                ).json()) as IUser;
                setUser(theUser);
                const zones = await getAllZones();
                setZoneOptions(zones);
            } catch (e) {
                setLoadingError(true);
            }
        };
        getInfo();
    }, [userId]);

    const handleDisable = () => {
        if (user) {
            user.is_active = !user.is_active;
        }
    };

    return user ? (
        <>
            <Formik
                initialValues={user}
                validationSchema={validationEditSchema}
                onSubmit={handleEditSubmit}
            >
                {({ isSubmitting }) => (
                    <div className={styles.container}>
                        {loadingError ? (
                            <Alert severity="error">
                                Something went wrong trying to load that user. Please go back and
                                try again.
                            </Alert>
                        ) : (
                            <>
                                <b>ID</b>
                                <p>{userId}</p>
                                <b>Username </b>
                                <p>{user.username}</p>
                                <Form>
                                    <Grid container spacing={2}>
                                        <Grid item md={6} xs={12}>
                                            <Field
                                                component={TextField}
                                                name={AdminField.first_name}
                                                variant="outlined"
                                                label={fieldLabels[AdminField.first_name]}
                                                required
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <Field
                                                component={TextField}
                                                name={AdminField.last_name}
                                                variant="outlined"
                                                label={fieldLabels[AdminField.last_name]}
                                                required
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                                <Field
                                                    component={TextField}
                                                    fullWidth
                                                    select
                                                    variant="outlined"
                                                    required
                                                    label={fieldLabels[AdminField.zone]}
                                                    name={AdminField.zone}
                                                >
                                                    {zoneOptions.map((option) => (
                                                        <MenuItem key={option.id} value={option.id}>
                                                            {option.zone_name}
                                                        </MenuItem>
                                                    ))}
                                                </Field>
                                            </FormControl>
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <Field
                                                component={TextField}
                                                fullWidth
                                                required
                                                variant="outlined"
                                                label={fieldLabels[AdminField.phone_number]}
                                                name={AdminField.phone_number}
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                                <Field
                                                    component={TextField}
                                                    select
                                                    required
                                                    variant="outlined"
                                                    label={fieldLabels[AdminField.type]}
                                                    name={AdminField.type}
                                                >
                                                    {Object.entries(workerOptions).map(
                                                        ([value, name]) => (
                                                            <MenuItem key={value} value={value}>
                                                                {name}
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </Field>
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <br />
                                    <b>Status</b>
                                    <p>{user.is_active ? "Active" : "Disabled"}</p>
                                    <br />
                                    <Grid
                                        container
                                        direction="row"
                                        spacing={2}
                                        justify="space-between"
                                        alignItems="center"
                                    >
                                        <Button
                                            variant="contained"
                                            className={
                                                user.is_active
                                                    ? styles["disableBtn"]
                                                    : styles["activeBtn"]
                                            }
                                            disabled={isSubmitting}
                                            onClick={handleDisable}
                                        >
                                            {user.is_active ? "Disable" : "Activate"}
                                        </Button>
                                        <Grid item>
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={styles.btn}
                                            >
                                                Save
                                            </Button>

                                            <Button
                                                color="primary"
                                                variant="outlined"
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            </>
                        )}
                    </div>
                )}
            </Formik>
        </>
    ) : (
        <Alert severity="error">
            Something went wrong trying to load that user. The user might not exist, Please go back
            and try again.
        </Alert>
    );
};

export default AdminEdit;
