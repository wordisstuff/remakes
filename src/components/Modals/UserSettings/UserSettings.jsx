import css from './UserSettings.module.css';
import toast from 'react-hot-toast';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { icons } from '../../../icons/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../redux/auth/selectors';
import { closeModal } from '../../../redux/modal/slice.js';
import { updateUser } from '../../../redux/auth/operation.js';

export const UserSettingsModal = () => {
    const { t } = useTranslation();
    const user = useSelector(selectUser);
    const [userData] = useState(user);
    const [name, setName] = useState(userData.name);
    const [gender, setGender] = useState(userData.gender);
    const [email, setEmail] = useState(userData.email);
    const [userAvatar, setUserAvatar] = useState(userData.photo);

    const dispatch = useDispatch();
    console.log(user);
    console.log(userAvatar);
   

    const hiddenInputUpload = useRef(null);

    const handleClick = e => {
        e.preventDefault();
        if (hiddenInputUpload.current) {
            hiddenInputUpload.current.click();
        }
    };

    const handleChange = e => {
        if (e.target.files) {
            const fileUploaded = e.target.files[0];
            setUserAvatar(fileUploaded);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const dataForValidation = {
            gender,
            name,
            photo: userAvatar,
            email,
        };
        console.log(dataForValidation);
        try {
            const validatedData = await validateUsersettings(t).validate(dataForValidation, {
                abortEarly: false,
            });

            const formData = new FormData();
            formData.append('name', validatedData.name);
            formData.append('photo', userAvatar);
            formData.append('email', validatedData.email);
            formData.append('gender', validatedData.gender);
            console.log(formData);

            try {
                console.log('FORM', validatedData);
                dispatch(updateUser(formData));
                toast.success(t('modals.UserSettingsForm.success'), {
                    position: 'top-right',
                });

                dispatch(closeModal());
            } catch (error) {
                toast.error(error.message, {
                    position: 'top-right',
                });
            }
        } catch (validationErrors) {
            validationErrors.inner.reverse().forEach(error => {
                toast.error(error.message, {
                    position: 'top-right',
                });
            });
        }
    };

    useMemo(() => {
        if (userData) {
            setGender(userData.gender);
            setName(userData.name);
            setEmail(userData.email);
        }
    }, [userData]);
    console.log('REturn');
    return (
        <>
            <div className={css.wrapper}>
                <form className={css.form} onSubmit={handleSubmit}>
                    <div className={css.userPic}>
                        <h2>{t('modals.UserSettingsForm.setting')}</h2>
                        <div className={css.picWrapper}>
                            <div className={css.pic}>
                                <img
                                    src={
                                        userAvatar instanceof File
                                            ? URL.createObjectURL(userAvatar)
                                            : userData?.photo
                                    }
                                    className={css.avatar}
                                    alt="avatar"
                                />
                            </div>
                            <div
                                className={css.uploadWrapper}
                                onClick={handleClick}
                            >
                                <svg className={css.iconUpload}>
                                    <use xlinkHref={`${icons}#upload`} />
                                </svg>
                                <p className={css.textRegular}>
                                    {t(
                                        'modals.UserSettingsForm.uploadPhotoBtn',
                                    )}
                                </p>
                            </div>
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                accept=".jpg,.jpeg,.png,.webp"
                                onChange={handleChange}
                                ref={hiddenInputUpload}
                            />
                        </div>
                    </div>

                    <div className={css.inputs}>
                        <div className={css.wrapperInputsForm}>
                            <div className={css.midContainer}>
                                <h3>
                                    {t(
                                        'modals.UserSettingsForm.yourGenderLabel',
                                    )}
                                </h3>
                                <div className={css.radioContainer}>
                                    <div className={css.radioButton}>
                                        <input
                                            className={css.radio}
                                            type="radio"
                                            name="gender"
                                            id="female"
                                            value="female"
                                            onChange={e =>
                                                setGender(e.target.value)
                                            }
                                            checked={
                                                gender === 'female' ||
                                                userData?.gender === 'female'
                                            }
                                        />
                                        <label
                                            className={css.radioLabel}
                                            htmlFor="female"
                                        >
                                            {t(
                                                'modals.UserSettingsForm.femaleGenderLabel',
                                            )}
                                        </label>
                                    </div>
                                    <div className={css.radioButton}>
                                        <input
                                            className={css.radio}
                                            type="radio"
                                            name="gender"
                                            id="male"
                                            value="male"
                                            onChange={e =>
                                                setGender(e.target.value)
                                            }
                                            checked={
                                                gender === 'male' ||
                                                userData?.gender === 'male'
                                            }
                                        />
                                        <label
                                            className={css.radioLabel}
                                            htmlFor="male"
                                        >
                                            {t(
                                                'modals.UserSettingsForm.femaleGenderMale',
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className={css.midContainer}>
                                <div className={css.userInfoInputContainer}>
                                    {t('modals.UserSettingsForm.yourNameLabel')}
                                    <input
                                        className={css.userInfoInput}
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={
                                            name === ' ' ? userData.name : name
                                        }
                                        onChange={e => {
                                            setName(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className={css.userInfoInputContainer}>
                                    <h3>
                                        {t(
                                            'modals.UserSettingsForm.labelEmail',
                                        )}
                                    </h3>
                                    <input
                                        className={css.userInfoInput}
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={
                                            email === ' '
                                                ? userData.email
                                                : email
                                        }
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={css.buttonContainer}>
                        <button className={css.saveButton} type="submit">
                            {t('modals.UserSettingsForm.saveBtn')}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UserSettingsModal;
