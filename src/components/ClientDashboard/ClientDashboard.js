import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'

import Card from './Card'
import './ClientDashboard.css'

// const EstateCard = (props) => {
//   return (
//     <div className={`card ${isOpen ? 'open' : ''}`} onClick={toggleCard}>
//       <div className="card-header">{props.title}</div>
//       <div className="card-content">{props.price}</div>
//     </div>
//   )
// }

export default function ClientDashboard() {
  const [estates, setEstates] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [openCardId, setOpenCardId] = useState(null)

  useEffect(() => {
    URL = `http://localhost:3000/api/estates/get?pageSize=10&pageNo=${currentPage}`

    const tokenString = sessionStorage.getItem('token')
    const userToken = JSON.parse(tokenString)
    fetch(URL, {
      headers: {
        'x-access-token': userToken.token,
      },
    })
      .then((response) => response.json())
      .then((body) => {
        setEstates([...body.estates])
        setPageCount(body.pagination.totalPages)
        setIsLoaded(true)
      })
      .catch((error) => console.error('Error', error))
  }, [currentPage])

  const handlePageChange = (selectedObject) => {
    setCurrentPage(selectedObject.selected + 1)
  }

  const toggleCard = (cardId) => {
    setOpenCardId(cardId === openCardId ? null : cardId)
  }

  const selectedCard = estates.find((card) => card.title === openCardId)

  return (
    <div>
      <div className="card-list">
        {isLoaded ? (
          estates.map((item) => {
            return (
              <Card
                title={item.title}
                price={item.price}
                isOpen={item.title === openCardId}
                toggleOpen={() => toggleCard(item.title)}
                selected={item.title === openCardId}
              />
            )
          })
        ) : (
          <div></div>
        )}
      </div>
      <div className="selected-card">
        {selectedCard && (
          <div className="selected-content">{selectedCard.price}</div>
        )}
      </div>

      {isLoaded ? (
        <ReactPaginate
          pageCount={pageCount}
          pageRange={2}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={'container'}
          previousLinkClassName={'page'}
          breakClassName={'page'}
          nextLinkClassName={'page'}
          pageClassName={'page'}
          disabledClassName={'disabled'}
          activeClassName={'active'}
        />
      ) : (
        <div>Nothing to display</div>
      )}
    </div>
  )
}
