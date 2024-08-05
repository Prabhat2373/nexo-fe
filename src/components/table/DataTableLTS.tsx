// import {
//   flexRender,
//   getCoreRowModel,
//   getFacetedRowModel,
//   getFacetedUniqueValues,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
//   type ColumnDef,
//   type VisibilityState
// } from '@tanstack/react-table';

// import {
//   closestCenter,
//   DndContext,
//   DragOverlay,
//   KeyboardSensor,
//   MouseSensor,
//   TouchSensor,
//   useSensor,
//   useSensors
// } from '@dnd-kit/core';
// import * as React from 'react';

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from '@/components/ui/table';
// // import { debounce, isEmpty } from '@/utils/Utils';

// import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

// // import LoadingTable from '@/components/table/dataTable/LoadingTable';
// // import NoData from '@/components/table/dataTable/NoData';
// import { useDataTableContext } from '@/contexts/app/DataTableContext';
// import useDataTableStates from '@/hooks/table/useDataTableStates';
// import useTableDnd from '@/hooks/table/useTableDnd';
// import { useQueryParam } from '@/hooks/useQueryParams';
// import Query from '@/lib/Query';
// import { DraggableTableRow } from '../DraggableTableRow';
// import { StaticTableRow } from '../StaticTableRow';
// import { DataTablePagination } from './DataTablePagination';
// import { DataTableToolbar } from './DataTableToolbar';

// import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
// import classNames from 'classnames';

// /**
//  * DataTableLTS Component
//  *
//  * A versatile data table component with various customization options.
//  *
//  * @component
//  * @param {Object[]} columns - An array of column definitions for the table.
//  * @param {string} id - A unique identifier for the DataTable.
//  * @param {Object} [response] - Data response to populate the table (can be an array or object).
//  * @param {boolean} [hidePagination=false] - Whether to hide the pagination controls.
//  * @param {boolean} [hideToolbar=false] - Whether to hide the table toolbar.
//  * @param {JSX.Element} [toolbar] - Custom JSX element to be displayed in the toolbar.
//  * @param {boolean} [hideHeader=false] - Whether to hide the table header.
//  * @param {boolean} [hideRowSelected=false] - Whether to hide row selection checkboxes.
//  * @param {boolean} [showNumbering=false] - Whether to display row numbers.
//  * @param {function} lazyQueryHook - A function for lazy data loading.
//  * @param {Object} [extraFilters] - Additional filters to apply to the table.
//  * @param {boolean} [quickAction=false] - Whether to enable quick action buttons.
//  * @param {Object} [query] - Additional query parameters for the data request.
//  * @param {string} [param] - A specific parameter key to use in query parameters.
//  * @param {function} [handleRowClick] - A function to handle row click events.
//  *
//  * @example
//  * // Example usage:
//  * <DataTableLTS
//  *   columns={columns}
//  *   id="myDataTable"
//  *   name="Data Table"
//  *   response={data}
//  *   hidePagination={false}
//  *   hideToolbar={true}
//  *   toolbar={<CustomToolbar />}
//  *   hideHeader={false}
//  *   hideRowSelected={true}
//  *   showNumbering={true}
//  *   lazyQueryHook={rtkLazyQuery}
//  *   extraFilters={filters}
//  *   quickAction={false}
//  *   query={additionalQueryParams}
//  *   param="myParam"
//  *   handleRowClick={handleClick}
//  * />
//  */

// export interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   name?: string;
//   selectedRows?: any;
//   id: string;
//   response?: any;
//   hidePagination?: boolean;
//   hideToolbar?: boolean;
//   toolbar?: JSX.Element;
//   stickyCol?: any;
//   hideHeader?: boolean;
//   hideRowSelected?: boolean;
//   showNumbering?: boolean;
//   lazyQueryHook: any;
//   extraFilters?: any;
//   quickAction?: boolean;
//   query?: any;
//   param?: string;
//   handleRowClick?: (row: any) => void;
//   initialQuery?: string;
//   tableFilter?: any;
//   toolbarOptions?: any;
//   isBorderHidden?: boolean;
//   customeNoData?: any;
//   hideColumnViewOption?: boolean;
//   hideRefresh?: boolean;
//   disableLoading?: boolean;
//   customToolbarOptions?: any;
//   noCss?: boolean;
//   withDnd?: boolean;
//   service?: string;
//   modelName?: string;
//   hideClearFilter?: boolean;
//   vmList?: boolean;
//   tableLimit?: number;
//   withRowSelection?: boolean;
//   // setQuery?: any
// }

