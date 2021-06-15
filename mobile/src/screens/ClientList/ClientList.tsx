import React from "react";
import { View } from "react-native";
import { DataTable } from "react-native-paper";
import useStyles from "./ClientList.styles";
import { fetchClientsFromApi as fetchClientsFromApi } from "./ClientListRequest";
import { doLogin } from "../../util/auth";

function ClientList() {
    const styles = useStyles();
    const exampleList = [
        {
            Id: 1,
            Name: "Naruto",
            Zone: 3,
        },
        {
            Id: 2,
            Name: "Sasuke",
            Zone: 5,
        },
    ];

    const newClientGet = async () => {
        const exampleClient = await fetchClientsFromApi();
        exampleList.push(exampleClient);
    };

    return (
        <View style={styles.container}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>ID</DataTable.Title>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Zone</DataTable.Title>
                </DataTable.Header>
                {exampleList.map((item) => {
                    return (
                        <DataTable.Row
                            key={item.Id} // you need a unique key per item
                            onPress={() => {
                                // added to illustrate how you can make the row take the onPress event and do something
                                console.log(`selected account ${item.Id}`);
                            }}
                        >
                            <DataTable.Cell>{item.Id}</DataTable.Cell>
                            <DataTable.Cell style={styles.item}>{item.Name}</DataTable.Cell>
                            <DataTable.Cell style={styles.item}>{item.Zone}</DataTable.Cell>
                        </DataTable.Row>
                    );
                })}
            </DataTable>
        </View>
    );
}

export default ClientList;
