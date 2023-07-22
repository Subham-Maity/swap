import { Box, Table, TableCell, tableCellClasses, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/system';
import React, { useEffect } from 'react';
import { ThemeProps } from 'theme';
import useTransactions, { TxType } from '../../hooks/useTransactions';
import TransactionHistoryPaginationTable from '../../components/TransactionHistoryPaginationTable';

const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: '2%',
  paddingRight: '2%',
  paddingTop: '2%',
});

const HeaderText = styled('p')({
  fontWeight: 600,
  fontSize: 24,
  color: 'black',
});

const Button = styled('button')((props: { theme?: ThemeProps; isactive: boolean }) => ({
  borderRadius: '50px',
  background: props.theme && props.isactive && props.theme.palette.color.active,
  fontWeight: '500',
  color: props.isactive ? 'white!important' : '#999999',
  fontStyle: 'normal',
  textTransform: 'initial',
  borderWidth: 0,
  padding: 5,
  paddingLeft: 15,
  paddingRight: 15,
  width: '80px',
  height: '36px',
  cursor: 'pointer',
}));

const TabBox = styled(Box)({
  float: 'right',
  width: 'fit-content',
  marginBottom: 18,
  borderRadius: 100,
  background: '#f0f0f0',
  marginRight: 24,
});

const TabsBtn = styled('div')({
  paddingRight: '3%',
  paddingBottom: '1%',
  textAlign: 'end',
});

const SwapTransactionHistoryModal = styled('div')({
  backgroundColor: 'white',
  boxShadow: '0px 20px 40px rgb(0 0 0 / 10%)',
  margin: 'auto',
  width: '80%',
  height: '700px',
  borderRadius: 10,
  marginTop: 100,
  '@media (max-width: 660px)': {
    width: '100%',
  },
});

const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f7f7f7',
  },
});

const History = () => {
  const [value, setValue] = React.useState<TxType>(TxType.SWAP);
  const [column, setCoulumn] = React.useState<string[]>(['Details', 'Status', 'From', 'To', 'Network']);

  useEffect(() => {
    let swapColumns = ['Details', 'Status', 'From', 'To', 'Network'];
    let pendingColumns = ['Details', 'Status', 'From', 'To', 'Network / Bridge'];
    let xswapColumns = ['Details', 'Source Token', 'Destination Token', 'Bridge / Transactions'];
    if (value === TxType.XSWAP) {
      setCoulumn(xswapColumns);
    } else if (value === TxType.SWAP) {
      setCoulumn(swapColumns);
    } else {
      setCoulumn(pendingColumns);
    }
  }, [value]);

  let data = useTransactions(value);

  return (
    <>
      <SwapTransactionHistoryModal>
        <Header>
          <HeaderText>Transaction History</HeaderText>
          <TabsBtn>
            <TabBox>
              {value === TxType.SWAP ? (
                <Button isactive={true}>Swaps</Button>
              ) : (
                <Button
                  isactive={false}
                  onClick={() => {
                    setValue(TxType.SWAP);
                  }}
                >
                  Swaps
                </Button>
              )}
              {value === TxType.XSWAP ? (
                <Button isactive={true}>XSwap</Button>
              ) : (
                <Button
                  isactive={false}
                  onClick={() => {
                    setValue(TxType.XSWAP);
                  }}
                >
                  xSwaps
                </Button>
              )}
              {/* {value === 'pending' ? (
                <Button isactive={true}>Pending</Button>
              ) : (
                <Button
                  isactive={false}
                  onClick={() => {
                    setValue('pending');
                  }}
                >
                  Pending
                </Button>
              )} */}
            </TabBox>
          </TabsBtn>
        </Header>

        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {column &&
                column.length > 0 &&
                column.map((key: string, _i) => {
                  return (
                    <StyledTableCell key={_i} width={`${100 / column.length}%`} align="left">
                      {key}
                    </StyledTableCell>
                  );
                })}
            </TableRow>
          </TableHead>
        </Table>
        <TransactionHistoryPaginationTable type={value} data={data} />
      </SwapTransactionHistoryModal>
    </>
  );
};

export default History;
