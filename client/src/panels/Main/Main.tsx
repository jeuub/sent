import React, { useState } from "react";
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
import {
  Icon28NewsfeedOutline,
  Icon28UserCircleOutline,
  Icon28MessageOutline,
} from "@vkontakte/icons";
const Main = () => {
  const [page, setPage] = useState("one");

  return (
    <Panel>
      <FixedLayout filled vertical="bottom">
        <Epic
          style={{ height: "100%" }}
          activeStory={page}
          tabbar={
            <Tabbar>
              <TabbarItem
                selected={page === "one"}
                onClick={() => setPage("one")}
                text="Новости"
              >
                <Icon28NewsfeedOutline />
              </TabbarItem>
              <TabbarItem
                selected={page === "two"}
                onClick={() => setPage("two")}
                text="Профиль"
              >
                <Icon28UserCircleOutline />
              </TabbarItem>
              <TabbarItem
                selected={page === "three"}
                onClick={() => setPage("three")}
                text="Мессенджер"
              >
                <Icon28MessageOutline />
              </TabbarItem>
            </Tabbar>
          }
        >
          <View id="one" activePanel="one">
            <Panel id="one">
              <Group style={{ height: "450px" }}>asdasdasd</Group>
            </Panel>
          </View>
          <View id="two" activePanel="two">
            <Panel id="two">
              <Group style={{ height: "450px" }}>asdasdываываывasd</Group>
            </Panel>
          </View>
          <View id="three" activePanel="three">
            <Panel id="three">
              <Group style={{ height: "450px" }}>123123</Group>
            </Panel>
          </View>
        </Epic>
      </FixedLayout>
    </Panel>
  );
};

export default Main;
