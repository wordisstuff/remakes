import * as Yup from 'yup';

export const validateUsersettings = t => {
    return Yup.object().shape({
        gender: Yup.string(),
        name: Yup.string()
            .trim()
            .min(2, t('modals.UserSettingsForm.validation.nameMin'))
            .max(12, t('modals.UserSettingsForm.validation.nameMax')),
        email: Yup.string().email(
            t('modals.UserSettingsForm.validation.emailInvalid'),
        ),
        photo: Yup.mixed(),
    });
};
