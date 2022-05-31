import { debounce, TextField } from '@mui/material'
import { useState } from 'react'
import { setProductParams } from '../store/catalog/catalogSlice';
import { useAppDispatch, useAppSelector } from '../store/configStore'

const SearchField = () => {
    const { productParams } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
    const searchDebound = debounce(event => {
        dispatch(setProductParams({ searchTerm: event.target.value }))
    }, 1500)
    return (
        <TextField
            fullWidth
            label="Search"
            variant="outlined"
            value={searchTerm || ''}
            onChange={event => {
                setSearchTerm(event.target.value);
                searchDebound(event)
            }
            }
        />
    )
}

export default SearchField