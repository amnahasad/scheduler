import React from "react";
import DayListItem from "./DayListItem";
import "./DayListItem.scss";


//This is the day list component
export default function DayList(props) {
  const DayListItems = props.days.map((dayData, index) => {
    return <DayListItem
      key={index}
      selected={props.value === dayData.name}
      {...dayData}
      onChange={props.onChange} />
  })
  return (
    <ul>
      {DayListItems}
    </ul>
  );
}