import React, { useEffect } from "react";
import { Text, View, Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { DataTable } from "react-native-paper";
import useStyles from "./ClientList.styles";
import { ClientListRow, fetchClientsFromApi as fetchClientsFromApi } from "./ClientListRequest";
import { riskTypes } from "../../util/riskIcon";
import { useState } from "react";
import { Searchbar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { SearchOption, themeColors, useZones } from "@cbr/common";
const styles = useStyles();
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackScreenName } from "../../util/StackScreenName";
import { AppStackNavProp } from "../../util/stackScreens";
import {
    SortOptions,
    sortBy,
    arrowDirectionController,
    clientComparator,
} from "../../util/listFunctions";
import { WrappedText } from "../../components/WrappedText/WrappedText";

const ClientList = () => {
    const navigation = useNavigation<AppStackNavProp>();
    const [clientList, setClientList] = useState<ClientListRow[]>([]);
    const [selectedSearchOption, setSearchOption] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [allClientsMode, setAllClientsMode] = useState<boolean>(true);
    const [sortDirection, setIsSortDirection] =
        useState<"ascending" | "descending" | "None">("None");
    const [sortOption, setSortOption] = useState("");
    const zones = useZones();
    const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query);
    const clientSortby = (option: string) => {
        sortBy(option, sortOption, sortDirection, setSortOption, setIsSortDirection);
    };

    const clientListScreenComparator = (a: ClientListRow, b: ClientListRow) => {
        return clientComparator(a, b, sortOption, sortDirection);
    };

    const newClientGet = async () => {
        var exampleClient = await fetchClientsFromApi(
            selectedSearchOption,
            searchQuery,
            allClientsMode
        );
        if (sortDirection !== "None") {
            exampleClient = exampleClient.sort(clientListScreenComparator);
        }
        setClientList(exampleClient);
    };
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            newClientGet();
        }
    }, [selectedSearchOption, searchQuery, allClientsMode, sortOption, sortDirection, isFocused]);
    useEffect(() => {
        var exampleClient = clientList;
        if (sortDirection !== "None") {
            exampleClient = exampleClient.sort(clientListScreenComparator);
        }
        setClientList(exampleClient);
    }, [sortOption, sortDirection]);
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {selectedSearchOption === SearchOption.ZONE ? (
                    <Picker
                        style={styles.select}
                        selectedValue={searchQuery}
                        onValueChange={(itemValue, itemIndex) => setSearchQuery(itemValue)}
                    >
                        <Picker.Item label="N/A" value="" />
                        {Array.from(zones).map(([id, name]) => (
                            <Picker.Item key={id} label={name} value={id} />
                        ))}
                    </Picker>
                ) : (
                    <Searchbar
                        style={styles.search}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />
                )}
            </View>
            <View style={styles.row}>
                <Text style={{ flex: 0.7, paddingRight: 10, margin: 10 }}>My Clients</Text>
                <Switch
                    style={{ flex: 0.2 }}
                    trackColor={{ false: themeColors.yellow, true: themeColors.yellow }}
                    thumbColor={allClientsMode ? themeColors.white : themeColors.white}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={setAllClientsMode}
                    value={allClientsMode}
                />
                <Text style={styles.container}>All Clients</Text>

                <Text style={{ textAlign: "center", fontSize: 16 }}>Filter by</Text>
                <Picker
                    style={styles.select}
                    selectedValue={selectedSearchOption}
                    onValueChange={(itemValue, itemIndex) => {
                        setSearchOption(itemValue);
                        setSearchQuery("");
                    }}
                >
                    <Picker.Item label="N/A" value="" />
                    <Picker.Item label="ID" value={SearchOption.ID} />
                    <Picker.Item label="Name" value={SearchOption.NAME} />
                    <Picker.Item label="Zone" value={SearchOption.ZONE} />
                </Picker>
            </View>
            <ScrollView>
                <DataTable>
                    <DataTable.Header style={styles.item}>
                        <DataTable.Title
                            style={styles.column_id}
                            onPress={() => clientSortby(SortOptions.ID)}
                            sortDirection={arrowDirectionController(
                                SortOptions.ID,
                                sortOption,
                                sortDirection
                            )}
                        >
                            ID
                        </DataTable.Title>
                        <DataTable.Title
                            style={styles.column_name}
                            onPress={() => clientSortby(SortOptions.NAME)}
                            sortDirection={arrowDirectionController(
                                SortOptions.NAME,
                                sortOption,
                                sortDirection
                            )}
                        >
                            Name
                        </DataTable.Title>
                        <DataTable.Title
                            style={styles.column_zone}
                            onPress={() => clientSortby(SortOptions.ZONE)}
                            sortDirection={arrowDirectionController(
                                SortOptions.ZONE,
                                sortOption,
                                sortDirection
                            )}
                        >
                            Zone
                        </DataTable.Title>
                        <DataTable.Title
                            style={styles.column_icons}
                            onPress={() => clientSortby(SortOptions.HEALTH)}
                            sortDirection={arrowDirectionController(
                                SortOptions.HEALTH,
                                sortOption,
                                sortDirection
                            )}
                        >
                            {riskTypes.HEALTH.Icon("#000000")}
                        </DataTable.Title>
                        <DataTable.Title
                            style={styles.column_icons}
                            onPress={() => clientSortby(SortOptions.EDUCATION)}
                            sortDirection={arrowDirectionController(
                                SortOptions.EDUCATION,
                                sortOption,
                                sortDirection
                            )}
                        >
                            {riskTypes.EDUCAT.Icon("#000000")}
                        </DataTable.Title>
                        <DataTable.Title
                            style={styles.column_icons}
                            onPress={() => clientSortby(SortOptions.SOCIAL)}
                            sortDirection={arrowDirectionController(
                                SortOptions.SOCIAL,
                                sortOption,
                                sortDirection
                            )}
                        >
                            {riskTypes.SOCIAL.Icon("#000000")}
                        </DataTable.Title>
                    </DataTable.Header>
                    {clientList.map((item) => {
                        return (
                            <DataTable.Row
                                style={styles.item}
                                key={item.id}
                                onPress={() => {
                                    navigation.navigate(StackScreenName.CLIENT, {
                                        clientID: item.id,
                                    });
                                }}
                            >
                                <DataTable.Cell style={styles.column_id}>{item.id}</DataTable.Cell>
                                <View style={styles.column_name}>
                                    <WrappedText
                                        text={item.full_name}
                                        viewStyle={styles.wrappedView}
                                        textStyle={styles.text}
                                    />
                                </View>
                                <View style={styles.column_zone}>
                                    <WrappedText
                                        text={item.zone}
                                        viewStyle={styles.wrappedView}
                                        textStyle={styles.text}
                                    />
                                </View>
                                <DataTable.Cell style={styles.column_icons}>
                                    {riskTypes.CIRCLE.Icon(item.HealthLevel)}
                                </DataTable.Cell>
                                <DataTable.Cell style={styles.column_icons}>
                                    {riskTypes.CIRCLE.Icon(item.EducationLevel)}
                                </DataTable.Cell>
                                <DataTable.Cell style={styles.column_icons}>
                                    {riskTypes.CIRCLE.Icon(item.SocialLevel)}
                                </DataTable.Cell>
                            </DataTable.Row>
                        );
                    })}
                </DataTable>
            </ScrollView>
        </View>
    );
};
export default ClientList;
