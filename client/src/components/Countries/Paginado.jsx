import {React} from 'react';
import './Paginado.css'
export default function Paginado({array, currentPage, paginate, length}){

    const pageNumbers = [1];
  for (let i = 1; i <= Math.ceil((length - 9)  / 10); i++) {
    pageNumbers.push(i + 1);
  }
    return(
        <>
          <div className='paginado'>
            {pageNumbers.length > 1 &&
            pageNumbers.map((p, i) =>
            p === currentPage ? (
                <button key={i} className="pag-btn" onClick={() => paginate(p)}>
                  {p}
                </button>
            ) : (
                <button key={i}  onClick={() => paginate(p)}>
                  {p}
                </button>
            )
          )}
          </div>
        </>
        
    )
}