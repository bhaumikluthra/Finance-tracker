import React,{useState,useRef,useId ,useEffect} from "react";

export default function AddExpenseForm({onAdd}) {
    const[amount,setAmount]=useState("");
    const[category,setCategory]=useState("Food");
    const[note,setNote]=useState("");
    const[date,setDate]=useState(()=> new Date().toISOString().slice(0,10));

    const amountRef = useRef(null);


    useEffect(()=>{
        // const amountRef = useRef(null);
        amountRef.current?.focus();
    },[]);

    const amountId=useId();
    const categoryId=useId();
    const noteId=useId();
    const dateId=useId();

    const handleSubmit=(e)=>{
        e.preventDefault();

        if(!amount.trim() ||parseFloat(amount)<=0){
            alert("Please enter a valid amount");
            return;
        }
        const expense={
            id:Date.now(),
            amount:parseFloat(amount),
            category,
            note,
            date,};

        onAdd(expense);

        setAmount("");
        setCategory("Food");
        setNote("");
        setDate(new Date().toISOString().slice(0,10));

        amountRef.current?.focus();
    };

    return(
        <form onSubmit={handleSubmit} className="card">
            <h3>Add Expense</h3>

            <div>
        <label htmlFor={amountId}>Amount:</label>
        <input
          id={amountId}
          type="number"
          ref={amountRef}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          style={{ width: "100%", marginTop: 6, marginBottom: 12 }}
        />
      </div>

            <div>
                <label htmlFor={categoryId}>Category:</label>
                <select
                id={categoryId}
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                style={{width:"100%", marginTop:6,marginBottom:12}}
                >
                    <option >Food</option>
                    <option >Transport</option>
                    <option >Entertainment</option>
                    <option >Utilities</option>
                    <option >Others</option>
                </select>
            </div>

            <div>
                <label htmlFor={noteId}>Note:</label>
                <input
                id={noteId}
                value={note}
                onChange={(e)=>setNote(e.target.value)}
                style={{width:"100%", marginTop:6,marginBottom:12}}
                />
            </div>

            <div>
                <label htmlFor={dateId}>Date:</label>
                <input
                id={dateId}
                type="date"
                value={date}
                onChange={(e)=>setDate(e.target.value)}
                style={{width:"100%", marginTop:6,marginBottom:12}}
                />
            </div>


            <button type="submit">Add Expense</button>
            </form>
    );
}