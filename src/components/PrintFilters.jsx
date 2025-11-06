const PrintFilters = ({ filters, setFilters }) => {

    const handleSearchChange = (e) => {
        setFilters({ ...filters, search: e.target.value, page: 1 })
    }

    return (
        <div className="flex items-center justify-between mb-4 gap-3">

            <input type="text"
                placeholder="Buscar por marca o modelo"
                value={filters.search}
                onChange={handleSearchChange}
                className="border rounded px-3 py-2 w-1/2" />

            <select
                value={filters.order}
                onChange={(e) => setFilters({ ...filters, order: e.target.value })}
                className="border rounded px-2 py-1"
            >
                <option value="asc">Orden ascendente</option>
                <option value="desc">Orden descendente</option>
            </select>
        </div>
    )
}

export default PrintFilters;