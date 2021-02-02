/**
 *
 * UserRatingsDataGrid
 *
 */
import { Rating, User } from '@hyperremix/song-contest-rater-model';
import {
  Box,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import { AccountCircle, Functions } from '@material-ui/icons';
import { UserAvatar } from 'app/components/general/UserAvatar';
import { ClothesIcon } from 'app/components/rating/ClothesIcon';
import { LooksIcon } from 'app/components/rating/LooksIcon';
import { ShowIcon } from 'app/components/rating/ShowIcon';
import { SingingIcon } from 'app/components/rating/SingingIcon';
import { SongIcon } from 'app/components/rating/SongIcon';
import * as React from 'react';
import { ratingSum } from 'utils/ratingSum';

interface Props {
  userRatings: { rating: Rating; user?: User }[];
}

interface Data {
  userId: string;
  song: number;
  singing: number;
  show: number;
  looks: number;
  clothes: number;
  sum: number;
}

interface HeadCell {
  id: keyof Data;
  icon: React.ReactChild;
}

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  order: Order;
  orderBy: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function EnhancedTableHead({
  order,
  orderBy,
  onRequestSort,
}: EnhancedTableProps) {
  const createSortHandler = (property: keyof Data) => (
    event: React.MouseEvent<unknown>,
  ) => {
    onRequestSort(event, property);
  };

  const headCells: HeadCell[] = [
    { id: 'userId', icon: <AccountCircle /> },
    { id: 'song', icon: <SongIcon /> },
    { id: 'singing', icon: <SingingIcon /> },
    { id: 'show', icon: <ShowIcon /> },
    { id: 'looks', icon: <LooksIcon /> },
    { id: 'clothes', icon: <ClothesIcon /> },
    { id: 'sum', icon: <Functions /> },
  ];

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.id === 'userId' ? 'left' : 'right'}
            padding="none"
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.icon}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
  avatarColumn: {
    padding: theme.spacing(1, 0),
  },
}));

export function UserRatingsDataGrid({ userRatings }: Props) {
  const classes = useStyles();

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('song');

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const rows: Data[] = userRatings.map(({ rating, user }) => ({
    ...rating,
    userId: user!.id,
    sum: ratingSum(rating),
  }));

  return (
    <Box className={classes.root}>
      <TableContainer>
        <Table>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map(data => (
              <TableRow key={data.userId}>
                <TableCell
                  component="th"
                  scope="row"
                  align="right"
                  padding="none"
                  className={classes.avatarColumn}
                >
                  <UserAvatar
                    user={
                      userRatings.find(ur => ur.user?.id === data.userId)?.user
                    }
                  />
                </TableCell>
                <TableCell align="right" padding="none">
                  {data.song}
                </TableCell>
                <TableCell align="right" padding="none">
                  {data.singing}
                </TableCell>
                <TableCell align="right" padding="none">
                  {data.show}
                </TableCell>
                <TableCell align="right" padding="none">
                  {data.looks}
                </TableCell>
                <TableCell align="right" padding="none">
                  {data.clothes}
                </TableCell>
                <TableCell align="right" padding="none">
                  {data.sum}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
