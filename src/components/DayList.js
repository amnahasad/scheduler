import React from "react";
import DayListItem from "./DayListItem";
import "./DayListItem.scss";

export default function DayList(props) {

    const DayListItems = props.days.map((dayData, index) => {
        return <DayListItem key={index} selected={props.day===dayData.name} {...dayData} setDay={props.setDay} />
    })
  return (
    <ul>
        {DayListItems}
    </ul>
  );
}