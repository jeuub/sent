import React from "react";
import "./style.css";

interface autor {
  username: String;
  vkid: String;
}

interface props {
  author: autor;
  content: string;
  date: Date;
  favoriteCount: number;
  id: string;
}

const Note = ({ author, content, date, favoriteCount }: props) => {
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
  return (
    <figure className="quote">
      <blockquote>
        <p>{content}</p>
      </blockquote>
      <figcaption>
        —{author.username}, {monthNames[date.getMonth()]} {date.getFullYear()}
      </figcaption>
    </figure>
  );
};

export default Note;
