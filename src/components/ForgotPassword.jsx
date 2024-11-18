import { useState } from "react";
import { Auth } from "../services/Auth";

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [code, setCode] = useState('');
    const [step, setStep] = useState('request'); // 'request' or 'confirm'
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
  
    const handleRequestCode = async (e) => {
      e.preventDefault();
      try {
        await Auth.forgotPassword(email);
        setStep('confirm');
        setSuccess('Verification code sent to your email.');
        setError('');
      } catch (err) {
        setError(err.message);
      }
    };
  
    const handleConfirmCode = async (e) => {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      try {
        await Auth.forgotPasswordSubmit(email, code, newPassword);
        setSuccess('Password reset successful!');
        setError('');
        setStep('request');
      } catch (err) {
        setError(err.message);
      }
    };
  
    return (
      <section>
        {step === 'request' ? (
          <form onSubmit={handleRequestCode}>
            <h2>Forgot Password</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send Code</button>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
          </form>
        ) : (
          <form onSubmit={handleConfirmCode}>
            <h2>Confirm Password Reset</h2>
            <input
              type="text"
              placeholder="Verification Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Reset Password</button>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
          </form>
        )}
      </section>
    );
  };
