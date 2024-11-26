import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleGoogleLogin() {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/auth/google`;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setEmailError('');
    setPasswordError('');

    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.status !== 200) {
        setLoading(false);
        if (data.message === 'Failed to fetch') {
          toast.error('Unable to connect to the server. Please try again later.');
        }
        toast.error('Invalid email or password. Please try again.');
        return;
      }

      if (data.errors) {
        setLoading(false);
        setEmailError(data.errors.email || '');
        setPasswordError(data.errors.password || '');
        return;
      }

      if (data.token) {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userId', data.userId);
        sessionStorage.setItem('role', data.role);
        setLoading(false);
        navigate(data.role === 'admin' ? '/admin' : '/');
      }
    } catch (error) {
      setLoading(false);
      toast.error('An error occurred. Please try again later.');
      console.error('Error:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="sign-in-form">
      <h2 className="title">Sign In</h2>
      <div className="input-field">
        <FaUser className="icon" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {emailError && <div className='error-msg'>{emailError}</div>}
      <div className="input-field">
        <FaLock className="icon" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {passwordError && <div className='error-msg'>{passwordError}</div>}
      <input type="submit" value={loading ? 'Loading' : 'Login'} className="btn solid" />
      <p className="social-text">Or Sign in with social platforms</p>
      <div className="social-media">
        <div className='social-icon' onClick={handleGoogleLogin}>
          <FcGoogle className='googleIcon' /> Sign in with Google
        </div>
      </div>
    </form>
  );
}
