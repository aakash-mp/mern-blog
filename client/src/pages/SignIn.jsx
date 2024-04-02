import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function SignIn() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const {loading, error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(event) {
    const{id, value} = event.target;

    setFormData(prevValue =>{
      return{
        ...prevValue,
        [id]: value.trim()
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if(!formData.email || !formData.password){
      return dispatch(signInFailure('please fill out all the fields'));
    }

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(signInFailure(data.message));
      }
      
      if(res.ok) {
        dispatch(signInSuccess(data));
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }


/*async function handleSubmit(event) {
  event.preventDefault();

  if (!formData.username || !formData.email || !formData.password) {
    return setErrorMessage('Please fill out all the fields');
  }

  try {
    setLoading(true);
    setErrorMessage(null);

    const response = await axios.post('/api/auth/signup', formData, {
      headers: { 'Content-Type': 'application/json' }
    });

    const data = response.data;

    if (data.success === false) {
      return setErrorMessage(data.message);
    }

    setLoading(false);

    if (response.status === 200) {
      navigate('/sign-in');
    }

  } catch (error) {
    setErrorMessage(error.message);
    setLoading(false);
  }
}*/


  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
        <Link to="/" className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Aakash's</span>
            Blog
        </Link>
        <p className='text-sm mt-5'>you can sign-in with your email and password or with Google</p>
        </div>
        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your Email'/>
              <TextInput
              type='email'
              placeholder='Email'
              id='email' onChange={handleChange}/>
            </div>
            <div>
              <Label value='Your Password'/>
              <TextInput
              type='password'
              placeholder='Password'
              id='password' onChange={handleChange}/>
            </div>
            <Button gradientDuoTone="purpleToPink" type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Sign In'
              }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>
              Not have an account?
            </span>
            <Link to='/sign-up' className='text-blue-500'>Sign-Up</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
