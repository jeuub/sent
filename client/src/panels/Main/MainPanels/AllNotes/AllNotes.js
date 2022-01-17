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

const AllNotes = () => {
  return (
    <View id="two" activePanel="two">
      <Panel id="two">
        <Group style={{ height: "450px" }}>Allnotes</Group>
      </Panel>
    </View>
  );
};

export default AllNotes;
