import CSS from './AddSong.module.css';
import { icons } from '../../icons/index.js';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from './Input.jsx';
import songSchema from './Schema.js';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addSong } from '../../redux/song/operation.js';

const AddSong = () => {
    const { t } = useTranslation();

    const [songPic, setSongPic] = useState('');
    const [songMp3, setSongMp3] = useState('');
    const [songProject, setSongProject] = useState('');
    const [songName, setSongName] = useState('songName');
    const [author, setAuthor] = useState('author');
    const [price, setPrice] = useState('price');
    const [bpm, setBpm] = useState('bpa');
    const songData = null;

    const hiddenInputPic = useRef(null);
    const hiddenInputProject = useRef(null);
    const hiddenInputMp3 = useRef(null);
    const dispath = useDispatch();

    const handleClickPic = e => {
        e.preventDefault();
        if (hiddenInputPic.current instanceof HTMLInputElement) {
            hiddenInputPic.current.click();
        }
    };
    const handleClickMp3 = e => {
        e.preventDefault();
        if (hiddenInputMp3.current instanceof HTMLInputElement) {
            hiddenInputMp3.current.click();
        }
    };
    const handleClickProject = e => {
        e.preventDefault();
        if (hiddenInputProject.current instanceof HTMLInputElement) {
            hiddenInputProject.current.click();
        }
    };
    const handleChangPic = e => {
        if (e.target.files) {
            const fileUploaded = e.target.files[0];
            setSongPic(fileUploaded);
        }
    };
    const handleChangeMp3 = e => {
        if (e.target.files) {
            const fileUploaded = e.target.files[0];
            setSongMp3(fileUploaded);
        }
    };
    const handleChangProject = e => {
        if (e.target.files) {
            const fileUploaded = e.target.files[0];
            setSongProject(fileUploaded);
        }
    };
    // const handleChange = e => {
    //     if (e.target.files) {
    //         const fileUploaded = e.target.files[0];
    //         const fileExtension = fileUploaded.name
    //             .split('.')
    //             .pop()
    //             .toLowerCase();

    //         if (fileExtension === 'mp3') {
    //             setSongMp3(fileUploaded);
    //         } else if (fileExtension === 'rar') {
    //             setSongProject(fileUploaded);
    //         } else if (['jpg', 'jpeg', 'png', 'webp'].includes(fileExtension)) {
    //             setSongPic(fileUploaded);
    //         } else {
    //             console.warn('Непідтримуваний формат файлу:', fileExtension);
    //         }
    //     }
    // };

    const handleSubmit = async e => {
        e.preventDefault();

        const validationData = {
            songName,
            author,
            songPic,
            price,
            bpm,
            songMp3,
            songProject,
        };
        try {
            const validatedData = await songSchema.validate(validationData, {
                abortEarly: false,
            });
            const formData = new FormData();
            formData.append('songName', validatedData.songName);
            formData.append('author', validatedData.author);
            formData.append('songPic', validatedData.songPic);
            formData.append('price', validatedData.price);
            formData.append('bpm', validatedData.bpm);
            formData.append('songMp3', validatedData.songMp3);
            formData.append('songProject', validatedData.songProject);

            console.log(formData);

            try {
                dispath(addSong(formData));
                toast.success(t('modals.UserSettingsForm.success'), {
                    position: 'top-right',
                });
            } catch (err) {
                toast.error(err.message, {
                    position: 'top-right',
                });
            }
        } catch (err) {
            err.inner.reverse().forEach(error => {
                toast.error(error.message, {
                    position: 'top-right',
                });
            });
        }
    };

    return (
        <div>
            <h2>Add Song</h2>
            <form className={CSS.form} onSubmit={handleSubmit}>
                <div className={CSS.formBox}>
                    <div className={CSS.picWrapper}>
                        <div className={CSS.pic}>
                            <img
                                src={
                                    songPic instanceof File
                                        ? URL.createObjectURL(songPic)
                                        : songData?.picture
                                }
                                className={CSS.avatar}
                                alt="picture"
                            />
                        </div>
                        <div
                            className={CSS.uploadWrapper}
                            onClick={handleClickPic}
                        >
                            <svg className={CSS.iconUpload}>
                                <use xlinkHref={`${icons}#upload`} />
                            </svg>
                            <p className={CSS.textRegular}>
                                {t('modals.UserSettingsForm.uploadPhotoBtn')}
                            </p>
                        </div>
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            accept=".jpg,.jpeg,.png,.webp"
                            onChange={handleChangPic}
                            ref={hiddenInputPic}
                        />
                    </div>
                </div>

                <div className={CSS.inputs}>
                    <div className={CSS.wrapperInputsForm}>
                        <Input
                            className={CSS.songInfoInput}
                            name={songName}
                            setFunc={setSongName}
                        />
                        <Input
                            className={CSS.songInfoInput}
                            name={author}
                            setFunc={setAuthor}
                        />
                        <Input
                            className={CSS.songInfoInput}
                            name={price}
                            setFunc={setPrice}
                        />
                        <Input
                            className={CSS.songInfoInput}
                            name={bpm}
                            setFunc={setBpm}
                        />
                    </div>
                    <div>
                        <div
                            className={CSS.uploadWrapper}
                            onClick={handleClickMp3}
                        >
                            <svg className={CSS.iconUpload}>
                                <use xlinkHref={`${icons}#upload`} />
                            </svg>
                            <p className={CSS.textRegular}>
                                {t('modals.UserSettingsForm.uploadMp3')}
                            </p>
                        </div>
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            accept=".mp3"
                            onChange={handleChangeMp3}
                            ref={hiddenInputMp3}
                        />
                    </div>
                    <div>
                        <div
                            className={CSS.uploadWrapper}
                            onClick={handleClickProject}
                        >
                            <svg className={CSS.iconUpload}>
                                <use xlinkHref={`${icons}#upload`} />
                            </svg>
                            <p className={CSS.textRegular}>
                                {t('modals.UserSettingsForm.uploadProject')}
                            </p>
                        </div>
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            accept=".rar,.zip"
                            onChange={handleChangProject}
                            ref={hiddenInputProject}
                        />
                    </div>
                    <div className={CSS.buttonContainer}>
                        <button className={CSS.saveButton} type="submit">
                            {t('modals.UserSettingsForm.saveBtn')}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddSong;
