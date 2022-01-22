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
import "./Main.css";

const Main = ({ fetchedUser }) => {
  const [page, setPage] = useState("all");
  return (
    <Panel>
      <FixedLayout className="fixedLayout">
        <Epic
          activeStory={page}
          tabbar={
            <Tabbar shadow={false}>
              <TabbarItem
                selected={page === "all"}
                onClick={() => setPage("all")}
                text="All sents"
              >
                <Icon28NewsfeedOutline />
              </TabbarItem>
              <TabbarItem
                selected={page === "my"}
                onClick={() => setPage("my")}
                text="My sent"
              >
                <Icon28UserCircleOutline />
              </TabbarItem>
            </Tabbar>
          }
        >
          <AllNotes id="all" fetchedUser={fetchedUser} />
          <MyNote id="my" />
        </Epic>
      </FixedLayout>
    </Panel>
  );
};

export default Main;
