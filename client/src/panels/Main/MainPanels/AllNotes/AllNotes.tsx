import { useEffect, useState } from "react";
import {
  Panel,
  View,
  List,
  PanelHeaderButton,
  PanelHeaderContent,
  PanelHeaderContext,
  PanelHeader,
  Spinner,
  Search,
  Cell,
  Placeholder,
  Group,
} from "@vkontakte/vkui";
import { Icon28AddOutline, Icon24Done, Icon16Dropdown } from "@vkontakte/icons";
import { FETCH_FEED } from "../../../../GraphQL/Queries";
import { useLazyQuery } from "@apollo/client";
import Note from "../../../../components/Note";
import Logo from "../../../../components/Logo";
import "./style.css";

interface props {
  id: string;
  fetchedUser: any;
}

const AllNotes = ({ id, fetchedUser }: props) => {
  const [getFeed, { loading, error, data }] = useLazyQuery(FETCH_FEED, {
    fetchPolicy: "no-cache",
  });
  const [notes, setNotes] = useState<any[]>([]);

  const [openContext, setOpenContext] = useState(false);
  const [search, setSearch] = useState("");
  // const [mode, setMode] = useState("all");

  const updNotes = () => {
    setNotes(
      data?.noteFeed?.notes
        ?.filter(
          (el: any) =>
            el.content?.toLowerCase().includes(search) ||
            el.author?.username.toLowerCase().includes(search)
        )
        .reverse()
    );
  };

  useEffect(() => {
    getFeed();
  }, []);

  useEffect(() => {
    updNotes();
  }, [data, search]);

  return (
    <View id={id} activePanel={id}>
      <Panel id={id}>
        <PanelHeader
          after={
            <PanelHeaderButton>
              <Icon28AddOutline />
            </PanelHeaderButton>
          }
        >
          <PanelHeaderContent
            onClick={() => {if (openContext) setSearch(""); setOpenContext(!openContext);}}
            aside={
              <Icon16Dropdown
                style={{
                  transform: `rotate(${openContext ? "180deg" : "0"})`,
                }}
              />
            }
          >
            all <Logo />
          </PanelHeaderContent>
        </PanelHeader>
        <Group>
          {openContext && (
            <Search
              autoFocus
              value={search}
              onChange={(e) => {
                setSearch(e.target.value.toLowerCase());
              }}
              after={null}
              style={{
                position: "sticky",
                top: 0,
                background: "var(--vkui--color_background_content)",
                zIndex: 100,
              }}
            />
          )}
          {loading ? (
            <Spinner
              size="large"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%)",
              }}
            />
          ) : !!notes?.length ? (
            notes.map((e: any) => (
              <Note
                favoritedBy={e.favoritedBy}
                fetchedUser={fetchedUser}
                author={e.author}
                content={e.content}
                date={new Date(e.createdAt)}
                favoriteCount={e.favoriteCount}
                id={e.id}
                key={e.author.username}
              />
            ))
          ) : !!openContext && (
            <Placeholder>Ничего не найдено</Placeholder>
          )}
        </Group>
      </Panel>
    </View>
  );
};

export default AllNotes;
