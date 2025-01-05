import { useGlobalFilters } from '@/lib/config/data-table.configs';
import { CONTEXT, ContextType } from '@/lib/utils/context.utils';
import { SearchIcon } from 'lucide-react';
import { InputText } from 'primereact/inputtext';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

export default function FilterHeader({
  context,
  globalFilterValue,
  filters,
  setFilters,
  setGlobalFilterValue,
}: {
  context: CONTEXT;
  globalFilterValue: string;
  filters: any;
  setGlobalFilterValue: Dispatch<SetStateAction<string>>;
  setFilters: Dispatch<any>;
}) {
  return (
    <div className="flex justify-content-between align-items-center">
      <div className="table-header-title">Manage {context === ContextType.tour ? "Tours" : "Packages"}</div>
      <div className="global-filter-container">
        <div className="icon-container">
          <SearchIcon size={'18px'} className="search-icon" />
        </div>
        <InputText
          className="search-input"
          value={globalFilterValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            // get value
            let value: string = e.target.value;

            // update filters
            let _filters = filters;
            _filters['global'].value = value;
            setFilters(_filters);

            // update global value
            setGlobalFilterValue(value);
          }}
          placeholder="Search"
          title="Enter details such as name, country, address, city, guide, price, duration, discount, and number of seats to search for tours."
        />
      </div>
    </div>
  );
}
