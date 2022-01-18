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

const AllNotes = ({ id }) => {
  return (
    <View id={id} activePanel={id}>
      <Panel id={id}>
        <Group style={{ height: "100%" }}>Allnotes</Group>
      </Panel>
    </View>
  );
};

export default AllNotes;
