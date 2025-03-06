import { useEffect, useId, useState } from 'react';
import UsersWrap from '../UsersWrap/UsersWrap';
import CSS from './SignForm.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { icons } from '../../icons/index';
import useCustomForm from '../../Hooks/useCustomForm';
import { formValuesSignIn, signInSchema } from './Shema';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operation';

const SignForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log('SigninForm');
    const { t } = useTranslation();
    const [openPassword, setOpenPassword] = useState(false);

    const emailId = useId();
    const passwordId = useId();

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
        reset,
    } = useCustomForm(formValuesSignIn, signInSchema);

    const togglePasswordVisibility = () => setOpenPassword(prev => !prev);

    const onSubmit = async data => {
        try {
            console.log(data);
            await dispatch(login(data)).unwrap();
            reset();

            // const today = new Date().toISOString().split('T')[0];
            // dispatch(setDate(today));

            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (errors.password) {
            toast.error(t('signInPage.passwordSpanError'));
        } else if (errors.email) {
            toast.error(t('signInPage.emailSpanError'));
        }
    }, [errors.password, errors.email, t]);

    return (
        <>
            <UsersWrap className={CSS.welcomPadding}>
                <div className={`${CSS.formBlock} ${CSS.formPosition}`}>
                    <h2 className={CSS.formTitle}>{t('signInPage.signIn')}</h2>

                    <form
                        className={CSS.mainForm}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className={CSS.fieldThumb}>
                            <label className={CSS.formLabel} htmlFor={emailId}>
                                {t('signInPage.email')}
                            </label>
                            <input
                                className={`${CSS.formInput}
                                ${errors.email && CSS.errorName}
                                `}
                                type="text"
                                name="email"
                                id={emailId}
                                placeholder={t('signInPage.emailPlaceholder')}
                                {...register('email')}
                            />
                            {errors.email && (
                                <span className={CSS.errorSpan}>
                                    {t('signInPage.emailSpanError')}
                                </span>
                            )}
                        </div>

                        <div className={CSS.fieldThumb}>
                            <label
                                className={CSS.formLabel}
                                htmlFor={passwordId}
                            >
                                {t('signInPage.password')}
                            </label>
                            <div className={CSS.passwordWrapper}>
                                <input
                                    className={`${CSS.formInput} ${
                                        errors.password && CSS.errorName
                                    }`}
                                    type={openPassword ? 'text' : 'password'}
                                    name="password"
                                    id={passwordId}
                                    placeholder={t(
                                        'signInPage.passwordPlaceholder',
                                    )}
                                    {...register('password')}
                                />
                                {openPassword ? (
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className={CSS.eyeBtn}
                                    >
                                        <svg className={`${CSS.iconEye}`}>
                                            <use xlinkHref={`${icons}#eye`} />
                                        </svg>
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className={CSS.eyeBtn}
                                    >
                                        <svg className={`${CSS.iconEye}`}>
                                            <use
                                                xlinkHref={`${icons}#eye-off`}
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {errors.password && (
                                <span className={CSS.errorSpan}>
                                    {t('signInPage.passwordSpanError')}
                                </span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className={CSS.btnform}
                            disabled={!isDirty || !isValid}
                        >
                            {t('signInPage.signIn')}
                        </button>
                        {/* <GoogleButton /> */}
                    </form>

                    <div className={CSS.haveAccountSignIn}>
                        <div className={CSS.question}>
                            <p className={CSS.haveAccountText}>
                                {t('signInPage.dontAccount')}
                            </p>{' '}
                            <NavLink
                                to="/signup"
                                className={CSS.haveAccountForm}
                            >
                                {t('signInPage.signUp')}
                            </NavLink>
                            <p className={CSS.haveAccountText}>
                                {t('signInPage.forgotAccount')}
                            </p>{' '}
                            <NavLink
                                to="/forgotPassword"
                                className={CSS.haveAccountForm}
                            >
                                {t('signInPage.forgotPassword')}
                            </NavLink>
                        </div>
                    </div>
                </div>
            </UsersWrap>
        </>
    );
};

export default SignForm;
