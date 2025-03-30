import {
  ColumnFilterElementTemplateOptions,
} from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

export const modifyElement = (element: any, title = '', clickable = true) => (
  <div
    className={`${
      clickable ? 'make-clickable ' : ''
    }flex justify-content-center`}
  >
    <span title={title}>{element}</span>
  </div>
);

export const dropDownFilterTemplate = (
  options: ColumnFilterElementTemplateOptions,
  categories: string[],
) => {
  return (
    <Dropdown
      value={options.value}
      options={categories}
      onChange={(e) => options.filterCallback(e.value, options.index)}
      placeholder="Select One"
      className="p-column-filter"
      showClear
    />
  );
};

export const rangeRowFilterTemplate = (
  options: ColumnFilterElementTemplateOptions,
) => {
  const [from, to] = options.value ?? [null, null];

  return (
    <div className="flex gap-1">
      <InputNumber
        value={from}
        onChange={(e) => options.filterApplyCallback([e.value, to])}
        className="w-full"
        placeholder="from"
      />
      <InputNumber
        value={to}
        onChange={(e) => options.filterApplyCallback([from, e.value])}
        className="w-full"
        placeholder="to"
      />
    </div>
  );
};

export const dateFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
  return (
    <Calendar
      value={options.value}
      onChange={(e) => options.filterCallback(e.value, options.index)}
      dateFormat="mm/dd/yy"
      placeholder="mm/dd/yyyy"
      mask="99/99/9999"
    />
  );
};

export const multiSelectRowFilterTemplate = (
  options: ColumnFilterElementTemplateOptions,
) => (
  <MultiSelect
    value={options.value}
    options={[{ name: 'Guide 1' }, { name: 'Guide 2' }, { name: 'Guide 3' }]}
    onChange={(e) => options.filterApplyCallback(e.value)}
    optionLabel="name"
    placeholder="Any"
    className="p-column-filter"
    maxSelectedLabels={1}
    style={{ minWidth: '14rem' }}
  />
);








