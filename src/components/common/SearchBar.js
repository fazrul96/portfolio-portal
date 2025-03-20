import React from "react";
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ searchQuery, onSearchChange, t }) => {
    return (
        (<TextField
            label={t("search.label")}
            value={searchQuery}
            onChange={onSearchChange}
            variant="outlined"
            size="small"
            fullWidth
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }
            }}
        />)
    );
};

export default SearchBar;
