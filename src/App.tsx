import { useAtom } from 'jotai';
import { Sheet } from "./components/sheet";
import InitScreen from "./components/init-screen.component";
import { isInProgressAtom, playersAtom } from "./lib/atoms";

export default function  App() {
    const [isInProgress, setIsInProgress] = useAtom(isInProgressAtom);
    const [players, setPlayers] = useAtom(playersAtom);

    return (
        <div>{!isInProgress ?
            <InitScreen players={players as unknown as string[]}
                setPlayers={setPlayers}
                startGame={() => setIsInProgress(true)} /> :
            <Sheet players={players as unknown as string[]} />
        }</div>
    )
}