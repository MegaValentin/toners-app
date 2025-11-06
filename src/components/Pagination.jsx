const Pagination = ({ pagination, setFilters }) => {
    const { page, totalPages } = pagination

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return
        setFilters((prev) => ({ ...prev, page: newPage }))
    }

    return (
        <div className="flex justify-center items-center mt-4 gap-3">

            <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            >
                Anterior
            </button>
            <span>
                Página {page} de {totalPages}
            </span>
            <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            >
                Siguiente
            </button>
        </div>
    )
}

export default Pagination;