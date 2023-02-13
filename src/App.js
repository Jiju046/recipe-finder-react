import "./styles.css";
import { useEffect, useState, useRef } from "react";

export default function App() {
  const appId = "b67d076f";
  const appKey = "56a15767611d47e20b8286a0139f2db6";

  const [ingredients, setIngredients] = useState([]);
  const inputRef = useRef(null); //gives an object {current:null}
  const [loading, setLoading] = useState(false); //state for displaying loading
  function search() {
    console.log(inputRef.current.value);
    searchContent(inputRef.current.value); //here query is the value user search for
  }

  function searchContent(query) {
    setLoading(true); // when function called starts loading until it get response or error
    //result on webpage depends on query
    let url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;

    fetch(url)
      .then((response) => {
        return response.json(); //response into json(async)
      })
      //we are using 2 (then) because res.json is async and while waiting
      // 2nd one is used // json() is used to parse the response and use it values
      .then((res) => {
        setIngredients(res.hits);
        setLoading(false); //if got response stops loading
      })
      .catch((err) => {
        console.log("got an error ", err);
        setLoading(false);
      }); //if error wont show loading
  }

  // async function getRecipies() {
  //   let response = await fetch(url);
  //   console.log(response);
  //   return response;
  // }
  // getRecipies();

  useEffect(() => {
    //deafault while loading is chicken
    searchContent("chicken");
  }, []);

  return (
    <div className="App">
      <div className="inputWrapper">
        <input
          ref={inputRef}
          // ref will give the value to inputRef in useRef
          // so we can take the element or its value to useref
          placeholder="Search for your favourite recipe😍"
        />
        <button onClick={search}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      <header className="heading"></header>
      <div className="wrapper">
        {ingredients.map(({ recipe }, index) => {
          //item.recipe (recipie will itterate through ingredients and take all the
          // properties named recipe and assign it to var of same name)
          const { label, image, ingredientLines } = recipe; //refactoring is used eg recipe.label
          //it takes all the prop name,label and image from recipe and assign its value to var of same name
          return (
            <div className="ingredient" key={index}>
              <h1>{label}</h1>
              <img src={image} alt="Dish" />
              <div className="steps">
                {ingredientLines.map((steps, index) => {
                  return <p key={index}>{steps}</p>;
                })}
              </div>
            </div>
          );
        })}
      </div>
      <footer>
        <p>©2023 Made with ❤ by Mr J</p>
      </footer>
    </div>
  );
}
