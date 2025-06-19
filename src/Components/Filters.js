import React from "react";
 
function Filters ({filters,onFilterChange}){
    return (
        <div>
            <div className="p-3 border-end" style={{minWidth: "250px"}}>
                <h5>Filters</h5>
                <select
                className="form-select mb-3"
                value={filters.religion}
                 onChange={(e) => onFilterChange("religion",e.target.value)}
                >
                    <option value="">Select Religion</option>
                    <option value="Christian">Christian</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Musilm">Musilm</option>

                </select>
                <select
                className="form-select mb-3"
                value={filters.location}
                onChange={(e) => onFilterChange("location",e.target.value)}
                >
                    <option value="">Select Location</option>
                    <option value="chennai">Chennai</option>
                    <option value="mumbai">Mumbai</option>
                </select>
                <select
                className="form-select mb-3"
                value={filters.status}
                onChange={(e)=> onFilterChange("status",e.target.value)}
                >
                    <option value="">Availabilty</option>
                    <option value="Available">Available</option>
                    <option value="offline">Offline</option>
                </select>
            </div>

        </div>
    )
}
export default Filters;