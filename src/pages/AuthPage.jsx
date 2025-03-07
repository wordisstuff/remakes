import { t } from 'i18next';
import { Helmet } from 'react-helmet-async';

const AuthPage = ({ children, title }) => {
    return (
        <>
            <Helmet>
                <title>{title ? t('page.signUp') : t('page.signIn')}</title>
            </Helmet>
            {children}
        </>
    );
};

export default AuthPage;
