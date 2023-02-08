import { Box, Modal } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import Confirmation from 'components/modals/Confirmation';
import Drivers from 'views/admin/Drivers.js';
import Dynamic from 'views/admin/Dynamic.js';
import Unrouted from 'views/admin/Unrouted.js';

export default function Admin() {
  const { page } = useParams();
  const [openModal, setOpenModal] = React.useState(false);
  const handleCloseModal = () => setOpenModal(false);
  return (
    <>
      <Sidebar openModal={openModal} setOpenModal={setOpenModal} />
      <Box
        className="relative bg-blueGray-100 h-screen"
        sx={{ marginLeft: { md: '16rem' } }}
      >
        <div className="bg-lightBlue-600 pb-16 pt-8">
          <AdminNavbar />
        </div>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
        >
          <div style={{ alignItems: 'center' }} className="place-content-center items-center align-center">
            <Confirmation openModal={openModal} setOpenModal={setOpenModal} />
          </div>
        </Modal>
        <div className="absolute px-4 md:px-10 mx-auto w-full -m-24 z-0 bg-blueGray-100">
          {
                        (page === 'drivers') && <Drivers />
                    }
          {
                        (page === 'unrouted') && <Unrouted />
                    }
          {
                        (page === 'dynamic') && <Dynamic />
                    }
        </div>
      </Box>
    </>
  );
}
