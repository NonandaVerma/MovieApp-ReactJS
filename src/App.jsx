import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "flowbite-react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

import "./index.css";

function App() {
  const [mData, setMyData] = useState([]);
  const [loading, setLoading] = useState(false)

  const[inputVal,setInputVal]=useState(null)

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;



  let showData = () => {

    let Api;

    if(inputVal==null){
      Api=`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${currentPage}`
    }
    else{
      Api=`https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${inputVal}`
    }

    
    axios
      .get(Api)
      .then((ress) => {
        setMyData(ress.data.results);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  let getValue=(e)=>{
    setInputVal(e.target.value);
  }

  useEffect(() => {
    showData();
  }, [currentPage]);

  return (
    <>
      <div className=" max-w-[1000px] mx-auto">
        <h1 className="text-[40px] text-[white] font-bold text-center py-[20px]">
          Movie App
        </h1>
        <input
          onKeyUp={getValue}
          type="text"
          placeholder="Search movie"
          className="w-[80%] mx-[10%]"
        />
      </div>

      <div className="max-w-[1300px]  my-[40px] mx-auto grid grid-cols-4">

      {
        loading== false ?
       
        <> 
          <Preloader /> 
          <Preloader /> 
          <Preloader /> 
          <Preloader /> 
        </>  : 
        mData.map((v) => {
          return (
            <>
              
              <MyCard data={v} />
            </>
          );
        })
      }
        
      </div>
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default App;

let MyCard = ({ data }) => {
  
  return (
    <>
      <Card
        className="max-w-sm m-[10px]"
        imgAlt="Movie Poster"
        imgSrc={`https://image.tmdb.org/t/p/w1280/${data.poster_path}`}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.original_title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Release: {data.release_date}
        </p>
      </Card>
    </>
  );
};

let Preloader = () => {
  return (
    <>
      <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto m-[10px]">
        <div class="animate-pulse flex space-x-4">
          <div class="rounded-full bg-slate-200 h-10 w-10"></div>
          <div class="flex-1 space-y-6 py-1">
            <div class="h-2 bg-slate-200 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                <div class="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div class="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
