import React, { useEffect, useState } from 'react';
import bidsImageUrl1 from '../../images/bids_image1.png';
import bidsImageUrl2 from '../../images/bids_image2.png';
import { DataGrid, 
    getGridDateOperators, 
    GRID_DATE_COL_DEF, 
    GridActionsCellItem, 
    GridEditDateCell, 
    GridRowEditStopReasons, 
    GridRowModes,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ko as locale } from 'date-fns/locale';
import { Button, Checkbox, IconButton } from '@mui/material';

const Tab = ({tabs}) => {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <div className='etc1_tabs'>
        {
            tabs.map((tab, index) => (
                <button key={index} onClick={() => setActiveTab(index)} className={activeTab === index ? 'active' : ''} style={activeTab === index ? {'backgroundColor': 'white'} : {}}> {tab.title} </button>
            ))
        }
            <div> {tabs[activeTab].content} </div>
        </div>
    );
}


const Mypage_bids_history = () => {
    const [dataRows, setRows] = useState([
        {id: 1, bidsPicture: bidsImageUrl1, bidsTitle: '외국 옛 동전', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'O'},
        {id: 2, bidsPicture: bidsImageUrl2, bidsTitle: '리미티드 에디션 금장 글라인더', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'X'},
        {id: 3, bidsPicture: bidsImageUrl1, bidsTitle: '외국 옛 동전', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'O'},
        {id: 4, bidsPicture: bidsImageUrl2, bidsTitle: '리미티드 에디션 금장 글라인더', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'X'},
        {id: 5, bidsPicture: bidsImageUrl1, bidsTitle: '외국 옛 동전', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'O'},
        {id: 6, bidsPicture: bidsImageUrl2, bidsTitle: '리미티드 에디션 금장 글라인더', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'X'},
        {id: 7, bidsPicture: bidsImageUrl1, bidsTitle: '외국 옛 동전', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'O'},
        {id: 8, bidsPicture: bidsImageUrl2, bidsTitle: '리미티드 에디션 금장 글라인더', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'X'},
        {id: 9, bidsPicture: bidsImageUrl1, bidsTitle: '외국 옛 동전', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'O'},
        {id: 10, bidsPicture: bidsImageUrl2, bidsTitle: '리미티드 에디션 금장 글라인더', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'X'},
        {id: 11, bidsPicture: bidsImageUrl1, bidsTitle: '외국 옛 동전', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'O'},
        {id: 12, bidsPicture: bidsImageUrl2, bidsTitle: '리미티드 에디션 금장 글라인더', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'X'},
        {id: 13, bidsPicture: bidsImageUrl1, bidsTitle: '외국 옛 동전', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'O'},
        {id: 14, bidsPicture: bidsImageUrl2, bidsTitle: '리미티드 에디션 금장 글라인더', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'X'},
        {id: 15, bidsPicture: bidsImageUrl1, bidsTitle: '외국 옛 동전', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'O'},
        {id: 16, bidsPicture: bidsImageUrl2, bidsTitle: '리미티드 에디션 금장 글라인더', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'X'},
        {id: 17, bidsPicture: bidsImageUrl1, bidsTitle: '외국 옛 동전', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'O'},
        {id: 18, bidsPicture: bidsImageUrl2, bidsTitle: '리미티드 에디션 금장 글라인더', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'X'},
        {id: 19, bidsPicture: bidsImageUrl1, bidsTitle: '외국 옛 동전', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'O'},
        {id: 20, bidsPicture: bidsImageUrl2, bidsTitle: '리미티드 에디션 금장 글라인더', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'X'},
        {id: 21, bidsPicture: bidsImageUrl1, bidsTitle: '외국 옛 동전', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'O'},
        {id: 22, bidsPicture: bidsImageUrl2, bidsTitle: '리미티드 에디션 금장 글라인더', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'X'},
        {id: 23, bidsPicture: bidsImageUrl1, bidsTitle: '외국 옛 동전', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'O'},
        {id: 24, bidsPicture: bidsImageUrl2, bidsTitle: '리미티드 에디션 금장 글라인더', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'X'},
        {id: 25, bidsPicture: bidsImageUrl1, bidsTitle: '외국 옛 동전', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'O'},
        {id: 26, bidsPicture: bidsImageUrl2, bidsTitle: '리미티드 에디션 금장 글라인더', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'X'},
        {id: 27, bidsPicture: bidsImageUrl1, bidsTitle: '외국 옛 동전', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'O'},
        {id: 28, bidsPicture: bidsImageUrl2, bidsTitle: '리미티드 에디션 금장 글라인더', currentPrice: '53,000 원', bidsUnit: '1,000 원', bidsStartDate: '2024.09.14', bidsEndDate: '2024.09.30', instantPurchase: 'X'},

    ]);
    const [rowModesModel, setRowModesModel] = useState({});
    // 체크박스 선택된 행 값들
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectionModel, setSelectionModel] = React.useState([]);

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(dataRows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = dataRows.find((row) => row.id === id);
        if (editedRow.isNew) {
        setRows(dataRows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(dataRows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    // 날짜데이터 포맷
    const  dateAdapter = new AdapterDateFns({ locale });
    const dateColumnType = {
        ...GRID_DATE_COL_DEF,
        resizable: false,
        renderEditCell: (params) => {
          return <GridEditDateCell {...params} />;
        },
        filterOperators: getGridDateOperators(false).map((item) => ({
          ...item,
          InputComponent: GridFilterDateInput,
          InputComponentProps: { showTime: false },
        })),
        valueFormatter: (value) => {
          if (value) {
            return dateAdapter.format(value, 'keyboardDate');
          }
          return '';
        },
    };

    function GridFilterDateInput(props) {
        const { item, showTime, applyValue, apiRef } = props;
      
        const Component = showTime ? DateTimePicker : DatePicker;
      
        const handleFilterChange = (newValue) => {
          applyValue({ ...item, value: newValue });
        };
      
        return (
          <Component
            value={item.value ? new Date(item.value) : null}
            autoFocus
            label={apiRef.current.getLocaleText('filterPanelInputLabel')}
            slotProps={{
              textField: {
                variant: 'standard',
              },
              inputAdornment: {
                sx: {
                  '& .MuiButtonBase-root': {
                    marginRight: -1,
                  },
                },
              },
            }}
            onChange={handleFilterChange}
          />
        );
    }
    // 버튼 만들기
    

    const dataColumns = [
        { field: 'bidsPicture', headerName: '경매 품목 사진', headerAlign: 'center', align: 'center', width: 110, renderCell: (params) => <img src={params.value} alte='' />},
        { field: 'bidsTitle', headerName: '제목', headerAlign: 'center', align: 'center', width: 120, editable: true},
        { field: 'currentPrice', headerName: '현재가', headerAlign: 'center', align: 'center', editable: true},
        { field: 'bidsUnit', headerName: '입찰단위', headerAlign: 'center', align: 'center', width: 80, editable: true},
        { field: 'bidsStartDate', ...dateColumnType, headerName: '경매 시작일', headerAlign: 'center', align: 'center', editable: true},
        { field: 'bidsEndDate', ...dateColumnType, headerName: '경매 종료일', headerAlign: 'center', align: 'center', editable: true},
        { field: 'instantPurchase', headerName: '즉시 구매', headerAlign: 'center', align: 'center', width: 80, editable: true},
        {
            field: 'update',
            type: 'actions',
            headerName: '수정',
            width: 80,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                return [
                    <GridActionsCellItem
                    icon={<SaveIcon />}
                    label="Save"
                    sx={{
                        color: 'primary.main',
                        backgroundColor: 'blue'
                    }}
                    onClick={handleSaveClick(id)}
                    />,
                    <GridActionsCellItem
                    icon={<CancelIcon />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={handleCancelClick(id)}
                    color="inherit"
                    sx={{ 
                        width: '5rem',
                    }}
                    />,
                ];
                }

                return [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    onClick={handleEditClick(id)}
                    sx={{
                        width: '5rem',
                    }}
                    color="inherit"
                />
                ];
            },
        },
        {
            field: "delete",
            headerName: '일괄삭제',
            width: 60,
            align: 'center',
            sortable: false,
            disableColumnMenu: true,
            renderHeader: () => {
              return (
                <IconButton
                  onClick={() => {
                    const selectedIDs = new Set(selectionModel);
                    // you can call an API to delete the selected IDs
                    // and get the latest results after the deletion
                    // then call setRows() to update the data locally here
                    setRows((r) => r.filter((x) => !selectedIDs.has(x.id)));
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              );
            }
        }
    ];

    const MyTabData = [
        { title: '구매한 경매', content: 
            <div className='etc1_auction_table' style={{ height: 300, width: '100%'}}>
                <DataGrid rows={dataRows}
                          sx={
                                { 
                                    '&, [class^=MuiDataGrid]': { border: 'none', borderTopRightRadius: '10px' }
                                }
                            }
                          columns={dataColumns}
                          initialState = {{
                            pagination: { paginationModel: {pageSize: 2}}
                          }}
                          pageSizeOptions={[2, 5, 10]}
                          editMode='row'
                          rowModesModel={rowModesModel}
                          onRowModesModelChange={handleRowModesModelChange}
                          onRowEditStop={handleRowEditStop}
                          processRowUpdate={processRowUpdate}
                          checkboxSelection rowHeight={100}
                          onRowSelectionModelChange={(ids) => {
                            setSelectionModel(ids);
                          }} 
                />
            </div> 
        },
        { title: '판매한 경매', content: <div>Tab 2 content</div> },
        { title: '완료된 경매', content: <div>Tab 3 content</div> }
    ];

    const MyInterestTabData = [
        { title: '일반경매', content: 
        <div>
            <table className='etc1_auction_table'>
                <thead>
                    <tr>
                        <th><Checkbox
                            inputProps={{ 'aria-label': 'controlled' }}/></th>
                        <th>경매 품목 사진</th>
                        <th>제목</th>
                        <th>현재가</th>
                        <th>입찰단위</th>
                        <th>경매 시작일</th>
                        <th>경매 종료일</th>
                        <th>즉시구매</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><Checkbox
                            inputProps={{ 'aria-label': 'controlled' }}/></td>
                        <td><img src={bidsImageUrl1} /></td>
                        <td>외국 옛 동전</td>
                        <td>53,000 원</td>
                        <td>1,000 원</td>
                        <td>2024.09.14</td>
                        <td>2024.09.30</td>
                        <td>O</td>
                    </tr>
                    <tr>
                        <td><Checkbox
                            inputProps={{ 'aria-label': 'controlled' }}/></td>
                        <td><img src={bidsImageUrl2} /></td>
                        <td>리미티드 에디션 금장 글라인더</td>
                        <td>53,000 원</td>
                        <td>1,000 원</td>
                        <td>2024.09.14</td>
                        <td>2024.09.30</td>
                        <td>X</td>
                    </tr>
                </tbody>
            </table>
            <div className='etc1_bids_button_roundary'>
				<button id='bids_interest_delete_btn'>삭제</button>
			</div>
        </div> },
        { title: '실시간경매', content: <div>Tab 2 content</div> }
    ];

    return (
        <div className='etc1_auction-container'>
            <h1>나의 경매</h1>
            <Tab tabs={MyTabData} />
            <h1>관심 경매</h1>
            <Tab tabs={MyInterestTabData} />
        </div>
    );
};

export default Mypage_bids_history;