// function IndeterminateCheckbox({
//   indeterminate,
//   className = '',
//   ...rest
// }: { indeterminate?: boolean } & React.HTMLProps<HTMLInputElement>) {
//   const ref = React.useRef<HTMLInputElement>(null!);

//   React.useEffect(() => {
//     if (typeof indeterminate === 'boolean') {
//       ref.current.indeterminate = !rest.checked && indeterminate;
//     }
//   }, [ref, indeterminate]);

//   return (
//     <input
//       type="checkbox"
//       ref={ref}
//       className={className + ' cursor-pointer rounded-md'}
//       {...rest}
//     />
//   );
// }

// function DataTableLTS<TData, TValue>(props: DataTableProps<TData, TValue>) {
//   const {
//     columns,
//     param,
//     // selectedRows,
//     id,
//     stickyCol,
//     response,
//     hidePagination = false,
//     hideToolbar = false,
//     extraFilters,
//     quickAction,
//     toolbar,
//     hideHeader,
//     hideRowSelected,
//     showNumbering,
//     lazyQueryHook,
//     name,
//     handleRowClick,
//     initialQuery,
//     tableFilter,
//     toolbarOptions,
//     customeNoData,
//     hideColumnViewOption,
//     customToolbarOptions,
//     hideRefresh,
//     isBorderHidden,
//     noCss,
//     disableLoading = false,
//     withDnd = false,
//     service,
//     modelName,
//     hideClearFilter,
//     vmList,
//     tableLimit,
//     withRowSelection
//   } = props;

//   const [enableDnd, setEnableDnd] = React.useState(false);
//   const [rowSelection, setRowSelection] = React.useState({});
//   const initialColumns = columns?.reduce((result, obj) => {
//     if (obj.defaultHidden) {
//       result[obj.accessorKey] = !obj.defaultHidden;
//     }

//     return result;
//   }, {});
//   const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(initialColumns);

//   const {
//     columnFilters,
//     isLoading,
//     isModalOpen,
//     selectedRowData,
//     setColumnFilters,
//     setIsLoading,
//     setIsModalOpen,
//     setSelectedRowData,
//     setSorting,
//     sorting
//   } = useDataTableStates();

//   const { setDataTableProps, setSelectedRows, selectedRows } = useDataTableContext();

//   const [query, queryOptions] = useQueryParam(id);
//   const [loadData, { data, isLoading: isDataLoading }] = lazyQueryHook;

//   const [result, setResult] = React.useState([]);

//   React.useEffect(() => {
//     if (Array.isArray(data?.data)) {
//       setResult(data?.data);
//     } else if (data?.data?.data) {
//       setResult(data?.data?.data);
//     }
//   }, [data?.data]);

//   const items =
//     React.useMemo(() => {
//       if (result) {
//         return result?.map(({ id }) => id);
//       }
//     }, [result]) ?? [];

//   const debouncedLoad = React.useCallback(
//     debounce((params) => {
//       setIsLoading(true);
//       loadData(params).then(() => {
//         setIsLoading(false);
//       });
//     }, 500),
//     []
//   );

//   const queryBuilder = new Query();

//   const currentPage = query?.page;
//   const limit = query?.limit;
//   const rowNumber = (rowIndex: number) => (currentPage - 1) * limit + rowIndex + 1;

//   const columnsWithCheckbox = () => {
//     if (withRowSelection) {
//       return [
//         {
//           id: 'select',
//           header: ({ table }) => (
//             <div className="px-1">
//               <IndeterminateCheckbox
//                 {...{
//                   checked: table.getIsAllRowsSelected(),
//                   indeterminate: table.getIsSomeRowsSelected(),
//                   onChange: table.getToggleAllRowsSelectedHandler()
//                 }}
//               />
//             </div>
//           ),
//           cell: ({ row }) => (
//             <div className="px-1">
//               <IndeterminateCheckbox
//                 {...{
//                   checked: row.getIsSelected(),
//                   disabled: !row.getCanSelect(),
//                   indeterminate: row.getIsSomeSelected(),
//                   onChange: row.getToggleSelectedHandler()
//                 }}
//               />
//             </div>
//           )
//         },
//         ...columns
//       ];
//     } else {
//       return columns;
//     }
//   };

