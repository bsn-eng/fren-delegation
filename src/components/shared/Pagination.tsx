import React from 'react'

import Button from './Buttons'

import { ReactComponent as RightIcon } from '@/assets/images/icon-chevron-right.svg'
import { ReactComponent as LeftIcon } from '@/assets/images/icon-chevron-left.svg'

type IProps = {
  currentPage: number | string
  totalPages: number
  onPageChange: (pageNumber: number | string) => void
}

export const Pagination = ({ currentPage: _currentPage, totalPages, onPageChange }: IProps) => {
  const currentPage = Number(_currentPage)
  const getPageNumbers = () => {
    const pageNumbers = []

    const maxVisiblePages = 5 // Maximum visible page numbers
    const ellipsisThreshold = 2 // Number of pages to show before adding ellipsis

    if (totalPages <= maxVisiblePages) {
      // If total pages are less than or equal to the maximum visible pages,
      // return all the page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Otherwise, determine which page numbers to show with ellipsis
      let startPage = 1
      let endPage = totalPages

      if (currentPage <= ellipsisThreshold + 1) {
        // If the current page is within the ellipsis threshold plus one,
        // show the first few pages and add ellipsis at the end
        endPage = maxVisiblePages - 1
      } else if (currentPage >= totalPages - ellipsisThreshold) {
        // If the current page is near the end, show the last few pages
        // and add ellipsis at the beginning
        startPage = totalPages - maxVisiblePages + 2
      } else {
        // Otherwise, show the current page and some pages before and after it
        const pagesBefore = Math.floor((maxVisiblePages - 3) / 2)
        const pagesAfter = maxVisiblePages - 3 - pagesBefore

        startPage = currentPage - pagesBefore
        endPage = currentPage + pagesAfter
      }

      if (startPage > 1) {
        pageNumbers.push(1) // Add first page number

        if (startPage > 2) {
          pageNumbers.push('ellipsis') // Add ellipsis at the beginning
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push('ellipsis') // Add ellipsis at the end
        }

        pageNumbers.push(totalPages) // Add last page number
      }
    }

    return pageNumbers
  }

  const renderPageNumbers = () => {
    const pageNumbers = getPageNumbers()

    return pageNumbers.map((pageNumber, index) => (
      <div key={index}>
        {pageNumber === 'ellipsis' ? (
          <>...</>
        ) : (
          <button
            className={`px-2 ${
              currentPage === pageNumber ? 'bg-primary text-grey950 rounded-full' : ''
            }`}
            disabled={currentPage === pageNumber}
            onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </button>
        )}
      </div>
    ))
  }

  return (
    <div className="justify-center my-2 gap-2 flex">
      <button key="prev" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        <LeftIcon />
      </button>
      {renderPageNumbers()}
      <button
        key="next"
        disabled={totalPages === currentPage}
        onClick={() => onPageChange(currentPage + 1)}>
        <RightIcon />
      </button>
    </div>
  )
}
