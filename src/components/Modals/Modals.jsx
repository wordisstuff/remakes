import License from './License/License';
import LogOutModal from './LogOut/LogOut';
import SettingsModal from './UserSettings/UserSettings';
import { useDispatch, useSelector } from 'react-redux';
import { icons } from '../../icons/index';
import Modal from 'react-modal';
import { useEffect } from 'react';
import { closeModal } from '../../redux/modal/slice';
import { selectModal } from '../../redux/modal/selectors';
import { SongModal } from './Song/SongModal.jsx';
import CSS from './Modals.module.css';

Modal.setAppElement('#root');

const Modals = () => {
    const dispatch = useDispatch();
    const { isOpen, modalType } = useSelector(selectModal);
    console.log(modalType, isOpen);
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);
    if (!isOpen) return null;

    const renderModalContent = () => {
        switch (modalType) {
            case 'logout':
                return <LogOutModal />;
            case 'settings':
                return <SettingsModal />;
            case 'license':
                return <License />;
            case 'song':
                return <SongModal />;
            default:
                return null;
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => dispatch(closeModal())}
            className={{
                base: CSS.modalContent,
                afterOpen: CSS.modalContentOpen,
                beforeClose: CSS.beforeClose,
            }}
            closeTimeoutMS={300}
            style={{
                overlay: {
                    backgroundColor: 'rgba(47, 47, 47, 0.6)',
                    zIndex: '15',
                    overflow: 'auto',
                    display: 'grid',
                    placeItems: 'center',
                },
            }}
        >
            <button
                className={CSS.closeButton}
                onClick={() => dispatch(closeModal())}
            >
                <svg className={CSS.iconClose}>
                    <use xlinkHref={`${icons}#close`} />
                </svg>
            </button>
            {renderModalContent()}
        </Modal>
    );
    // <div className="modalBackdrop">{renderModalContent()}</div>;
};
export default Modals;