//   const table = useReactTable({
//     data: result ?? [],
//     columns: columnsWithCheckbox(),
//     state: {
//       sorting,
//       columnVisibility,
//       rowSelection,
//       columnFilters
//     },
//     enableRowSelection: true,
//     onRowSelectionChange: setRowSelection,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     onColumnVisibilityChange: setColumnVisibility,

//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFacetedRowModel: getFacetedRowModel(),
//     getFacetedUniqueValues: getFacetedUniqueValues()
//   });

//   const {
//     handleDragCancel,
//     // handleDragEnd,
//     handleDragStart,
//     // sensors,
//     sortedData,
//     activeId,
//     setActiveId,
//     isDroped,
//     setIsDroped,
//     setSortedData
//   } = useTableDnd(items, table.getRowModel().rows);

//   console.log('table', table.getSelectedRowModel().rows);

//   const sensors = useSensors(
//     useSensor(MouseSensor, {}),
//     useSensor(TouchSensor, {}),
//     useSensor(KeyboardSensor, {})
//   );

//   React.useEffect(() => {
//     setSortedData(table.getRowModel().rows);
//   }, [table.getRowModel().rows]);

//   const placeholderFn = React.useMemo(() => {
//     return {
//       set: (arg?: any) => {}
//     };
//   }, []);
//   React.useEffect(() => {
//     setDataTableProps({
//       ...props,
//       table,
//       refetch: fetchLatest,
//       query: query,
//       data: data,
//       queryOptions: queryOptions ?? placeholderFn,
//       hideColumnViewOption,
//       isLoading,
//       isDroped,
//       setIsDroped,
//       enableDnd,
//       setEnableDnd,
//       withDnd,
//       service,
//       modelName,
//       hideClearFilter
//     });
//   }, [query, data, isDroped, enableDnd, isLoading]);

//   const rowsToSelect = table.getSelectedRowModel()?.rows || [];

//   React.useEffect(() => {
//     console.log('rowsToSelect', rowsToSelect);
//     setSelectedRows(rowsToSelect);
//   }, [rowsToSelect]);

//   React.useEffect(() => {
//     if (!selectedRows?.length && !!rowsToSelect) {
//       table.resetRowSelection();
//     }
//   }, [selectedRows]);

//   const Params = () => {
//     queryBuilder.for(param ? param : id);
//     if (query?.params) queryBuilder.params(query.params);

//     if (query?.limit) {
//       queryBuilder.limit(Number(query?.limit) ?? 50);
//     }

//     if (query?.sort) queryBuilder.sort(query?.sort ?? '');

//     if (query?.include) queryBuilder.includes(query?.include);
//     if (query?.page) queryBuilder.page(Number(query.page) ?? 1);
//     if (!isEmpty(tableFilter)) {
//       Object.keys(tableFilter).forEach((key) => {
//         if (!!tableFilter[key]) {
//           queryBuilder.where(key, tableFilter[key]);
//         }
//       });
//     }
//     if (query?.filter) {
//       for (const [key, value] of Object.entries(
//         typeof query.filter === 'string' ? JSON.parse(query.filter) : query.filter
//       )) {
//         queryBuilder.where(key, value);
//       }
//     }
//     // table.getAllColumns().map((col) => {
//     //
//     //

//     //   if (query && query.search) {
//     //     columns?.forEach((item, index) => {
//     //

//     //       if (
//     //         !item?.ignoreFilter ||
//     //         typeof item?.ignoreFilter === 'undefined'
//     //       ) {
//     //         queryBuilder.where(col.id, query.search ?? '')
//     //       }
//     //     })
//     //   }
//     // })

//     return queryBuilder;
//   };

//   React.useEffect(() => {
//     if (tableLimit) {
//       table.setPageSize(Number(tableLimit));
//       queryOptions?.set({
//         limit: tableLimit
//       });
//     }
//   }, [tableLimit]);

