'use client';
import SideBar from '@/components/common/SideBar';
import useTourStore from '@/stores/tourStore';
import { DataTable } from 'primereact/datatable';
import { ChangeEvent, useState } from 'react';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { tourTestData } from '@/lib/utils/test.data';
import { globalFilterFields, useGlobalFilters } from '@/lib/config/data-table.configs';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { BadgeCheckIcon, BadgeXIcon, CopyIcon, ExternalLinkIcon, LayoutListIcon, ReceiptTextIcon, ViewIcon } from 'lucide-react';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { MultiSelect } from 'primereact/multiselect';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

export default function AdminToursPage() {
  const { filters, setFilters } = useGlobalFilters();
  const [globalFilterValue, setGlobalFilterValue] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [selectedTours, setSelectedTours] = useState(null);

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  const modifyElement = (element: any, title: string = "", clickable: boolean = true): any => {
    return (
      <div className={(clickable ? "make-clickable" : "") + "flex justify-content-center"}>
        <span title={title}>{element}</span>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-start">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
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
            placeholder="Keyword Search"
          />
        </IconField>
      </div>
    );
  };

  const rangeRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    const [from, to] = options.value ?? [null, null];

    return (
        <div className="flex gap-1">
            <InputNumber value={from} onChange={(e) => options.filterApplyCallback([e.value, to])} className="w-full" placeholder="from" />
            <InputNumber value={to} onChange={(e) => options.filterApplyCallback([from, e.value])} className="w-full" placeholder="to" />
        </div>
    );
};

  const multiSelectRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
        <MultiSelect
            value={options.value}
            options={[{ name: "This is a test"}, { name: "This is a test"}, { name: "This is a test"}]}
            itemTemplate={(option) => (<div className="flex align-items-center gap-2">
                <span>{option.name}</span>
            </div>)}
            onChange={(e) => options.filterApplyCallback(e.value)}
            optionLabel="name"
            placeholder="Any"
            className="p-column-filter"
            maxSelectedLabels={1}
            style={{ minWidth: '14rem' }}
        />
    );
};

  return (
    <>
      <div className="container mt-40">
        <div className="row">
          <div className="page-header col-12">
            <h2>Tours</h2>
          </div>
          <DataTable
            
            virtualScrollerOptions={{ itemSize: 46 }}
            value={tourTestData}
            paginator
            rows={5}
            dataKey="id"
            filters={filters}
            globalFilterFields={globalFilterFields}
            filterDisplay={"row"}
            header={renderHeader()}
            emptyMessage="No tours found."
            resizableColumns
            onFilter={(e) => setFilters(e.filters)}
            showGridlines={true}
            sortMode={"multiple"}
            selectionMode={"multiple"}
            selection={selectedTours}
            onSelectionChange={(e) => setSelectedTours(e.value)}
            removableSort
            editMode={"row"}
            rowsPerPageOptions={[1, 2, 3, 4]}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
          >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>

            <Column
              body={(data) => modifyElement(<CopyIcon />, "Copy tour ID")}
              field="id"
              header="ID"
            />
            <Column
              field="name"
              header="Name"
              filter
              sortable
              filterPlaceholder="Search by name"
              style={{ minWidth: '15rem' }} // Set minimum width
            />
            <Column
              body={(data) => `${data.location.city}, ${data.location.country}`}
              field="location"
              header="Location (City, Country)"
              filter
              sortable
              filterPlaceholder="Search by location"
              style={{ minWidth: '18rem' }} // Set minimum width
            />
            <Column
              field="price"
              header="Price"
              filter
              sortable
              filterPlaceholder="Enter price range"
              filterElement={rangeRowFilterTemplate}
              showFilterMenu={false}
              style={{ minWidth: '12rem' }} // Set minimum width
            />
            <Column
              field="durationDays"
              header="Duration (Days)"
              filter
              sortable
              filterPlaceholder="Enter duration (days)"
              filterElement={rangeRowFilterTemplate}
              showFilterMenu={false}
              style={{ minWidth: '10rem' }} // Set minimum width
            />
            <Column
              field="discount"
              header="Discount"
              filter
              sortable
              filterPlaceholder="Enter discount"
              filterElement={rangeRowFilterTemplate}
              showFilterMenu={false}
              style={{ minWidth: '10rem' }} // Set minimum width
            />
            <Column
              field="numberOfSeats"
              header="Seats"
              filter
              sortable
              filterPlaceholder="Enter number of seats"
              filterElement={rangeRowFilterTemplate}
              showFilterMenu={false}
              style={{ minWidth: '10rem' }} // Set minimum width
            />
            <Column
              body={(data) => {
                return modifyElement(data.isAvailable ? <BadgeCheckIcon className="text-success" /> : <BadgeXIcon className="text-danger" />);
              }}
              field="isAvailable"
              header="Available"
              filter
              sortable
              filterElement={(options) => {
                return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />;
              }}
              showFilterMenu={false}
            />
            <Column
              body={(data) => modifyElement(<LayoutListIcon />, "View Tour Activities")}
              field="activities"
              header="Activities"
            />
            {/* <Column field="date" header="Date" filter /> */}
            <Column
              body={(data) => modifyElement(<ReceiptTextIcon />, "View Tour Description")}
              field="description"
              header="Description"
            />
            <Column
              body={(data) => modifyElement(<ViewIcon />, "View Tour Images")}
              field="images"
              header="Images"
            />
            <Column
              body={(data) => modifyElement(<ExternalLinkIcon />, "View Guide Profile")}
              field="guide"
              header="Guide"
              filter
              sortable
              filterPlaceholder="Search by guide"
              filterElement={multiSelectRowFilterTemplate}
              showFilterMenu={false}
            />
                <Column rowEditor={(data) => data.name !== ""} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>

          </DataTable>
        </div>
      </div>
      <SideBar />
    </>
  );
}
