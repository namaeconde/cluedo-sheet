import { Grid } from "./components/grid.component";
import { useState } from "react";
import { Characters, Locations, Weapons } from "./lib/types";

export default function  App() {
    const [players, setPlayers] = useState([
        "A",
        "B",
        "C",
        "D",
        "E"
    ]);
    const whoGridItems: { [index: string]: string[] } = {};
    Object.values(Characters).map((key) => {
        whoGridItems[key] = new Array(players.length).fill(null);
    });

    const whatGridItems: { [index: string]: string[] } = {};
    Object.values(Weapons).map((key) => {
        whatGridItems[key] = new Array(players.length).fill(null);
    });

    const whereGridItems: { [index: string]: string[] } = {};
    Object.values(Locations).map((key) => {
        whereGridItems[key] = new Array(players.length).fill(null);
    });
    
    return (
        <div>
            <div style={{ textAlign: "center" }}><b>MY CLUEDO SHEET</b></div>
            <div style={{ marginBottom: 0 }} className="grid">
                <div className="grid-row">
                    <div style={{ display:"flex", gap: "12px" }}>
                        <div className="grid-row--title"></div>
                        {players.map((val) => {
                            return <div>{val}</div>
                        })}
                    </div>
                </div>
            </div>
            <Grid title="WHO" items={whoGridItems} />
            <Grid title="WHAT" items={whatGridItems} />
            <Grid title="WHERE" items={whereGridItems} />
        </div>
    )
}