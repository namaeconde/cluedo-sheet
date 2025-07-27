import { useState } from "react";

interface InitScreenProps {
    players: string[],
    setPlayers: Function,
    startGame: Function
}
export default function InitScreen({ players, setPlayers, startGame }: InitScreenProps) {
    const [numOfPlayers, setNumOfPlayers] = useState(0);
    const handleSetNumOfPlayers = (e: any) => {
        const num = Number(e.target.value);
        setNumOfPlayers(num);
        if (num > 0) {
            const initialPlayers = new Array(num).fill("");
            setPlayers([...initialPlayers]);
        } else {
            setPlayers([]);
        }
    }

    return (
        <div className="init-screen">
            <div className="info">
                <span>This is an online note taking sheet in playing the classic Cluedo board game.</span>
                <span>How to use this Cluedo Sheet:</span>
                <ol>
                    <li>Set the number of players of the game you're playing.</li>
                    <li>Set the initials of the players to be added in your Cluedo Sheet.</li>
                    <li>Click "Start" to open your sheet.</li>
                    <li>Click the cells of the sheet to mark with the following indicators:
                        <ul>
                            <li>"/" - You have already seen the clue so it will automatically be ruled out in the sheet.</li>
                            <li>"X" - You are certain the clue is not owned by the player.</li>
                            <li>"?" - You suspect the clue is owned by the player but you have not seen it yet.</li>
                        </ul>
                    </li>
                </ol>

            </div>
            <label>How many players?</label>
            <input type="number" value={numOfPlayers}
                   onChange={(e) => handleSetNumOfPlayers(e)}/>
            {
                players?.length > 0 &&
                <div className="init-screen">
                    <label>Set players initials (one letter only)</label>
                    {
                        players.map((v, i) => {
                            return <input key={i} type="text"
                                          value={v}
                                          maxLength={1}
                                          onChange={(e) => {
                                              players[i] = e.target.value;
                                              setPlayers([...players])
                                          }}></input>
                        })
                    }
                    <button onClick={() => {startGame()}}>Start</button>
                </div>
            }
        </div>
    )
}