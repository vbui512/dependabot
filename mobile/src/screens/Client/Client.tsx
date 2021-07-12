import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
    Button,
    Card,
    TextInput,
    Checkbox,
    Menu,
    Divider,
    ActivityIndicator,
} from "react-native-paper";
import { ClientDTO } from "./ClientRequests";
import clientStyle from "./Client.styles";
import { Platform, Text, View } from "react-native";
import { fetchClientDetailsFromApi } from "./ClientRequests";
import { IReferral, ISurvey, timestampToDateObj } from "../../../node_modules/@cbr/common";
import { useDisabilities } from "../../../node_modules/@cbr/common/src/util/hooks/disabilities";
import { IVisitSummary } from "../../util/visits";
import { ActivityDTO, ActivityType, SummaryActivity } from "./Activity";
import { TimeLineDate } from "./TimeLineDate";
import { useZones } from "@cbr/common/src/util/hooks/zones";

import { ClientDetails } from "./ClientDetails";

/*
    Use client image instead of randomly generated
    Get disabilities details from making the disability API call and map them (done but haven't implemented correctly)
    Change the dropdown menu to a picker like in the baseline survey
    Change risk card edit button to popup instead of text box (or can be either)
    Create component that displays surveys being done
*/

interface ClientProps {
    clientID: number;
}

