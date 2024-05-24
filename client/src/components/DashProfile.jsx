import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure } from '../redux/user/userSlice'
import { errorHandler } from '../../../api/utils/error.js';

export default function DashProfile() {

    const {currentUser} = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [formData, setFormData] = useState({});
    const filePickerRef = useRef();
    const dispatch = useDispatch();
    const handleImageChange = (event) =>{
        const file = event.target.files[0];
        if(file){
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };
    useEffect(()=>{
        if(imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => {
        //service firebase.storage
        // service firebase.storage {
        //     match /b/{bucket}/o {
        //       match /{allPaths=**} {
        //         allow read;
        //         allow write: if
        //         request.resource.size < 2 * 1024 * 1024 &&
        //         request.resource.contentType.matches('image/.*')
        //       }
        //     }
        //   }
        setImageFileUploading(true);
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = 
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) =>{
                setImageFileUploadError('could not upload image (your file must me less than 2MB)');
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
                setImageFileUploading(false);
            },
            () =>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=> {
                    setImageFileUrl(downloadURL);
                    setFormData({...formData, profilePicture: downloadURL});
                    setImageFileUploading(false);
                });
            }
        );
    };

    const handleChange = (event) =>{
        setFormData({...formData, [event.target.id]: event.target.value});
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        if(Object.keys(formData).length === 0) {
            setUpdateUserError('No changes made');
            return;
        }
        if(imageFileUploading){
            setUpdateUserError('Please wait for image to upload!!!');
            return;
        }
        try {
            dispatch(updateStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if(!res.ok) {
                throw errorHandler(res.status, data.message); // Throw error using global error handler
            }else{
                dispatch(updateSuccess(data));
                setUpdateUserSuccess("Profile updated successfully");
            }
        } catch (error) {
            dispatch(updateFailure(error.message));
            setUpdateUserError(error.message); // Set the error message to display
        }
    }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
            <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={()=>filePickerRef.current.click()}>
                 {imageFileUploadProgress && (
                    <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`} 
                        strokeWidth={5}
                        styles={{
                            root:{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,

                            },
                            path: {
                                stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                            },
                        }}
                    /> 
                 )}
                 <img src={imageFileUrl || currentUser.profilePicture} alt="user" className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                    imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'
                 }`}/>
            </div>
            {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}
            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange}/>
            <TextInput type='email' id='email' placeholder='email'defaultValue={currentUser.email} onChange={handleChange}/>
            <TextInput type='password' id='password' placeholder='Password' autoComplete="off" onChange={handleChange}/>
            <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                Update
            </Button>
        </form>
        <div className='text-red-500 flex justify-between mt-5'>
            <span>Delete Account</span>
            <span>Sign Out</span>
        </div>
        {updateUserSuccess && (
            <Alert color='success' className='mt-5'>
                {updateUserSuccess}
            </Alert>
        )}
        {updateUserError && (
            <Alert color='failure' className='mt-5'>
                {updateUserError}
            </Alert>
        )}
    </div>
  )
}
