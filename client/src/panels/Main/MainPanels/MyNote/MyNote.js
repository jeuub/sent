import React from "react";
import {
  Panel,
  Spinner,
  Tabbar,
  TabbarItem,
  Epic,
  PanelHeader,
  View,
  Group,
  FixedLayout,
} from "@vkontakte/vkui";
import { useMutation, useQuery } from "@apollo/client";
import { MY_NOTE } from "../../../../GraphQL/Queries";

const MyNote = ({ id }) => {
  const { loading, data } = useQuery(MY_NOTE);
  console.log(loading, data);

  return (
    <View id={id} activePanel={id}>
      <Panel id={id}>
        <Group style={{ height: "150px" }}>My</Group>
      </Panel>
    </View>
  );
};

export default MyNote;
