import { Characters, Locations, MARKER, STORAGE_KEY, Weapons } from "../lib/types";
import { Grid } from "./grid.component";
import { useAtom } from "jotai";
import {
    isInProgressAtom,
    playersAtom,
    whatGridItemsAtoms,
    whereGridItemsAtoms,
    whoGridItemsAtoms
} from "../lib/atoms";
import { useEffect } from "react";

interface SheetProps {
    players: string[]
}

export const Sheet = ({ players }: SheetProps) => {
    const [whoGridItems, setWhoGridItems] = useAtom(whoGridItemsAtoms);
    const [whatGridItems, setWhatGridItems] = useAtom(whatGridItemsAtoms);
    const [whereGridItems, setWhereGridItems] = useAtom(whereGridItemsAtoms);
    const [, setIsInProgress] = useAtom(isInProgressAtom);
    const [, setPlayers] = useAtom(playersAtom);

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
        if (sessionStorage.getItem(STORAGE_KEY.WHO_ITEMS) === null) {
            setWhoGridItems(initWhoGridItems);
        }

        if (sessionStorage.getItem(STORAGE_KEY.WHAT_ITEMS) === null) {
            setWhatGridItems(initWhatGridItems);
        }

        if (sessionStorage.getItem(STORAGE_KEY.WHERE_ITEMS) === null) {
            setWhereGridItems(initWhereGridItems);
        }
    }, [whoGridItems, whatGridItems, whereGridItems]);

    const handleClearClick = () => {
        setWhoGridItems({...initWhoGridItems});
        setWhatGridItems({...initWhatGridItems});
        setWhereGridItems({...initWhereGridItems});
        window.scrollTo(0, 0);
    }

    const handleRestart = () => {
        setIsInProgress(false);
        setPlayers([]);
        setWhoGridItems(null);
        setWhatGridItems(null);
        setWhereGridItems(null);
        Object.values(STORAGE_KEY).map((k) => {
            sessionStorage.removeItem(k);
        })
    }

    const PlayersSection = ({ players} : { players:string[] }) => {
        return (
            <div style={{ marginBottom: 0 }} className="grid">
                <div className="grid-row">
                    <div style={{ display:"flex", gap: "12px" }}>
                        <div className="grid-row--title"></div>
                        {players.map((val) => {
                            return <div style={{ width: "16px", height: "16px" }} key={val}>{val}</div>
                        })}
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
                <button className="restart--btn"
                        aria-label="Restart entire sheet setup"
                        onClick={handleRestart}>Restart</button>
            </div>
        </div>
    )
}