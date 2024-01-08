import {useEffect, useState} from "react";
import Confetti from 'react-dom-confetti';
import {useReducePastriesQuantityMutation} from "../services/pastries.js";

export default function Play() {

    const [reducePastriesQuantity, { isLoading }] = useReducePastriesQuantityMutation();

    const [confettiActive, setConfettiActive] = useState(false);
    const [results, setResults] = useState([1, 1, 1, 1, 1, 1]);
    const [availableGames, setAvailableGames] = useState(3);
    const [wonPastries, setWonPastries] = useState([]);
    const showConfetti = () => {
        setConfettiActive(true);

        // Set a timeout to hide the confetti after a certain duration (e.g., 3 seconds)
        setTimeout(() => {
            setConfettiActive(false);
        }, 3000);
    };

    const winPastry = (number) => {
        showConfetti();
        // should win 1 pastrie for 2 dice, 2 pastries for 3 dices, 3 pastries for 4 dices
        let wonPastriesCount = number - 1;
        reducePastriesQuantity(wonPastriesCount);
        setWonPastries([...wonPastries, `Won ${wonPastriesCount} pastry won`]);
    }

    const checkPartyResults = () => {
        // compare user results
        let uniqueElements = [...new Set(results)];
        const elementCounts = uniqueElements.map(value => `${results.filter(str => str === value).length}`);

        if(elementCounts.includes('4')) {
            alert(4);
            winPastry(4);
            return 4;
        }

        if(elementCounts.includes('3')) {
            winPastry(3);
            return 3;
        }
        if(elementCounts.includes('2')) {
            winPastry(2);
        }
        if(elementCounts.includes('1')) {
            return 1;
        }
        return 0;
    }

    useEffect(() => {
        setTimeout(() => {
            checkPartyResults();
        }, 100)
    }, [results])
    const runDices = () => {

        // checks if user has 3 play left

        if(!(availableGames >= 1)) {
            return 0;
        }

        setAvailableGames(availableGames - 1);

        // substract one game from user

        setResults(Array.from({ length: 6 }, () => Math.floor(Math.random() * 6) + 1));

    }

    return (
        <div className="flex flex-col gap-4 items-center">


            <p className="text-2xl font-bold pt-4 italic">You have {availableGames} games left</p>
            <Confetti active={confettiActive}/>

            <div>
                {results &&
                    (
                        <div className="grid grid-cols-3 gap-4">
                            {results.map(function (result) {
                                return (
                                    <div key={Math.random() * Date.now()} className="p-5 border">
                                        {result}
                                    </div>);
                            })}
                        </div>
                    )}
            </div>

            <div>
                {
                    availableGames > 0
                        ? (<button
                            className="w-48 text-center inline-block rounded-full bg-blue-500 color-white px-8 py-2 text-white hover:bg-blue-700 transition"
                            onClick={runDices}>Run dices</button>)
                        : (<button
                            className="w-48 text-center inline-block rounded-full bg-blue-500 opacity-50 color-white px-8 py-2 text-white transition">Run
                            dices</button>)
                }
            </div>

            {
                wonPastries.length > 0
                    ? wonPastries.map((wonPastrie) => <div
                        className="block border-emerald-400 rounded-full py-4 px-8 bg-emerald-400 text-emerald-950"
                        key={Math.random() * Date.now()}>{wonPastrie}</div>)
                    : <></>
            }

        </div>);
}