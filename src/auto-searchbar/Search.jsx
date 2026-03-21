import { useEffect, useState } from "react";

const Search = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [resultShow, setResultShow] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    console.log("API CALL STARTED for:", input);
    const data = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const json = await data.json();
    setResult(json?.recipes);
    setCache((prev) => ({ ...prev, [input]: json?.recipes }));
  };

  useEffect(() => {
    if (!input.trim()) {
      setResult([]);
      return;
    }
    const timer = setTimeout(() => {
      if (cache[input]) {
        console.log("Cache Returned", input);
        setResult(cache[input]);
        setResultShow(false);
        return;
      } else {
        fetchData();
      }
    }, 300);

    // console.log("API called", input);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <>
      <div>
        <input
          className="border border-cyan-400 cursor-pointer w-[200px] p-2"
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            // if (!input.trim === " ") {
            //   setResultShow(false);
            //   setResult([]);
            // } else {
            //   setResultShow(true);
            // }
          }}
          onFocus={() => setResultShow(true)}
          onBlur={() => setResultShow(false)}
        />
      </div>
      {resultShow && (
        <div className="max-h-2/4 overflow-y-scroll border border-black w-[200px]">
          {result.map((r) => (
            <div className="p-1" key={r.id}>
              {r.name}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default Search;
