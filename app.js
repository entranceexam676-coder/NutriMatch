const { useState } = React;

const RecipeApp = () => {
  const [step, setStep] = useState("ingredients");
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [mealType, setMealType] = useState(null);
  const [preference, setPreference] = useState(null);
  const [cuisine, setCuisine] = useState(null);
  const [dietType, setDietType] = useState(null);
  const [recipes, setRecipes] = useState([]);

  const recipeDatabase = [
    { id: 1, name: 'Chicken Biryani', cuisine: 'Punjabi', type: 'Non-Veg', ingredients: ['rice','chicken','yogurt','onion'], mealType: ['Lunch','Dinner'], nutrition:{calories:480,protein:32,fat:18,carbs:52}, preference:'richer', hasRecipe:true },
    { id: 2, name: 'Paneer Tikka Masala', cuisine: 'Punjabi', type: 'Veg', ingredients: ['paneer','tomato','cream','onion'], mealType: ['Lunch','Dinner'], nutrition:{calories:400,protein:16,fat:24,carbs:36}, preference:'richer', hasRecipe:true },
    { id: 3, name: 'Masala Dosa', cuisine:'South Indian', type:'Veg', ingredients:['rice','lentils','potato','onion'], mealType:['Breakfast','Lunch'], nutrition:{calories:320,protein:8,fat:10,carbs:54}, preference:'lighter', hasRecipe:false },
    { id: 5, name: 'Fish Curry', cuisine:'South Indian', type:'Non-Veg', ingredients:['fish','coconut','onion','spices'], mealType:['Lunch','Dinner'], nutrition:{calories:420,protein:35,fat:18,carbs:20}, preference:'richer', hasRecipe:false },
    { id: 6, name: 'Egg Fried Rice', cuisine:'Chinese', type:'Non-Veg', ingredients:['rice','egg','peas','carrot'], mealType:['Lunch','Dinner'], nutrition:{calories:370,protein:14,fat:12,carbs:45}, preference:'lighter', hasRecipe:false },
    { id: 7, name: 'Rajma Chawal', cuisine:'Punjabi', type:'Veg', ingredients:['rajma','rice','onion','tomato'], mealType:['Lunch','Dinner'], nutrition:{calories:380,protein:15,fat:9,carbs:55}, preference:'richer', hasRecipe:false },
    { id: 13, name: 'Tandoori Chicken', cuisine:'Punjabi', type:'Non-Veg', ingredients:['chicken','yogurt','spices'], mealType:['Lunch','Dinner'], nutrition:{calories:370,protein:38,fat:12,carbs:5}, preference:'lighter', hasRecipe:false }
  ];

  const addIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.toLowerCase())) {
      setIngredients([...ingredients, inputValue.toLowerCase()]);
      setInputValue("");
    }
  };

  const matchRecipes = () => {
    const matched = recipeDatabase.filter(recipe => {
      
      // ✅ match only if at least 2 ingredients match
      const matchingIngredients = recipe.ingredients.filter(ing =>
        ingredients.includes(ing.toLowerCase())
      );

      const ingredientMatch = matchingIngredients.length >= 2;

      const dietMatch = !dietType || recipe.type === dietType;
      const mealMatch = !mealType || recipe.mealType.includes(mealType);
      const prefMatch = !preference || recipe.preference === preference;
      const cuisineMatch = !cuisine || recipe.cuisine === cuisine;

      return ingredientMatch && dietMatch && mealMatch && prefMatch && cuisineMatch;
    });

    setRecipes(matched.length > 0 ? matched : recipeDatabase.slice(0, 3));
    setStep("results");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 p-6">
      <div className="max-w-2xl mx-auto">

        {/** INGREDIENTS */}
        {step === "ingredients" && (
          <div className="bg-white p-10 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Add Ingredients</h2>

            <div className="flex gap-2 mb-4">
              <input
                value={inputValue}
                onChange={(e)=>setInputValue(e.target.value)}
                onKeyPress={(e)=>e.key==="Enter" && addIngredient()}
                className="flex-1 border p-3 rounded-lg"
                placeholder="chicken, rice, onion..."
              />
              <button onClick={addIngredient} className="bg-orange-600 text-white px-5 py-3 rounded-lg">Add</button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {ingredients.map(ing=>(
                <span key={ing} className="bg-orange-100 px-4 py-2 rounded-full">
                  {ing} <button onClick={()=>setIngredients(ingredients.filter(i=>i!==ing))}>✖</button>
                </span>
              ))}
            </div>

            <button disabled={ingredients.length===0}
              onClick={()=>setStep("meal")}
              className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg disabled:bg-gray-300">
              Continue →
            </button>
          </div>
        )}

        {/** MEAL TYPE */}
        {step === "meal" && (
          <div className="bg-white p-10 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Meal Type</h2>
            {["Breakfast","Lunch","Dinner","Snack"].map(t=>(
              <button key={t} onClick={()=>setMealType(t)}
                className={`block w-full p-4 rounded-lg mb-2 ${mealType===t?"bg-orange-500 text-white":"bg-gray-100"}`}>
                {t}
              </button>
            ))}
            <button onClick={()=>setStep("preference")} className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg">Continue →</button>
          </div>
        )}

        {/** PREFERENCE */}
        {step === "preference" && (
          <div className="bg-white p-10 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Food Mood</h2>
            <button onClick={()=>setPreference("lighter")} className={`w-full p-4 mb-2 rounded-lg ${preference==="lighter"?"bg-green-300":"bg-gray-100"}`}>🥗 Light</button>
            <button onClick={()=>setPreference("richer")} className={`w-full p-4 rounded-lg ${preference==="richer"?"bg-orange-300":"bg-gray-100"}`}>🍲 Rich</button>
            <button onClick={()=>setStep("diet")} className="w-full py-3 mt-3 bg-orange-600 text-white font-bold rounded-lg">Continue →</button>
          </div>
        )}

        {/** VEG / NON-VEG */}
        {step === "diet" && (
          <div className="bg-white p-10 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Veg / Non-Veg</h2>
            <button onClick={()=>setDietType("Veg")} className={`w-full p-4 mb-2 rounded-lg ${dietType==="Veg"?"bg-green-500 text-white":"bg-gray-100"}`}>Veg</button>
            <button onClick={()=>setDietType("Non-Veg")} className={`w-full p-4 rounded-lg ${dietType==="Non-Veg"?"bg-red-600 text-white":"bg-gray-100"}`}>Non-Veg</button>
            <button onClick={()=>setStep("cuisine")} className="w-full py-3 mt-3 bg-orange-600 text-white font-bold rounded-lg">Continue →</button>
          </div>
        )}

        {/** CUISINE */}
        {step === "cuisine" && (
          <div className="bg-white p-10 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Cuisine</h2>
            {["Punjabi","South Indian","Chinese","International","Indian"].map(c=>(
              <button key={c} onClick={()=>setCuisine(c)} className={`block w-full p-4 mb-2 rounded-lg ${cuisine===c?"bg-orange-500 text-white":"bg-gray-100"}`}>{c}</button>
            ))}
            <button onClick={matchRecipes} className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg">Get Recipes →</button>
          </div>
        )}

        {/** RESULTS */}
        {step === "results" && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold mb-3">Recommended Recipes</h2>
            {recipes.map(r=>(
              <div key={r.id} className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-2xl font-bold">{r.name}</h3>
                <p className="text-gray-600">{r.cuisine} • {r.type}</p>
              </div>
            ))}
            <button onClick={()=>{ setStep("ingredients"); setIngredients([]); setMealType(null); setPreference(null); setCuisine(null); setDietType(null); setRecipes([]); }} className="w-full py-3 bg-black text-white font-bold rounded-lg mt-4">Start Over</button>
          </div>
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<RecipeApp />, document.getElementById("root"));
