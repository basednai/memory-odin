import { useEffect, useState } from "react";
import fetchData from "../helpers/fetchData";
import shuffle from "../helpers/shuffle";
import Card from "./Card";
import Score from "./Score";
import Title from "./Title";

export default function Game() {
  const [fetchResults, setFetchResults] = useState([]);
  const [charArray, setCharArray] = useState([]);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [clicked, setClicked] = useState([]);

  const urlBase = "https://akabab.github.io/superhero-api/api/id/";

  useEffect(() => {
    const fetchUrls = [
      `${urlBase}60.json`,
      `${urlBase}216.json`,
      `${urlBase}514.json`,
      `${urlBase}204.json`,
      `${urlBase}405.json`,
      `${urlBase}136.json`,
      `${urlBase}678.json`,
      `${urlBase}731.json`,
      `${urlBase}370.json`,
      `${urlBase}386.json`,
      `${urlBase}558.json`,
      `${urlBase}95.json`,
    ];

    //get image urls and store in state
    async function storeResults() {
      const results = await fetchData(fetchUrls);
      //   console.log(results);
      setFetchResults(results);
    }
    storeResults();
  }, []);

  //set name and url array
  useEffect(() => {
    const characters = [
      "Bane",
      "Deathstroke",
      "Penguin",
      "Darkseid",
      "Lex Luthor",
      "Brainiac",
      "Two Face",
      "Reverse Flash",
      "Joker",
      "Killer Croc",
      "Riddler",
      "Black Adam",
    ];

    setCharArray(
      characters.map((value, index) => ({
        name: value,
        url: fetchResults[index],
        id: index,
      }))
    );
  }, [fetchResults]);

  function handleClick(e) {
    if (clicked.includes(e.target.id)) {
      score > best ? setBest(score) : null;
      setScore(0);
      setClicked([]);
    } else {
      setScore(score + 1);
      // score > best ? setBest(score) : null
      setClicked([...clicked, e.target.id]);
    }

    setCharArray(shuffle([...charArray]));
  }

  console.log("score", score);
  console.log("best", best);

  return (
      <>
          <Title/>
      <div className="gameWrapper">
        {charArray.map((selection) => {
          return (
            <Card
              key={selection.id}
              imgUrl={selection.url}
              alt={selection.name}
              handleClick={(e) => handleClick(e)}
            />
          );
        })}
      </div>
      <Score score={score} best={best} />
    </>
  );
}
