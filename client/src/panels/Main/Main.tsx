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

interface props {
  fetchedUser: any;
  id: string;
  go: any;
}

const Main = ({ fetchedUser, go }: props) => {
  const [page, setPage] = useState("all");
  return (
    <Panel>
      {/* <FixedLayout> */}
      <Epic
        activeStory={page}
        tabbar={
          <Tabbar shadow={false}>
            <TabbarItem
              selected={page === "all"}
              onClick={() => setPage("all")}
              text="Новости"
            >
              <Icon28NewsfeedOutline />
            </TabbarItem>
            <TabbarItem
              selected={page === "my"}
              onClick={() => setPage("my")}
              text="Профиль"
            >
              <Icon28UserCircleOutline />
            </TabbarItem>
          </Tabbar>
        }
      >
        <AllNotes id="all" fetchedUser={fetchedUser} />
        <MyNote id="my" go={go} />
      </Epic>
    </Panel>
  );
};

export default Main;