const Client = (props: ClientProps) => {
    const styles = clientStyle();
    var zoneList = useZones();
    var disabilityList = useDisabilities();
    const [loading, setLoading] = useState(true);

    //Main Client Variables
    const [presentClient, setPresentClient] = useState<ClientDTO>();
    const [date, setDate] = useState(new Date());
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [village, setVillage] = useState("");
    const [gender, setGender] = useState("");
    const [zone, setZone] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [caregiverPresent, setCaregiverPresent] = React.useState(false);
    const [caregiverName, setCaregiverName] = React.useState("");
    const [caregiverEmail, setCaregiverEmail] = React.useState("");
    const [caregiverPhone, setCaregiverPhone] = React.useState("");
    const [clientDisability, setDisability] = useState<string[]>([]);

    //Variables that cannot be edited and are for read only
    const [clientCreateDate, setClientCreateDate] = useState(0);
    const [clientVisits, setClientVisits] = useState<IVisitSummary[]>();
    const [clientReferrals, setClientReferrals] = useState<IReferral[]>();
    const [clientSurveys, setClientSurveys] = useState<ISurvey[]>();
    const [allRecentActivity, setRecentActivity] = useState<ActivityDTO[]>();

    const getClientDetails = async () => {
        const presentClient = await fetchClientDetailsFromApi(props.clientID);
        setPresentClient(presentClient);
        setDate(timestampToDateObj(Number(presentClient?.birthdate)));
        setFirstName(presentClient.first_name);
        setLastName(presentClient.last_name);
        setVillage(presentClient.village);
        setZone(Array.from(zoneList.entries())[presentClient.zone][1]);
        setPhoneNumber(presentClient.phoneNumber);
        setCaregiverPresent(presentClient.careGiverPresent);
        setGender(presentClient.gender);
        if (caregiverPresent) {
            setCaregiverName(presentClient.careGiverName);
            setCaregiverPhone(presentClient.careGiverPhoneNumber);
            setCaregiverEmail(presentClient.careGiverEmail);
        }

        setClientCreateDate(presentClient.clientCreatedDate);
        setClientVisits(presentClient.clientVisits);
        setClientReferrals(presentClient.clientReferrals);
        setClientSurveys(presentClient.clientSurveys);
    };
    useEffect(() => {
        getClientDetails()
            .then(() => {
                var tempDisabilityList: string[] = [];
                const setDisabilityList = () => {
                    if (presentClient)
                        for (let entry of presentClient.disabilities) {
                            tempDisabilityList.push(
                                Array.from(disabilityList.entries())[entry - 1][1]
                            );
                        }
                    setDisability(tempDisabilityList);
                };
            })
            .then(() => {
                setLoading(false);
            });
    }, []);

    //Overall Screen editable toggle variables
    const [editMode, setEditMode] = React.useState(true);
    const [cancelButtonType, setCancelButtonType] = React.useState("outlined");
    const enableButtons = () => {
        if (editMode == true) {
            setEditMode(false);
            setCancelButtonType("contained");
        } else {
            //Make the PUT Api Call to edit client here since this is the save click
            setEditMode(true);
            setCancelButtonType("outlined");
        }
    };

    //Activity component rendering
    var tempActivity: ActivityDTO[];
    tempActivity = [];
    if (clientVisits) {
        clientVisits.map((presentVisit) => {
            tempActivity.push({
                type: ActivityType.VISIT,
                date: presentVisit.date_visited,
                visit: presentVisit,
                referral: undefined,
                survey: undefined,
            });
        });
    }
    if (clientReferrals) {
        clientReferrals.map((presentRef) => {
            tempActivity.push({
                type: ActivityType.REFERAL,
                date: presentRef.date_referred,
                visit: undefined,
                referral: presentRef,
                survey: undefined,
            });
        });
    }
    if (clientSurveys) {
        clientSurveys.map((presentSurvey) => {
            tempActivity.push({
                type: ActivityType.SURVEY,
                date: presentSurvey.survey_date,
                visit: undefined,
                referral: undefined,
                survey: presentSurvey,
            });
        });
    }

    tempActivity.sort((a, b) => (a.date > b.date ? -1 : 1));

    const recentActivity = () => {
        if (clientVisits)
            return (
                <View>
                    {tempActivity.map((presentVisit) => {
                        return <SummaryActivity activity={presentVisit}></SummaryActivity>;
                    })}
                    <TimeLineDate date={clientCreateDate}></TimeLineDate>
                </View>
            );
        else
            return (
                <View>
                    <TimeLineDate date={clientCreateDate}></TimeLineDate>
                </View>
            );
    };

    return (
        <ScrollView style={styles.scrollViewStyles}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#273364" />
                </View>
            ) : (
                <View>
                    <Card style={styles.clientCardContainerStyles}>
                        <Card.Cover
                            style={styles.clientCardImageStyle}
                            source={{ uri: "https://picsum.photos/700" }}
                        />
                        <Button mode="contained" style={styles.clientButtons}>
                            New Visit
                        </Button>
                        <Button mode="contained" style={styles.clientButtons}>
                            New Referral
                        </Button>
                        <Button mode="contained" style={styles.clientButtons}>
                            Baseline Survey
                        </Button>
                    </Card>
                    <Divider></Divider>
                    <Text style={styles.cardSectionTitle}>Client Details</Text>
                    <Divider></Divider>
                    <Card style={styles.clientDetailsContainerStyles}>
                        <ClientDetails
                            firstName={firstName}
                            lastName={lastName}
                            date={date}
                            gender={gender}
                            village={village}
                            zone={zone}
                            phone={phoneNumber}
                            caregiverPresent={caregiverPresent}
                            caregiverName={caregiverName}
                            caregiverEmail={caregiverEmail}
                            caregiverPhone={caregiverPhone}
                            clientDisability={clientDisability}
                        />
                    </Card>
                    <Divider></Divider>
                    <Text style={styles.cardSectionTitle}>Client Risks</Text>
                    <Divider></Divider>
                    <Card style={styles.riskCardStyle}>
                        <View style={styles.riskCardContentStyle}>
                            <Text style={styles.riskTitleStyle}>Health</Text>
                            <Text style={styles.riskSubtitleStyle}>CRITICAL</Text>
                        </View>
                        <View>
                            <Text style={styles.riskHeaderStyle}>Requirements: </Text>
                            <Text style={styles.riskRequirementStyle}>Requrements go here</Text>
                        </View>
                        <View>
                            <Text style={styles.riskHeaderStyle}>Goals: </Text>
                            <Text style={styles.riskRequirementStyle}>Goals go here</Text>
                        </View>
                        <View style={styles.clientDetailsFinalView}>
                            <Button
                                mode="contained"
                                style={styles.clientDetailsFinalButtons}
                                disabled={false}
                                onPress={enableButtons}
                            >
                                {editMode ? "Edit" : "Save"}
                            </Button>
                        </View>
                    </Card>
                    <Divider></Divider>
                    <Card style={styles.riskCardStyle}>
                        <View style={styles.riskCardContentStyle}>
                            <Text style={styles.riskTitleStyle}>Education</Text>
                            <Text style={styles.riskSubtitleStyle}>CRITICAL</Text>
                        </View>
                        <View>
                            <Text style={styles.riskHeaderStyle}>Requirements: </Text>
                            <Text style={styles.riskRequirementStyle}>Requrements go here</Text>
                        </View>
                        <View>
                            <Text style={styles.riskHeaderStyle}>Goals: </Text>
                            <Text style={styles.riskRequirementStyle}>Goals go here</Text>
                        </View>
                        <View style={styles.clientDetailsFinalView}>
                            <Button
                                mode="contained"
                                style={styles.clientDetailsFinalButtons}
                                disabled={false}
                                onPress={enableButtons}
                            >
                                {editMode ? "Edit" : "Save"}
                            </Button>
                        </View>
                    </Card>
                    <Divider></Divider>
                    <Card style={styles.riskCardStyle}>
                        <View style={styles.riskCardContentStyle}>
                            <Text style={styles.riskTitleStyle}>Social</Text>
                            <Text style={styles.riskSubtitleStyle}>CRITICAL</Text>
                        </View>
                        <View>
                            <Text style={styles.riskHeaderStyle}>Requirements: </Text>
                            <Text style={styles.riskRequirementStyle}>Requrements go here</Text>
                        </View>
                        <View>
                            <Text style={styles.riskHeaderStyle}>Goals: </Text>
                            <Text style={styles.riskRequirementStyle}>Goals go here</Text>
                        </View>
                        <View style={styles.clientDetailsFinalView}>
                            <Button
                                mode="contained"
                                style={styles.clientDetailsFinalButtons}
                                disabled={false}
                                onPress={enableButtons}
                            >
                                {editMode ? "Edit" : "Save"}
                            </Button>
                        </View>
                    </Card>
                    <Divider></Divider>
                    <Card style={styles.riskCardStyle}>
                        <View style={styles.activityCardContentStyle}>
                            <Text style={styles.riskTitleStyle}>Visits, Referrals & Surveys</Text>
                        </View>
                        <View>{recentActivity()}</View>
                        <View style={styles.clientDetailsFinalView}></View>
                    </Card>
                </View>
            )}
        </ScrollView>
    );
};

export default Client;
