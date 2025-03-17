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

    const [songPic, setSongPic] = useState('123');
    const [songName, setSongName] = useState('songName');
    const [author, setAuthor] = useState('author');
    const [price, setPrice] = useState('price');
    const [bpm, setBpm] = useState('bpa');
    const songData = null;

    const hiddenInputUpload = useRef(null);
    const dispath = useDispatch();

    const handleClick = e => {
        e.preventDefault();
        if (hiddenInputUpload.current) {
            hiddenInputUpload.current.click();
        }
    };
    const handleChange = e => {
        if (e.target.files) {
            const fileUploaded = e.target.files[0];
            setSongPic(fileUploaded);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const validationData = {
            songName,
            author,
            songPic,
            price,
            bpm,
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
                            onClick={handleClick}
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
                            onChange={handleChange}
                            ref={hiddenInputUpload}
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
