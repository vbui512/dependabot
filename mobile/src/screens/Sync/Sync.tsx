import { themeColors, timestampToDateTime } from "@cbr/common";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/core";
import React, { useContext, useEffect, useState } from "react";
import { Alert, SafeAreaView, ScrollView, View } from "react-native";
import { Button, Divider, Title, Text, Card, Switch } from "react-native-paper";
import { color } from "react-native-reanimated";
import SyncAlert from "../../components/SyncAlert/SyncAlert";
import { SyncContext } from "../../context/SyncContext/SyncContext";
import { SyncDB, logger } from "../../util/syncHandler";
import useStyles from "./Sync.styles";

export interface ISync {
    lastPulledTime: number;
    remoteChanges: number;
    localChanges: number;
}

const Sync = () => {
    const styles = useStyles();
    const database = useDatabase();
    const [alertMessage, setAlertMessage] = useState<string>();
    const [alertStatus, setAlertStatus] = useState<boolean>();
    const [showSyncModal, setSyncModal] = useState<boolean>(false);
    const { autoSync, setAutoSync, cellularSync, setCellularSync } = useContext(SyncContext);

    const [loading, setLoading] = useState<boolean>(true);
    const isFocused = useIsFocused();
    const [stats, setStats] = useState<ISync>({
        lastPulledTime: 0,
        remoteChanges: 0,
        localChanges: 0,
    });
    console.log(`auto Sync is ${autoSync}`);
    console.log(`cellular Sync  is ${cellularSync}`);

    const resetDatabase = async () => {
        Alert.alert("Alert", "Are you sure you want to reset local database", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Reset",
                onPress: async () => {
                    await database.write(async () => {
                        await database.unsafeResetDatabase();
                    });
                    setAlertStatus(true);
                    setAlertMessage("Database Reset");
                    setSyncModal(true);
                    clearStats();
                },
            },
        ]);
    };

    const updateStats = () => {
        const len = logger.logs.length;
        if (len != 0) {
            let newStats: ISync = {
                lastPulledTime: logger.logs[len - 1].newLastPulledAt,
                remoteChanges: logger.logs[len - 1].remoteChangeCount,
                localChanges: logger.logs[len - 1].localChangeCount,
            };
            setStats(newStats);
        }
    };

    const clearStats = async () => {
        await AsyncStorage.removeItem("SyncStats");
        let newStats: ISync = {
            lastPulledTime: 0,
            remoteChanges: 0,
            localChanges: 0,
        };
        setStats(newStats);
    };

    const retreiveStats = async () => {
        try {
            const value = await AsyncStorage.getItem("SyncStats");
            if (value != null) {
                const result = JSON.parse(value);
                let newStats: ISync = {
                    lastPulledTime: result.lastPulledTime,
                    remoteChanges: result.remoteChanges,
                    localChanges: result.localChanges,
                };
                setStats(newStats);
            }
        } catch (e) {}
    };

    const storeAutoSync = async (value: boolean) => {
        try {
            await AsyncStorage.setItem("autoSyncPref", value.toString());
        } catch (e) {}
    };
    const storeCellularSync = async (value: boolean) => {
        try {
            await AsyncStorage.setItem("cellularSyncPref", value.toString());
        } catch (e) {}
    };

    useEffect(() => {
        if (loading) {
            retreiveStats().then(() => {
                setLoading(false);
            });
        }
    }, [loading]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.groupContainer}>
                <Text style={styles.cardSectionTitle}>Database </Text>
                <Button
                    icon="database-sync"
                    mode="contained"
                    onPress={() => {
                        try {
                            SyncDB(database).then(() => {
                                setAlertStatus(true);
                                setAlertMessage("Synchronization Complete");
                                setSyncModal(true);
                                updateStats();
                            });
                        } catch (e) {
                            setAlertStatus(false);
                            setAlertMessage("Synchronization Failure");
                            setSyncModal(true);
                        }
                    }}
                >
                    Server Sync
                </Button>
                <Button
                    icon="lock-reset"
                    mode="contained"
                    labelStyle={styles.resetBtnLabel}
                    style={styles.resetBtbContainer}
                    onPress={resetDatabase}
                >
                    Reset Local Database
                </Button>
            </View>
            <Divider />
            <Text style={styles.cardSectionTitle}>Sync Statistics</Text>
            <Card style={styles.CardStyle}>
                {!loading ? (
                    <>
                        <View style={styles.row}>
                            <Text style={styles.stats}> Last Pulled at:</Text>
                            {stats.lastPulledTime != 0 ? (
                                <Text>{timestampToDateTime(stats.lastPulledTime)}</Text>
                            ) : (
                                <Text>Never Synced</Text>
                            )}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.stats}> Local Changes:</Text>
                            <Text> {stats.localChanges}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.stats}> Remote Changes:</Text>
                            <Text>{stats.remoteChanges}</Text>
                        </View>
                    </>
                ) : (
                    <></>
                )}
            </Card>
            <Divider />
            <Text style={styles.cardSectionTitle}>Sync Settings</Text>
            <Card style={styles.CardStyle}>
                <View style={styles.row}>
                    <Text style={{ flex: 0.7, paddingRight: 10, margin: 10 }}>
                        Automatic Syncing
                    </Text>
                    <Switch
                        style={styles.switch}
                        trackColor={{ false: themeColors.white, true: themeColors.yellow }}
                        thumbColor={autoSync ? themeColors.white : themeColors.white}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(value) => {
                            setAutoSync(value);
                            storeAutoSync(value);
                        }}
                        value={autoSync}
                    ></Switch>
                </View>
                <View style={styles.row}>
                    <Text style={{ flex: 0.7, paddingRight: 10, margin: 10 }}>
                        Sync over Cellular
                    </Text>
                    <Switch
                        style={styles.switch}
                        trackColor={{ false: themeColors.white, true: themeColors.yellow }}
                        thumbColor={cellularSync ? themeColors.white : themeColors.white}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(value) => {
                            setCellularSync(value);
                            storeCellularSync(value);
                        }}
                        value={cellularSync}
                    ></Switch>
                </View>
            </Card>
            <SyncAlert
                displayMode={alertStatus ? "success" : "failed"}
                displayMsg={alertMessage}
                visibility={showSyncModal}
                dismissAlert={setSyncModal}
            />
        </SafeAreaView>
    );
};

export default Sync;
