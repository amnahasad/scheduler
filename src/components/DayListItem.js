import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";


const formatSpots = function(spots) {
    return (spots === 0 ? "no spots remaining" : `${spots} spot${spots === 1 ? "" : "s"} remaining`);
};


export default function DayListItem(props) {
    const dayClass = classNames("day-list__item", {
        "day-list__item--selected": props.selected === true,
        "day-list__item--full": props.spots === 0
    });

  return (
    <li className={dayClass} onClick={() => props.onChange(props.name)} selected={props.selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
