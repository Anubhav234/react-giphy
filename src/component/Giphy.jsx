import React , {useEffect,useState}from 'react';
import axios from 'axios';
import Loader from './Loader';
import Paginate from "./Paginate";


const Giphy = () => {
    const[data,setData]=useState([])
    const[isloading,setIsLoading]=useState(false)
    const[isError,setIsError]=useState(false)
    const[search,setSearch]=useState("")
    const[currentPage,setCurrentPage]=useState(1)
    const[itemsPerPage,setItemsPerPage]=useState(15)
    const indexOfLastItem=currentPage*itemsPerPage;
    const indexOfFirstItem=indexOfLastItem-itemsPerPage
    const currentItems=data.slice(indexOfFirstItem,indexOfLastItem)
    useEffect(()=>{
        const fetchData= async()=>{
            setIsError(false)
            setIsLoading(true)

            try{
                 const result = await axios("http://api.giphy.com/v1/gifs/trending",{
                params:{
                    api_key:"qiao5HUctD63jTeE4suFKCTE0AuvBRMV",
                   limit:10000000000000
                }
            })
            console.log(result)
setData(result.data.data)

            }
            catch(err){
               setIsError(true)
               setTimeout(() =>setIsError(false))
                   
               
            }
           

setIsLoading(false)
        }
        fetchData()
    },[])
    const rendergifs=()=>{
        if(isloading){
            return <div className="loader"><Loader/></div>
        }
        return currentItems.map(el=>{
            return (
               <div key={el.id} className="gif">
                   <img src={el.images.fixed_height.url}/>
               </div>
            )
        })
    }
    const renderError=()=>{
        if(isError){
            return(
                <div className="alert alert-danger alert-dismissible fade show " role="alert">
                    Unable to get Gifs.Please try again later.<buttton></buttton>
                </div>
            )
        }


    }
    const handleSearchChange=(event)=>{
        setSearch(event.target.value)
    }
    const handleSubmit= async event =>{
       event.preventDefault()
       setIsError(false)
       setIsLoading(true)

            const result=await axios("https://api.giphy.com/v1/gifs/search",{
                params:{api_key:"qiao5HUctD63jTeE4suFKCTE0AuvBRMV",
                q:search

                }
            })
            setData(result.data.data)
            setIsLoading(false)
        

    }
    const pageSelected=(pagenumber)=>{
        setCurrentPage(pagenumber)

    }
    return (
        <div className="m-2">{renderError()}
        <form className="form-inline justify-content-center m-2">
            <input value={search} onChange={handleSearchChange} type="text" placeholder="search" className="form-control"/>
            <button onClick={handleSubmit} type="submit" className="btn btn-primary mx-2">Go</button>
        </form>
            <Paginate pageSelected={pageSelected} currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={data.length}/>

        <div className="container gifs">
        {rendergifs()}
            
        </div>
        </div>
    )
}

export default Giphy;
