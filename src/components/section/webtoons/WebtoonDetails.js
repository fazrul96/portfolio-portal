import React from "react";
import {Grid2} from "@mui/material";
import InfoDisplay from "./../../common/InfoDisplay";

const WebtoonDetails = ({ webtoon }) => {
    return (
        <Grid2 container spacing={2}>
            <InfoDisplay label="Genre" data={webtoon?.genre} separator="," />
            <InfoDisplay label="Author" data={webtoon?.author} separator="/" />
            <InfoDisplay label="Artist" data={webtoon?.artist} separator="/" />
            <InfoDisplay label="Status" data={webtoon?.status} />
            <InfoDisplay label="Type" data={webtoon?.type} />
            <InfoDisplay label="Last Updated" data={webtoon?.updatedDate} isDate />
        </Grid2>
    );
};

export default WebtoonDetails