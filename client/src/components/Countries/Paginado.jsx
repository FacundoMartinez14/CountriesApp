import {React} from 'react';
// import './Paginado.css'
export default function Paginado({array, currentPage, paginate, length}){

    const pageNumbers = [1];
  for (let i = 1; i <= Math.ceil((length - 9)  / 10); i++) {
    pageNumbers.push(i + 1);
  }
    return(
        <>
          <div>
            {pageNumbers.length > 1 &&
            pageNumbers.map((p, i) =>
            p === currentPage ? (
                <button key={i} className="m-2 border border-black rounded transition-all duration-200 w-7 bg-white text-black" onClick={() => paginate(p)}>
                  {p}
                </button>
            ) : (
                <button key={i} className="m-2 border border-black rounded transition-all duration-200 w-7 bg-black text-white hover:bg-gray hover:border-gray" onClick={() => paginate(p)}>
                  {p}
                </button>
            )
          )}
          </div>
        </>
        
    )
}