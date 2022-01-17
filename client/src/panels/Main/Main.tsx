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
import AllNotes from "./MainPanels/AllNotes/AllNotes";
import MyNote from "./MainPanels/MyNote/MyNote";

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
          <AllNotes />
          <MyNote />
        </Epic>
      </FixedLayout>
    </Panel>
  );
};

export default Main;
