export default function IngredientsList(props) {
    return (
        <section>
            <h2>Ingredients on hand: </h2>
            <ul>{props.ingredslist()}</ul>
            {props.ingreds.length > 2 ? <section className="outerofgetrecipe">
                <div className="getrecipe">
                    <div className="getrecipetext">
                        <h3>Ready for a recipe ?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={props.handleGet} className="button">{props.getarecipe}</button>
                </div>
            </section> : null}
        </section>
    )
}