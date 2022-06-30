import React, { useState } from "react";
import { NEW_NOTE } from "../../GraphQL/Mutations";
import { MY_NOTE } from "../../GraphQL/Queries";
import { useMutation, useQuery } from "@apollo/client";
import { Panel, Button, FormItem, Input } from "@vkontakte/vkui";
import { Icon24Add } from "@vkontakte/icons";

interface Props {
  id: any;
  go: any;
  fetchedUser: any;
}
import "./Greeting.css";

const Greeting = ({ id, fetchedUser, go }: Props) => {
  const [phrase, setPhrase] = useState("");
  const [createNoteMutation] = useMutation(NEW_NOTE);
  const { loading, data } = useQuery(MY_NOTE);

  const createNote = async () => {
    try {
      await createNoteMutation({
        variables: {
          content: phrase,
        },
      });

      go("main");
    } catch {
      console.log("err");
    }
  };

  if (data?.me?.notes.length) {
    go("main");
  }
  return (
    <Panel id={id}>
      {loading || data?.me?.notes.length ? null : (
        <div className="main__container">
          <div>
            <h3 className="main__logo">SENT.</h3>
            <p>
              Одна фраза - на все,
              <br /> навсегда.
            </p>
          </div>
          <div className="main__form form">
            <div className="form__content ">
              <FormItem>
                <Input
                  type="text"
                  placeholder="Ваша фраза"
                  value={phrase}
                  onChange={(e) => setPhrase(e.target.value)}
                />
              </FormItem>
              <Button
                onClick={createNote}
                size="m"
              >Создать фразу</Button>
            </div>
            <Button
              mode="secondary"
              size="m"
              className="form__later"
              
              onClick={() => go("main")}
            >
              позже
            </Button>
          </div>
          {/* Change action to use app inherit description */}
          <div><a href="//sent.bouhartsev.top">Узнать больше о приложении</a></div>
        </div>
      )}
    </Panel>
  );
};

export default Greeting;
