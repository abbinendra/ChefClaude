import React from "react";
import IngredntsList from "./components/IngredientsLists.jsx";
import ClaudeRecipe from "./components/clauderecipe.jsx";
import { getRecipeFromMistral } from "./ai";

export default function Main() {
    const [ingreds, setingreds] = React.useState([]);
    const [recipeShown, setrecipeShown] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    async function handleGet() {
        setLoading(true);
        try {
            const recipeMarkdown = await getRecipeFromMistral(ingreds);
            setrecipeShown(recipeMarkdown);
        } catch (error) {
            console.error("Error fetching recipe:", error);
        } finally {
            setLoading(false);
        }
    }

    function handleClear() {
        setingreds([]);
        setrecipeShown("");
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newIngred = formData.get("ingreds");
        if (newIngred) {
            setingreds((previngred) => [...previngred, newIngred]);
            event.currentTarget.reset();
        }
    }

    function ingredslist() {
        return ingreds.map((ingredient) => <li key={ingredient}>{ingredient}</li>);
    }

    return (
        <main>
            <form onSubmit={handleSubmit} className="add-ingreds-form">
                <input
                    aria-label="Add Ingredient"
                    type="text"
                    placeholder="e.g. oregano"
                    name="ingreds"
                />
                <button aria-label="Add Ingredient">
                    <p className="resic">+</p> <p className="restxt">Add Ingredient</p>
                </button>
                <button onClick={handleClear} className="clear-ingreds-button">
                    <p className="resic">-</p> <p className="restxt">Clear Ingredients</p>
                </button>
            </form>
            {ingreds.length > 0 && (
                <>
                    <IngredntsList 
                        ingreds={ingreds}
                        ingredslist={ingredslist}
                        handleGet={handleGet}
                        getarecipe={"Get a recipe"}
                    />
                </>
            )}
            {loading && (<div className="loader-overlay">
                <div className="loader"></div>
            </div>)}
            {recipeShown && !loading && <ClaudeRecipe recipeShown={recipeShown} />}
        </main>
    );
}