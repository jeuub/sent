import { useState, useEffect } from "react";
import { Button, Counter } from "@vkontakte/vkui";
import { Icon24LikeOutline, Icon24Like } from "@vkontakte/icons";
import { useMutation } from "@apollo/client";
import { TOGGLE_FAVORITE } from "../../GraphQL/Mutations";
import "./style.css";
interface autor {
  username: String;
  vkid: String;
}

interface props {
  fetchedUser: any;
  favoritedBy: any;
  author: autor;
  content: string;
  date: Date;
  favoriteCount: number;
  id: string;
}

const Note = ({
  fetchedUser,
  author,
  content,
  date,
  favoriteCount,
  favoritedBy,
  id,
}: props) => {
  const [toggleFavorite, { loading, error }] = useMutation(TOGGLE_FAVORITE);
  const [favorite, setFavorite] = useState(false);
  const [favoriteCountState, setFavoriteCountState] = useState(favoriteCount);
  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  useEffect(() => {
    favoritedBy.forEach((e: any) => {
      if (e.vkid == fetchedUser?.id) {
        setFavorite(true);
      }
    });
  }, []);
  const toggle = async () => {
    const data: any = await toggleFavorite({
      variables: {
        toggleFavoriteId: id,
      },
    });
    setFavoriteCountState(data?.data?.toggleFavorite?.favoriteCount);
    setFavorite(!favorite);
  };
  return (
    <figure className="quote">
      <blockquote>
        <p>{content}</p>
      </blockquote>
      <figcaption>
        —{author.username}, {monthNames[date.getMonth()]} {date.getFullYear()}
      </figcaption>
      <Button
        onClick={toggle}
        mode={favorite ? "primary" : "outline"}
        loading={!!loading}
        before={<Counter mode="primary">{favoriteCountState}</Counter>}
      >
        {favorite ? <Icon24Like /> : <Icon24LikeOutline />}
      </Button>
    </figure>
  );
};

export default Note;
