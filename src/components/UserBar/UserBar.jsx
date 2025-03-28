import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import css from './UserBar.module.css';
import { RxAvatar } from 'react-icons/rx';
import { icons } from '../../icons/index.js';
import LogOutModal from '../Modals/LogOut/LogOut.jsx';
import UserSettingsModal from '../Modals/UserSettings/UserSettings.jsx';
import { openModal } from '../../redux/modal/slice.js';
import { selectUser } from '../../redux/auth/selectors.js';

const UserBar = () => {
    const { t } = useTranslation();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const userMainInfo = useSelector(selectUser);
    console.log('USER INFO', userMainInfo);

    const dispatch = useDispatch();
    const togglePopover = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };

    const getFirstName = fullName => {
        return fullName ? fullName.split(' ')[0] : t('UserBar.user');
    };

    const handleOpenModal = modalComponent => {
        dispatch(openModal({ type: 'open_modal', payload: modalComponent }));
        setIsPopoverOpen(false);
    };

    return (
        <div className={css.userBarWrapper}>
            {/* <h2 className={css.userWelcome}>
                {t('UserBar.welkome')}
                <span className={css.name}>
                    , {getFirstName(userMainInfo?.name)}!
                </span>
            </h2> */}
            <div className={css.userBarPanel}>
                <button className={css.userBarBtn} onClick={togglePopover}>
                    {getFirstName(userMainInfo?.name)}
                    {userMainInfo?.photo ? (
                        <img
                            src={userMainInfo.photo}
                            alt="User's Avatar"
                            className={css.avatar}
                        />
                    ) : (
                        <span className={css.avatarData}>
                            <RxAvatar />
                        </span>
                    )}
                    <svg
                        className={`${css.chevron} ${
                            isPopoverOpen ? css.open : ''
                        }`}
                    >
                        <use xlinkHref={`${icons}#arrow-down`} />
                    </svg>
                </button>
                {isPopoverOpen && (
                    <div className={css.userBarOpenPanel}>
                        <ul className={css.wrapperModal}>
                            <li>
                                <a
                                    onClick={() =>
                                        handleOpenModal(<UserSettingsModal />)
                                    }
                                    className={css.userBarModal}
                                    href="#settings"
                                >
                                    <svg width="16" height="16">
                                        <use xlinkHref={`${icons}#settings`} />
                                    </svg>
                                    {t('UserBar.settings')}
                                </a>
                            </li>
                            <li>
                                <a
                                    className={css.userBarModal}
                                    onClick={() =>
                                        handleOpenModal(<LogOutModal />)
                                    }
                                >
                                    <svg width="16" height="16">
                                        <use xlinkHref={`${icons}#log-out`} />
                                    </svg>
                                    {t('UserBar.logOut')}
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserBar;
