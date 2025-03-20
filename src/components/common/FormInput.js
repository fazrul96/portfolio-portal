import React from 'react';
import {FormControl, Grid2, InputLabel, MenuItem, Select, TextField, Tooltip, Typography} from '@mui/material';
import {EMPTY_STRING} from "../../constants/AppConstants";

const FormInput = ({
                       label,
                       name,
                       value,
                       onChange,
                       error,
                       helperText,
                       tooltip,
                       inputProps = {},
                       type = 'text',
                       InputLabelProps = {},
                       options = [],
                   }) => {

    const isSelect = type === 'select';

    const renderHelperText = () => {
        if (helperText) {
            return <Typography variant="body2" color="error">{helperText}</Typography>;
        }
        return null;
    };

    const renderSelect = () => (
        <FormControl fullWidth error={!!error}>
            <InputLabel {...InputLabelProps}>{label}</InputLabel>
                <Select
                    name={name}
                    value={value || EMPTY_STRING}
                    onChange={onChange}
                    inputProps={inputProps}
                    label={label}
                >
                    {options.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            {renderHelperText()}
        </FormControl>
    );

    const renderTextField = () => (
        <TextField
            fullWidth
            label={label}
            variant="outlined"
            name={name}
            value={value || ''}
            onChange={onChange}
            error={!!error}
            helperText={helperText || ''}
            type={type}
            slotProps={{
                htmlInput: inputProps,
                inputLabel: InputLabelProps,
            }}
        />
    );

    const renderInput = isSelect ? renderSelect : renderTextField;

    return (
        <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
            {tooltip ? (
                <Tooltip title={tooltip || ''} arrow enterDelay={500} leaveDelay={200}>
                    <div>{renderInput()}</div>
                </Tooltip>
            ) : (
                renderInput()
            )}
        </Grid2>
    );
};

FormInput.defaultProps = {
    type: 'text',
    select: false,
    options: [],
};

export default FormInput;