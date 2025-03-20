import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid2} from "@mui/material";
import FormInput from "../../common/FormInput";

const GeneralModal = ({
                          open,
                          onClose,
                          selectedItem,
                          onInputChange,
                          onSave,
                          fieldConfig,
                          errors,
                          t,
                          module, mode = 'add'
                      }) => {
    const isEditing = selectedItem !== null;
    const renderField = ({ name, type, label, isDate, isRequired, options }) => {
        const isSelect = type === "select";

        return (
            <Grid2 size={{ xs: 12, sm: 12, md: 12 }} key={name}>
                <FormInput
                    label={label}
                    name={name}
                    value={selectedItem?.[name] || ""}
                    onChange={onInputChange}
                    error={errors[name]}
                    helperText={errors[name]}
                    tooltip={t(`dialog.${module}.tooltip.${name}`)}
                    type={type}
                    InputLabelProps={isDate ? { shrink: true } : {}}
                    required={isRequired}
                    select={isSelect}
                    options={isSelect ? options : []}
                />
            </Grid2>
        );
    };

    return (
        <Dialog open={open} onClose={onClose} mode={mode}>
            <DialogTitle>
                {isEditing && mode === 'edit'
                    ? `${t('buttons.edit')} ${t(`dialog.${module}.title`)}`
                    : `${t('buttons.add')} ${t(`dialog.${module}.title`)}`}
            </DialogTitle>
            <Divider sx={{ marginBottom: '5px' }} />
            <DialogContent>
                <Grid2 container spacing={2}>
                    {fieldConfig.map((field) => renderField(field))}
                </Grid2>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => onSave(selectedItem?.id, selectedItem)}
                    variant="contained"
                >
                    {isEditing && mode === 'edit'
                        ? t('buttons.update')
                        : t('buttons.save')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GeneralModal;