import React,{useState,useContext, useCallback,useMemo,useTransition,useDeferredValue} from "react";
import {ThemeProvider,ThemeContext} from "./context/ThemeContext";
import AddExpenseForm from "./components/AddExpenseForm";
import "./index.css";


function StartPage(){
  const {theme,toggleTheme} = useContext(ThemeContext);

  const[expenses,setExpenses] = useState([]);

  const[search,setSearch]=useState("");
  const[categoryFilter,setCategoryFilter]=useState("All");
  const [isPending,startTransition]=useTransition();

  const handleStart=()=>{
    console.log("started");

    alert("Welcome to Finance Tracker!");
  };

  const handleAddExpense = (data) => {
    setExpenses((prevExpenses) => [data, ...prevExpenses]);
  };

  const handleDeleteExpense = useCallback((id) => {
    const ok=window.confirm("delete this expense?");
    if(!ok)return;
    setExpenses((prevExpenses) => prevExpenses.filter((exp) => exp.id !== id));
  },[]
  );

  const totalExpenses = useMemo(() => {
    return expenses.reduce((total, exp) => total + exp.amount, 0);
  }, [expenses]);
  
  const deferredSearch = useDeferredValue(search);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((exp) => {
      const matchesCategory = categoryFilter === "All" || exp.category === categoryFilter;
      const matchesSearch= exp.note.toLowerCase().includes(deferredSearch.toLowerCase()) ||
                          exp.category.toLowerCase().includes(deferredSearch.toLowerCase())||
                          exp.amount.toString().includes(deferredSearch);
      return matchesCategory && matchesSearch;
    });
  }, [expenses, categoryFilter, deferredSearch]);

 

  return (
    <div className="container">
      <header className="header">
        <h1>Finance Tracker</h1>

        <button onClick={toggleTheme} className="small" style={{marginRight:8}}>
          Theme:{theme==="light"?"Light":"Dark"}
        </button>

        <button onClick={handleStart} className="small">Start Tracking</button>
      </header>


      <AddExpenseForm onAdd={handleAddExpense}/>

      <div className="card" style={{marginTop:20}}>
        <h2>Filter Expenses</h2>
        <input type="text" 
          placeholder="Search Note,Category,Amount..." 
          value={search}
          onChange={(e)=>{
            setSearch(e.target.value);
          }}
          style={{width:"100%", padding:"8px",marginBottom:"10px"}}
        />
        <select
          value={categoryFilter}
          onChange={(e)=>setCategoryFilter(e.target.value)}
          className="small"
          style={{width:"100%", padding:"8px"}}
          >
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Others">Others</option>
          </select>
          {isPending && <p className="small">Updating filter...</p>}
      </div>

      <div className="card" style={{marginTop:20}}>
        <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>
      </div>
      <div className="card" style={{marginTop:20}}>
        <h2>Expenses</h2>
        {expenses.length === 0 ? (
          <p className="small">No expenses added yet.</p>
        ):(

          <ul style={{paddingLeft:0,listStyle:"none"}}>
            
            {filteredExpenses.map((exp)=>(
              <li 
                key={exp.id} 
                className="small"
                style={{
                  padding:"10px",
                  borderBottom:"1px solid #ccc",
                  display:"flex",
                  justifyContent:"space-between"
                }}
              >
                <span>
                  <strong>{exp.category}</strong> --{exp.note || "No note"}
                </span>
                <span>
                  ${exp.amount} | {exp.date} 
                </span>
                <button
                  onClick={() => handleDeleteExpense(exp.id)}
                  className="small"
                  style={{backgroundColor:"red",color:"white",alignContent:"center"}}
                >
                  Delete
                </button>
              </li>
            ))}
          
          </ul>

        )}
      </div>

    </div>
    );

}

export default function App() {
  return (
    <ThemeProvider>
      <StartPage />
    </ThemeProvider>
  );
}