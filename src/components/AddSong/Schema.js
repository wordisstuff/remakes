import * as Yup from 'yup';
const songSchema = Yup.object().shape({
    songName: Yup.string(),
    author: Yup.string(),
    songPic: Yup.mixed(),
    price: Yup.number(),
    bpm: Yup.number(),
});

export default songSchema;
