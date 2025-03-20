import React from 'react';
import {Box, Typography} from '@mui/material';
import PDFViewer from '../common/PDFViewer';
import ProfileTabs from "../common/tab/ProfileTabs";
import DownloadButton from "../common/button/DownloadButton";

const modalDialogStyles = {
    paddingTop: '50px',
    paddingLeft: '10px',
    paddingRight: '10px',
};

const ProfileModal = ({
                          modalId,
                          modalTitle,
                          tabs,
                          activeTab,
                          handleTabChange,
                          handleDownload,
                          workerUrl,
                      }) => (
    <Box sx={{ flexGrow: 1 }}>
        <div
            className="modal fade"
            id={modalId}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="resumeModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg" style={modalDialogStyles} role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="resumeModalLabel">{modalTitle}</h5>
                        <DownloadButton
                            onClick={handleDownload}
                            disabled={!tabs[activeTab].fileUrl}
                            label="Download"
                        />
                    </div>
                    <div className="modal-body">
                        <ProfileTabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

                        {tabs[activeTab].description && (
                            <Typography variant="body2" sx={{ margin: '10px 0' }}>
                                {tabs[activeTab].description}
                            </Typography>
                        )}

                        <PDFViewer
                            fileUrl={tabs[activeTab].fileUrl}
                            workerUrl={workerUrl}
                        />
                    </div>
                </div>
            </div>
        </div>
    </Box>
);

export default ProfileModal;
