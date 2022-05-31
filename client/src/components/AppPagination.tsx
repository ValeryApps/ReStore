import { Box, Typography, Pagination } from '@mui/material'
import { MetaData } from '../models/pagination'

interface Props{
 metaData:MetaData;
 onPageChange:(page:number)=>void;
}

const AppPagination = ({metaData, onPageChange}:Props) => {
    const {currentPage, pageSize, totalCount, totalPages} = metaData;
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
    <Typography>Displaying {(currentPage-1)*pageSize+1} - {currentPage*pageSize > totalCount ? totalCount:currentPage*pageSize} of {totalCount} items</Typography>
    <Pagination count={totalPages} color="secondary" size="large" page={currentPage} onChange={(e:any, page:number)=>onPageChange(page)} />
  </Box>
  )
}

export default AppPagination