import { Characters, Locations, MARKER, Weapons } from "../lib/types";
import { Grid } from "./grid.component";
import { useAtom } from "jotai";
import { whatGridItemsAtoms, whereGridItemsAtoms, whoGridItemsAtoms } from "../lib/atoms";
import { useEffect } from "react";

interface SheetProps {
    players: string[]
}

export const Sheet = ({ players }: SheetProps) => {
    const [whoGridItems, setWhoGridItems] = useAtom(whoGridItemsAtoms);
    const [whatGridItems, setWhatGridItems] = useAtom(whatGridItemsAtoms);
    const [whereGridItems, setWhereGridItems] = useAtom(whereGridItemsAtoms);

    const initWhoGridItems: { [index: string]: string[] } = {};
    Object.values(Characters).map((key) => {
        initWhoGridItems[key] = new Array(players.length).fill(MARKER.nil);
    });

    const initWhatGridItems: { [index: string]: string[] } = {};
    Object.values(Weapons).map((key) => {
        initWhatGridItems[key] = new Array(players.length).fill(MARKER.nil);
    });

    const initWhereGridItems: { [index: string]: string[] } = {};
    Object.values(Locations).map((key) => {
        initWhereGridItems[key] = new Array(players.length).fill(MARKER.nil);
    });

    useEffect(() => {
        if (sessionStorage.getItem('who-items') === null) {
            setWhoGridItems(initWhoGridItems);
        }

        if (sessionStorage.getItem('what-items') === null) {
            setWhatGridItems(initWhatGridItems);
        }

        if (sessionStorage.getItem('where-items') === null) {
            setWhereGridItems(initWhereGridItems);
        }
    }, []);

    const handleClearClick = () => {
        setWhoGridItems(initWhoGridItems);
        setWhatGridItems(initWhatGridItems);
        setWhereGridItems(initWhereGridItems);
    }

    const PlayersSection = ({ players} : { players:string[] }) => {
        return (
            <div style={{ marginBottom: 0 }} className="grid">
                <div className="grid-row">
                    <div style={{ display:"flex", gap: "12px" }}>
                        <div className="grid-row--title" style={{ width: "160px" }}></div>
                        {players.map((val) => {
                            return <div style={{ width: "16px", height: "16px" }} key={val}>{val}</div>
                        })}
                        <button aria-label="Add new player initial"
                                className="add-player--btn ">+</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div style={{ textAlign: "center" }}><b>MY CLUEDO SHEET</b></div>
            <PlayersSection players={players}/>
            <>{
                whoGridItems &&
                <Grid title="WHO"
                      items={whoGridItems as unknown as { [index: string]: string[] }}
                      onItemsUpdate={setWhoGridItems}/>
            }</>
            <>{
                whatGridItems &&
                <Grid title="WHAT"
                      items={whatGridItems as unknown as { [index: string]: string[] }}
                      onItemsUpdate={setWhatGridItems}
                />
            }</>
            <>{
                whereGridItems &&
                <Grid title="WHERE"
                      items={whereGridItems as unknown as { [index: string]: string[] }}
                      onItemsUpdate={setWhereGridItems}
                />
            }</>
            <div className="footer">
                <button className="clear--btn"
                        aria-label="Clear markers on sheet"
                        onClick={handleClearClick}>Clear</button>
            </div>
        </div>
    )
}