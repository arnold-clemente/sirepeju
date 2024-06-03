import React from 'react'
import { useModal } from 'hooks/useModal';
import Modal from 'react-modal';
import ReactPlayer from 'react-player'

const CardVIdeo = ({ video }) => {
    const [modal, openModal, closeModal] = useModal(false);
    const url = import.meta.env.VITE_BACKEND_URL;
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <div className='video_play'>
            <button onClick={openModal}>
                <img src={url + '/storage/' + video.imagen} alt="image" />
                <span>{video.descripcion}</span>
            </button>
            <Modal
                isOpen={modal}
                ariaHideApp={false}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal} className='close_video_modal'>
                    <i className="fa-solid fa-x"></i>
                </button>
                <ReactPlayer
                    url={url + '/storage/' + video.video}
                    width={'100%'}
                    playing={true}
                    controls={true}
                />
            </Modal>
        </div>
    )
}

export default CardVIdeo