//   function handleDragEnd(event) {
//     const { active, over } = event;
//     if (active.id !== over.id) {
//       setResult((data) => {
//         const oldIndex = items.indexOf(active.id);
//         const newIndex = items.indexOf(over.id);
//         return arrayMove(data, oldIndex, newIndex);
//       });
//     }
//     setIsDroped(true);

//     setActiveId(null);
//   }

//   const selectedRow = React.useMemo(() => {
//     if (!activeId) {
//       return null;
//     }

//     const row = table.getRowModel().rows.find(({ original }) => original.id === activeId);
//     return row;
//   }, [activeId, table.getRowModel().rows]);

//   React.useEffect(() => {
//     table.getAllColumns().map((col) => {
//       if (query && query.search) {
//         columns?.forEach((item, index) => {
//           // if (!item?.ignoreFilter) {
//           // Params().where(col.id, query.search ?? '')
//           Params().where('search', query.search ?? '');
//           // }
//         });
//       }
//     });
//   }, [query]);

//   const getQueryUrl = () => {
//     if (param && initialQuery) {
//       return `${Params().url()}&${initialQuery}`;
//     }
//     if (param && !initialQuery) return Params().url();
//     if (initialQuery) {
//       return `?${initialQuery}&${Params().url().split('?')[1]}`;
//     }

//     return `?${Params().url().split('?')[1]}`;
//   };

//   const fetchLatest = () => {
//     debouncedLoad(getQueryUrl());
//   };

//   React.useEffect(() => {
//     fetchLatest();
//   }, [query, param]);

//   const DataComponent = () => (
//     <>
//       <SortableContext items={items} strategy={verticalListSortingStrategy}>
//         {table.getRowModel().rows.map((row, index) => {
//           if (enableDnd) {
//             return (
//               <DraggableTableRow
//                 row={row}
//                 flexRender={flexRender}
//                 rowNumber={rowNumber}
//                 showNumbering={showNumbering}
//                 key={row?.original?.id}
//               />
//             );
//           }
//           if (!enableDnd) {
//             return (
//               <TableRow
//                 key={row.id}
//                 data-state={row.getIsSelected() && 'selected'}
//                 className={classNames(
//                   {
//                     'bg-slate-50 dark:bg-background-light': row.index % 2 == 1
//                   },
//                   {
//                     'dark:bg-transparent': vmList && row.index % 2 == 1
//                   },
//                   { 'hover:bg-transparent bg-transparent ': noCss }
//                 )}
//                 onClick={() => {
//                   if (handleRowClick) {
//                     handleRowClick(row);
//                   }
//                 }}
//               >
//                 {showNumbering ? (
//                   <TableCell key={row.index} noCss={noCss}>
//                     <span className="inline-block pl-4 text-center">{rowNumber(row.index)}</span>
//                   </TableCell>
//                 ) : null}
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell
//                     key={cell.id}
//                     noCss={noCss}
//                     className={`${
//                       cell?.column?.id.toLowerCase() === 'actions'
//                         ? 'sticky right-0 z-10 bg-white drop-shadow-md'
//                         : ''
//                     } ${
//                       stickedCol?.includes(cell?.column?.id)
//                         ? 'sticky left-0 z-10 bg-white drop-shadow-md'
//                         : ''
//                     } `}
//                   >
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             );
//           }
//         })}
//       </SortableContext>
//     </>
//   );

//   const handleColClick = (id) => {
//     if (stickedCol.includes(id)) {
//       setStickedCol((prevArray) => prevArray.filter((string) => string !== id));
//     } else {
//       setStickedCol((prevArray) => [...prevArray, id]);
//     }
//   };

//   const [stickedCol, setStickedCol] = React.useState(stickyCol ?? []);

//   // function calculateWidthOfFirstString(string) {
//   //   // Create a temporary element to calculate width
//   //   const tempElement = document.createElement('span')

//   //   // Set the text content to the string
//   //   tempElement.textContent = string

//   //   // Set the style to match the TableHead style
//   //   tempElement.style.position = 'absolute'
//   //   tempElement.style.visibility = 'hidden'
//   //   tempElement.style.whiteSpace = 'nowrap'
//   //   tempElement.style.fontSize = '16px' // Adjust as necessary

