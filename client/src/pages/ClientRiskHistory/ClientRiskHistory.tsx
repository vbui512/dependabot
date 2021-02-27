import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import { ArrowBack } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { IClient } from "util/clients";
import { apiFetch, Endpoint } from "util/endpoints";
import RiskHistoryCharts from "./RiskHistoryCharts";
import RiskHistoryTimeline from "./RiskHistoryTimeline";

interface IRouteParams {
    clientId: string;
}

enum ReqStatus {
    LOADING,
    LOADED,
    ERROR,
}

const ClientRiskHistory = () => {
    const history = useHistory();
    const { clientId } = useRouteMatch<IRouteParams>().params;
    const [status, setStatus] = useState(ReqStatus.LOADING);
    const [client, setClient] = useState<IClient>();

    useEffect(() => {
        const getClient = async () => {
            try {
                const theClient: IClient = await (
                    await apiFetch(Endpoint.CLIENT, `${clientId}`)
                ).json();

                setClient(theClient);
                setStatus(ReqStatus.LOADED);
            } catch (e) {
                setStatus(ReqStatus.ERROR);
            }
        };

        getClient();
    }, [clientId]);

    return (
        <>
            <Button onClick={history.goBack}>
                <ArrowBack /> Go back
            </Button>
            <br />
            <br />
            {status === ReqStatus.LOADING && <LinearProgress />}
            {status === ReqStatus.ERROR && (
                <Alert severity="error">Something went wrong. Please go back and try again.</Alert>
            )}
            {status === ReqStatus.LOADED && client && (
                <>
                    <Typography variant="h3">
                        {client.first_name} {client.last_name}
                    </Typography>
                    <br />
                    <RiskHistoryCharts risks={client.risks} />
                    <RiskHistoryTimeline client={client} />
                </>
            )}
        </>
    );
};

export default ClientRiskHistory;
