import css from './LogOut.module.css';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../../../redux/auth/operation.js';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { closeModal } from '../../../redux/modal/slice.js';

const LogOutModal = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <div className={css.modalWindCont}>
            <div className={css.titleText}>
                <h2 className={css.title}>{t('modals.logOut.title')}</h2>
                <p className={css.text}>{t('modals.logOut.text')}</p>
            </div>
            <div className={css.modalButtonCont}>
                <button
                    className={css.logoutButton}
                    onClick={() => {
                        dispatch(logOutUser());
                        dispatch(closeModal());
                        toast.success(t('toast.logOut'));
                    }}
                >
                    {t('modals.logOut.logOut')}
                </button>
                <button
                    className={css.cancelButton}
                    onClick={dispatch(closeModal())}
                >
                    {t('modals.logOut.cancel')}
                </button>
            </div>
        </div>
    );
};

export default LogOutModal;