//   //   // Append the element to the document body to get accurate width calculation
//   //   document.body.appendChild(tempElement)

//   //   // Get the computed width of the element
//   //   const width = tempElement.offsetWidth

//   //   // Remove the temporary element from the DOM
//   //   document.body.removeChild(tempElement)

//   //   // Return the width
//   //   return width + 'px'
//   // }

//   return (
//     <div className="space-y-4">
//       <>
//         {!hideToolbar && !toolbar ? (
//           <>
//             <DataTableToolbar
//               // hideColumnViewOption={hideColumnViewOption}
//               table={table}
//               extraFilters={extraFilters}
//               isLoading={isLoading}
//               refetchData={fetchLatest}
//               customToolbarOptions={customToolbarOptions}
//               query={query}
//               queryOptions={queryOptions}
//               toolbarOptions={toolbarOptions}
//             />
//           </>
//         ) : (
//           <>{toolbar}</>
//         )}
//         {/* <div className="border border-border-foreground_100"> */}
//         <DndContext
//           sensors={sensors}
//           onDragEnd={handleDragEnd}
//           onDragStart={handleDragStart}
//           onDragCancel={handleDragCancel}
//           collisionDetection={closestCenter}
//           modifiers={[restrictToVerticalAxis]}
//         >
//           <Table isBorderHidden={isBorderHidden} vmList={vmList}>
//             {data?.data?.length ? (
//               <>
//                 {!hideHeader ? (
//                   <>
//                     <TableHeader>
//                       {table?.getHeaderGroups()?.map((headerGroup, index) => (
//                         <>
//                           <TableRow key={headerGroup.id}>
//                             {showNumbering ? (
//                               <TableHead key="#">
//                                 <span className="inline-block pl-4 text-center">#</span>
//                               </TableHead>
//                             ) : null}

//                             {headerGroup.headers.map((header) => {
//                               return (
//                                 <TableHead
//                                   onClick={() => {
//                                     handleColClick(header.id);
//                                   }}
//                                   key={header.id}
//                                   className={` ${
//                                     header?.id.toLowerCase() === 'actions'
//                                       ? 'sticky right-0 z-90 drop-shadow-md bg-[#e8edf6] dark:bg-primary-foreground_100'
//                                       : ''
//                                   }
//                                      ${
//                                        stickedCol?.includes(header.id)
//                                          ? `sticky start-[0px] z-90 drop-shadow-md bg-[#e8edf6] dark:bg-primary-foreground_100`
//                                          : ''
//                                      }
//                                     `}
//                                 >
//                                   {header.isPlaceholder
//                                     ? null
//                                     : flexRender(
//                                         header.column.columnDef.header,
//                                         header.getContext()
//                                       )}
//                                 </TableHead>
//                               );
//                             })}
//                           </TableRow>
//                         </>
//                       ))}
//                     </TableHeader>
//                   </>
//                 ) : null}
//               </>
//             ) : null}

//             <TableBody>
//               {process.env.NEXT_PUBLIC_DISABLE_TABLE_LOADING !== 'true' &&
//               isLoading &&
//               !disableLoading ? (
//                 <LoadingTable columns={columns} />
//               ) : data && data?.data?.length ? (
//                 <DataComponent />
//               ) : (
//                 <>
//                   {customeNoData ? (
//                     <TableRow
//                       noCss={noCss}
//                       className={classNames({
//                         'hover:bg-transparent bg-transparent ': noCss
//                       })}
//                     >
//                       <TableCell colSpan={columns.length} noCss={noCss}>
//                         {customeNoData}
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     <NoData columns={columns} name={name} />
//                   )}
//                 </>
//               )}
//             </TableBody>
//           </Table>

//           <DragOverlay>
//             {activeId && (
//               <table style={{ width: '100%' }}>
//                 <tbody>
//                   <StaticTableRow row={selectedRow} />
//                 </tbody>
//               </table>
//             )}
//           </DragOverlay>
//         </DndContext>
//         {!hidePagination && table && data ? (
//           <DataTablePagination
//             table={table}
//             response={data}
//             query={query}
//             queryOptions={queryOptions}
//             hideRowSelected={hideRowSelected}
//           />
//         ) : null}
//       </>
//     </div>
//   );
// }

// export default DataTableLTS;
