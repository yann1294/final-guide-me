import { ChangeEvent } from 'react';
import { InputText } from 'primereact/inputtext';
import { SearchIcon } from 'lucide-react';

export function TableHeader({ filters, setFilters, globalFilterValue, setGlobalFilterValue }: any) {
  const handleGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters = { ...filters, global: { value } };
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  return (
    <div className="flex justify-content-between align-items-center">
      <div className="table-header-title">Manage Tours</div>
      <div className="global-filter-container">
        <div className="icon-container">
          <SearchIcon size="18px" className="search-icon" />
        </div>
        <InputText
          className="search-input"
          value={globalFilterValue}
          onChange={handleGlobalFilterChange}
          placeholder="Search"
          title="Enter details to search for tours."
        />
      </div>
    </div>
  );
}