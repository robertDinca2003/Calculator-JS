import logo from './logo.svg';
import './App.css';

function App() {

  
  const [number1,setNumber1] = useState({val:'', completed:false});
  const [number2,setNumber2] = useState({val:'', completed:false});
  const [result,setResult] = useState({val:0, op:'none'});
  

  const calculate = () =>{

      setResult({...result,val:parseFloat(number1.val) + parseFloat(number2.val)});
  }
  useEffect(()=>{console.log(number1.val," . ",number2.val, " . ", result.op, " . ", result.val)},[number1,number2,result]);
  const action = (cifer) => {

    if(cifer === 'reset')
      if(number1.completed === true)
        setNumber1({val:'', completed:false});
      else
        setNumber2({val:'', completed:false});


    if(cifer === 'delete')
      if(number1.completed === false)
      {
        let str ='';
        for(let i = 0 ; i<number1.val.length-1;i++)
        {
            if(i !== 0 || number1.val[i] !== '0')
            str = str + number1.val[i].toString();
        }
        
        if(str.length === 1 && str[0] === '-') str = '';
        
        setNumber1({...number1, val:str});
      }
      else 
      {
        if(number2.completed === false)
        {
        let str ='';
        for(let i = 0 ; i<number2.val.length-1;i++)
        {
            if(i !== 0 && number2.val[i] !== '0')
            str = str + number2.val[i].toString();
        }
        if(str.length === 1 && str[0] === '-') str = '';
        setNumber2({...number2, val:str});
        }
      }


    if(cifer === 'clear')
    if(number2.completed === true)
        setNumber2({val:'', completed:false});
     else if(!number1.completed)
        setNumber1({val:'', completed:false});

    if(cifer === 'clearAll')
      {
        setNumber1({val:'', completed:false});
        setNumber2({val:'', completed:false});
        setResult({val:0, op:'none'});
      }

    if(cifer === 'sign')
    {
      
      let str ='';
      if(!number1.completed && number1.val.length >0)
      {
        if(number1.val[0] === '-')
        {
            for(let i = 1; i<number1.val.length;i++)
            str = str + number1.val[i].toString();
        }
        else
        {
            str = '-';
            for(let i = 0; i<number1.val.length;i++)
            str = str + number1.val[i].toString();
        } 
        setNumber1({...number1,val:str});
      }
      else if(!number2.completed && number2.val.length >0)
      {
        if(number2.val[0] === '-')
        {
            for(let i = 1; i<number2.val.length;i++)
            str = str + number2.val[i].toString();
        }
        else
        {
            str = '-';
            for(let i = 0; i<number2.val.length;i++)
            str = str + number2.val[i].toString();
        } 
        setNumber2({...number1,val:str});
      }
    } 
    if(cifer === 'decimal')
    {
      
        if(!number1.completed)
        {
            for(let i = 0; i<number1.val.length;i++)
           if(number1.val[i] === '.')return;
            setNumber1({...number1, val:number1.val+'.'});
        }
        else if(!number2.completed)
        {
          for(let i = 0; i<number2.val.length;i++)
           if(number2.val[i] === '.')return;
          setNumber2({...number2, val:number2.val+'.'});
        }
    }
    if(cifer >= 0 && cifer < 10)
    {
      if(!number1.completed)
      {
        setNumber1({...number1, val:number1.val+cifer.toString()});
      }
      else if(!number2.completed)
      {
        setNumber2({...number2, val:number2.val+cifer.toString()});
      }
    }
    if(cifer === '+' || cifer === '-'||
        cifer === '*' || cifer === '/'||
        cifer === 'pow')
    {
      if(!number1.completed)
      setNumber1({...number1, completed:true});
      else if(!number2.completed)
      setNumber2({...number2, completed:true});
      setResult({...result,op:cifer.toString()});
    }
    
    if(cifer === 'sqrt')
    {

    }
    if(cifer === 'ln')
    {

    }
   
    if(cifer === 'equal')
      {
        console.log(number1.completed,number2.completed);
        if(number1.completed)calculate();
      }
      console.log(cifer);
  };


  return (
    <div className="App h-screen flex justify-center items-center bg-blue-300 ">
      <div className="Calculator shadow-xl md:h-[50rem] h-[35rem] md:w-[35rem] w-[25rem] bg-slate-700 rounded-xl flex flex-col gap-3 p-6 ">
        <div className="Display text-5xl h-1/5 bg-slate-100 flex items-end flex-col justify-center rounded-t-3xl">
            <h1 className ="text-gray-400 text-[1.2rem] px-5">previos</h1>
            <h1 className="text-right px-5 py-2  ">0</h1>
            
        </div>
        <div className="UppperButtons h-1/6 bg-slate-400 flex-col md:text-2xl text-lg  ">
            <div className= "px-3 text-white h-1/2 flex gap-4 flex-row justify-between items-center">
                  <button onClick={()=>{action('reset')}} className="bg-cyan-900 hover:bg-cyan-700 w-1/5 h-3/4 rounded-md">Reset</button>
                  <button onClick={()=>{action('delete')}} className="bg-cyan-900 hover:bg-cyan-700 w-1/5 h-3/4 rounded-md">Delete</button>
                  <button onClick={()=>action('clear')} className="bg-cyan-900 hover:bg-cyan-700 w-1/5 h-3/4 rounded-md">C</button>
                  <button onClick={()=>action('clearAll')} className="bg-cyan-900 hover:bg-cyan-700 w-1/5 h-3/4 rounded-md">AC</button>
            </div>
            
            <div className= "px-3 text-white h-1/2 flex gap-4 flex-row justify-between items-center">
                   <button onClick={()=>action('none')} className=" w-1/5 h-3/4 bg-cyan-800 hover:bg-cyan-600 rounded-md">mc</button>
                  <button onClick={()=>action('none')} className=" w-1/5 h-3/4 bg-cyan-800 hover:bg-cyan-600 rounded-md">m+</button>
                  <button onClick={()=>action('none')} className=" w-1/5 h-3/4  bg-cyan-800 hover:bg-cyan-600 rounded-md">m-</button>
                  <button onClick={()=>action('none')} className=" w-1/5 h-3/4  bg-cyan-800 hover:bg-cyan-600 rounded-md">mr</button>
            </div>
            
        </div>
        <div className="FunctionalButtons text-white md:text-4xl text-lg h-4/6 gap-2 flex flex-row rounded-b-lg">
          <div className="NumberButtons bg-slate-400 grid grid-rows-4 grid-cols-3  w-2/3 rounded-bl-3xl">
                <button onClick={()=>action('1')} className="bg-sky-800 hover:bg-sky-600 m-2 rounded-3xl">1</button>
                <button onClick={()=>action('2')} className="bg-sky-800 hover:bg-sky-600 m-2 rounded-3xl">2</button>
                <button onClick={()=>action('3')} className="bg-sky-800 hover:bg-sky-600 m-2 rounded-3xl">3</button>
                <button onClick={()=>action('4')} className="bg-sky-800 hover:bg-sky-600 m-2 rounded-3xl">4</button>
                <button onClick={()=>action('5')} className="bg-sky-800 hover:bg-sky-600 m-2 rounded-3xl">5</button>
                <button onClick={()=>action('6')} className="bg-sky-800 hover:bg-sky-600 m-2 rounded-3xl">6</button>
                <button onClick={()=>action('7')} className="bg-sky-800 hover:bg-sky-600 m-2 rounded-3xl">7</button>
                <button onClick={()=>action('8')} className="bg-sky-800 hover:bg-sky-600 m-2 rounded-3xl">8</button>
                <button onClick={()=>action('9')} className="bg-sky-800 hover:bg-sky-600 m-2 rounded-3xl">9</button>
                <button onClick={()=>action('sign')} className="bg-sky-800 hover:bg-sky-600 m-2 rounded-3xl">-+</button>
                <button onClick={()=>action('0')} className="bg-sky-800 hover:bg-sky-600 m-2 rounded-3xl">0</button>
                <button onClick={()=>action('decimal')} className="bg-sky-800 hover:bg-sky-600 m-2 rounded-3xl">.00</button>
          </div>
          <div className="OperationButtons bg-slate-400 grid grid-rows-4 grid-cols-2  w-1/2 rounded-br-3xl">
                <button onClick={()=>action('+')} className="bg-indigo-900 hover:bg-indigo-800 m-3 rounded-3xl">+</button>
                <button onClick={()=>action('-')} className="bg-indigo-900 hover:bg-indigo-800 m-3 rounded-3xl">-</button>
                <button onClick={()=>action('*')} className="bg-indigo-900 hover:bg-indigo-800 m-3 rounded-3xl">*</button>
                <button onClick={()=>action('/')} className="bg-indigo-900 hover:bg-indigo-800 m-3 rounded-3xl">/</button>
                <button onClick={()=>action('pow')} className="bg-indigo-900 hover:bg-indigo-800 m-3 rounded-3xl">x^y</button>
                <button onClick={()=>action('ln')} className="bg-indigo-900 hover:bg-indigo-800 m-3 rounded-3xl">ln(x)</button>
                <button onClick={()=>action('sqrt')} className="bg-indigo-900 hover:bg-indigo-800 m-3 rounded-3xl md:text-2xl text-sm">sqrt(x)</button>
                <button onClick={()=>action('equal')} className="bg-red-900 hover:bg-red-800 m-3 rounded-3xl md:text-6xl text-4xl">=</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
