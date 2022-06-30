import React, { useState, useEffect } from "react";
import {
  Panel,
  Spinner,
  PanelHeader,
  View,
  Group,
  CardGrid,
  Card,
  SimpleCell,
  Switch,
  SplitLayout,
  SplitCol,
  InfoRow,
  Header,
  Div,
  UsersStack,
  FormItem,
  Select,
  Button,
  CellButton,
  SizeType,
} from "@vkontakte/vkui";
import { useMutation, useQuery } from "@apollo/client";
import { ME } from "../../../../GraphQL/Queries";
import quot from "../../../../img/quot.svg";
import { setTheme, getUsersData, getTheme } from "../../../../utils";

interface props {
  id: string;
  go: any;
  fetchedUser: any;
}

const MyNote = ({ id, fetchedUser, go }: props) => {
  const { loading: meLoading, data: meData } = useQuery(ME, {
    pollInterval: 1000, // частота обновления данных
  });
  const [favoritedBy, setFavoritedBy] = useState<any[]>([]);
  const [sentence, setSentence] = useState(null);

  useEffect(() => {
    if (meData?.me.notes.length) {
      let note = meData?.me.notes[0];
      setSentence(note.content);
      getUsersData(note.favoritedBy).then((response) =>
        setFavoritedBy(response)
      );
    }
  }, [meData]);
  const themes = [
    { label: "как в ВК", value: "auto" },
    { label: "светлая", value: "light" },
    { label: "тёмная", value: "dark" },
  ];
  return (
    <View id={id} activePanel={id}>
      <Panel id={id}>
        <PanelHeader>my sent.</PanelHeader>
        <Group>
          <Header mode="secondary">Личный кабинет</Header>
          <SimpleCell
            disabled
            after={
              <FormItem>
                <Select
                  // зафиксировать размер, убрать отступ справа

                  defaultValue={getTheme()}
                  defaultChecked={true}
                  options={themes}
                  onChange={(e) => {
                    setTheme(e?.target?.value)
                  }}
                />
              </FormItem>
            }
          >
            Тема
          </SimpleCell>
          <SimpleCell
            disabled // временно
            after={<Switch disabled aria-label="Уведомления о респектах" />}
          >
            Уведомления о респектах
          </SimpleCell>
          <SimpleCell
            disabled // временно
            after={<Switch disabled aria-label="Уведомления об ответах" />}
          >
            Уведомления об ответах
          </SimpleCell>
        </Group>
        {!meLoading ? (
          sentence != null ? (
            <Group
              mode="plain"
              sizeX={SizeType.REGULAR}
              header={<Header mode="secondary">Фраза</Header>}
            >
              <CardGrid size="l">
                <Card mode="shadow" style={{ minHeight: "2rem", padding: "15px" }}>
                  {/* <img
                    src={quot}
                    alt="Quotation mark"
                    style={{
                      width: "25px",
                      float: "left",
                      marginLeft: "10px",
                      marginRight: "10px",
                      marginTop: "5px",
                    }}
                  /> */}
                  {/* <blockquote style={{ minHeight: "2rem", padding: "15px" }}>
                    {sentence}
                  </blockquote> */}
                  {sentence}
                </Card>
              </CardGrid>
              <SplitLayout style={{ justifyContent: "center" }}>
                <SplitCol>
                  <Div>
                    <InfoRow header="Просмотры фразы">...</InfoRow>
                  </Div>
                </SplitCol>
                <SplitCol>
                  <Div>
                    <InfoRow header="Просмотры профиля">...</InfoRow>
                  </Div>
                </SplitCol>
              </SplitLayout>
              <SimpleCell
                before={
                  <span>
                    Респекты: <b> {favoritedBy?.length}</b>
                  </span>
                }
              >
                <UsersStack
                  style={{ marginLeft: "1em" }}
                  photos={favoritedBy?.map((val: any) => val["photo_50"])}
                  size="m"
                />
              </SimpleCell>
              <SimpleCell>Ответы (временно не работают)</SimpleCell>
            </Group>
          ) : (
            <Group
              mode="plain"
              header={<Header mode="secondary">Фраза</Header>}
            >
              <Button
                onClick={() => go("greeting")}
                mode="outline"
                style={{ marginLeft: 16 }}
              >
                Создать фразу
              </Button>
            </Group>
          )
        ) : (
          <Spinner />
        )}
        <Group>
          <a
            style={{ textDecoration: "none" }}
            href="//sent.bouhartsev.top/"
            target="_blank"
          >
            <CellButton>О sent.</CellButton>
          </a>
          <CellButton mode="danger" onClick={() => localStorage.clear()}>
            Удалить токены (dev)
          </CellButton>
        </Group>
      </Panel>
    </View>
  );
};

export default MyNote;
