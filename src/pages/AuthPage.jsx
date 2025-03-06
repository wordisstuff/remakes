import { t } from 'i18next';
import { Helmet } from 'react-helmet-async';
import SignForm from '../components/SignForm/SignForm';

const AuthPage = () => {
    return (
        <>
            <Helmet>
                <title>{t('page.signIn')}</title>
            </Helmet>
            <SignForm />
        </>
    );
};

export default AuthPage;
