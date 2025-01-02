function Filter() {
    return (
        <div className="container">
            <div className="filter-container row">
            <div className="col-12 col-md-4 mb-3">
                <label htmlFor="country-filter" className="form-label">Country</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" style={{ height: '50px' }}>
                            <i className="bx bx-map"></i>
                        </span>
                    </div>
                    <select defaultValue={""} className="form-select" id="country-filter" aria-label="Country" aria-describedby="country-addon" style={{ height: '50px' }}>
                        <option value={""}>Choose...</option>
                        <option value="1">USA</option>
                        <option value="2">Spain</option>
                    </select>
                </div>
            </div>

            <div className="col-12 col-md-4 mb-3">
                <label htmlFor="date-filter" className="form-label">From</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" style={{ height: '50px' }}>
                            <i className="bx bx-calendar"></i>
                        </span>
                    </div>
                    <input className="form-select" type="date" id="date-filter" aria-label="Date" aria-describedby="date-addon" style={{ height: '50px' }}/>
                </div>
            </div>

            <div className="col-12 col-md-4 mb-3">
                <label htmlFor="date-filter" className="form-label">To</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" style={{ height: '50px' }}>
                            <i className="bx bx-calendar"></i>
                        </span>
                    </div>
                    <input className="form-select" type="date" id="date-filter" aria-label="Date" aria-describedby="date-addon" style={{ height: '50px' }}/>
                </div>
            </div>

            <div className="col-12 col-md-4 mb-3">
                <label htmlFor="availability-filter" className="form-label">Availability</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" style={{ height: '50px' }}>
                            <i className="bx bx-check"></i>
                        </span>
                    </div>
                    <select defaultValue={""}  className="form-select" id="availability-filter" aria-label="Availability" aria-describedby="availability-addon" style={{ height: '50px' }}>
                        <option value={""}>Choose...</option>
                        <option value="1">Available</option>
                        <option value="2">Sold Out</option>
                    </select>
                </div>
            </div>

            <div className="col-12 col-md-4 mb-3">
                <label htmlFor="discount-filter" className="form-label">Discount</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" style={{ height: '50px' }}>
                            <i className="bx bx-time"></i>
                        </span>
                    </div>
                    <select defaultValue={""}  className="form-select" id="discount-filter" aria-label="Discount" aria-describedby="discount-addon" style={{ height: '50px' }}>
                        <option value={""}>Choose...</option>
                        <option value="1">10%</option>
                        <option value="2">20%</option>
                    </select>
                </div>
            </div>

            <div className="col-12 col-md-4 mb-3">
                <label htmlFor="price-filter" className="form-label">Price</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" style={{ height: '50px' }}>
                            <i className="bx bx-dollar"></i>
                        </span>
                    </div>
                    <select defaultValue={""} className="form-select" id="price-filter" aria-label="Price" aria-describedby="price-addon" style={{ height: '50px' }}>
                        <option value={""}>Choose...</option>
                        <option value="1">$0 - $500</option>
                        <option value="2">$500 - $1000</option>
                    </select>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Filter;