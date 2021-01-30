import React from 'react'

const Pagination = ({ pageStartIdx, totalRoutes, pageEndIdx, setPerPage, perPage, totalPages, page, setPage }) => (
  <div className="pagination">
    <p>
      Showing {page ? pageStartIdx() + 1 : 0}-{totalRoutes() < pageEndIdx() ? totalRoutes() : pageEndIdx()} of {totalRoutes()} routes
    </p>
    <p>
      Show <input value={perPage ? perPage : ''} onChange={e => setPerPage(+e.target.value)} /> routes per page
    </p>
    <p>
      <button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous Page</button>
      <button disabled={page === totalPages() - 1} onClick={() => setPage(page + 1)}>Next Page</button>
    </p>
  </div>
);

export default Pagination