import { useState } from "react";
import { MARKER } from "../lib/types";

interface GridProps {
    title?: String,
    items: { [index: string]: string[] },
    onItemsUpdate: Function
}

/**
 * Grid component to display items in grid format.
 *
 * @param title - title heading of the grid if provided
 * @param items - list of items in string to be displayed rows
 * @param onItemsUpdate - function to call when grid items have been updated
 */
export const Grid = ({ title, items, onItemsUpdate }: GridProps) => {
    const [gridItems, setGridItems] = useState(items);

    const handleOnClick = (key: string, index: number) => {
        const currentMark = gridItems[key][index];
        switch(currentMark) {
            case MARKER.seen: gridItems[key][index] = MARKER.suspected; break;
            case MARKER.suspected: gridItems[key][index] = MARKER.safe; break;
            case MARKER.safe: gridItems[key][index] = MARKER.nil; break;
            default: gridItems[key][index] = MARKER.seen; break;
        }
        onItemsUpdate({...gridItems});
    }

    return (
        <div className="grid">
            <div className="grid-title">{title}</div>
            {
                gridItems && Object.keys(gridItems).map((key, index) => {
                    return <div key={index} className="grid-row">
                            <div className="grid-row--item">
                                <div className="grid-row--title"
                                     style={{
                                         textDecoration: `${items[key].includes(MARKER.seen) ? 'line-through' : ''}`
                                    }}>{key}</div>
                                {items[key].map((val, index) => {
                                    return <button className="grid-row--btn" key={index}
                                                   onClick={() => handleOnClick(key, index)}>{val}</button>
                                })}
                            </div>
                    </div>
                })
            }
        </div>
    )
}