import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, CardHeader, Grid2, Tooltip, CircularProgress, Typography } from "@mui/material";
import FormInput from "../../common/FormInput";

const GeneralForm = ({
                         newItem,
                         errors,
                         onInputChange,
                         onAddItem,
                         fieldConfig,
                         buttonText,
                         tooltipText,
                         headerTitle,
                         t,
                         loading,
                         module
                     }) => {
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const allFieldsFilled = fieldConfig.every(
            ({ name, isRequired }) => isRequired && newItem[name] && newItem[name].trim() !== ""
        );
        setIsFormValid(allFieldsFilled);
    }, [newItem, fieldConfig]);

    const getButtonText = () => {
        if (loading) {
            return (
                <span>
                    <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                    {t("buttons.adding")}
                </span>
            );
        }
        return buttonText || t("button.addItem");
    };

    return (
        <Grid2 container spacing={2} justifyContent="center">
            <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                <Card>
                    <CardHeader
                        title={headerTitle || t("header")}
                    />
                    <CardContent>
                        <Grid2 container spacing={2}>
                            {(fieldConfig || []).map(({ name, type, label, inputProps, isDate, isRequired, options }) => (
                                <Grid2 size={{ xs: 12, sm: 6, md: 6 }} key={name}>
                                    <FormInput
                                        label={label}
                                        name={name}
                                        value={newItem?.[name] || ''}
                                        onChange={onInputChange}
                                        error={!!errors?.[name]}
                                        helperText={errors?.[name] || ''}
                                        tooltip={t(`dialog.${module}.tooltip.${name}`)}
                                        inputProps={inputProps || (name === "donation" ? { min: 0 } : {})}
                                        type={type}
                                        required={isRequired}
                                        InputLabelProps={isDate ? { shrink: true } : {}}
                                        select={type === "select"}
                                        options={options}
                                    />
                                </Grid2>
                            ))}

                            {/** Form Validation Feedback */}
                            {Object.keys(errors || {}).length > 0 && (
                                <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                                    <Typography color="error" variant="body2">
                                        {t("form.validationError")} {/* Customize the validation error message */}
                                    </Typography>
                                </Grid2>
                            )}

                            <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                                <Tooltip title={loading ? tooltipText.adding : tooltipText.addItem} arrow>
                                    <span>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={onAddItem}
                                            disabled={loading || !isFormValid}
                                            sx={{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {getButtonText()}
                                        </Button>
                                    </span>
                                </Tooltip>
                            </Grid2>
                        </Grid2>
                    </CardContent>
                </Card>
            </Grid2>
        </Grid2>
    );
};

export default GeneralForm;
