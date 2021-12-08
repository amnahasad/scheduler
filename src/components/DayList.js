import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

    const DayListItems = props.days.map((dayData, index) => {
        return <DayListItem key={index} {...dayData} setDay={props.setDay} />
    })
  return (
    <ul>
        {DayListItems}
    </ul>
  );
}