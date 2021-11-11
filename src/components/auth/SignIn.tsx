import { getAuth, signInAnonymously } from 'firebase/auth';

const SignIn = () => {
  const handleAuthentication = () => {
    signInAnonymously(getAuth())
      .then(() => {})
      .catch((error) => {
        throw new Error(error.message);
      });
  };

  return (
    <main>
      <button className="btn btn-primary" onClick={handleAuthentication}>
        Sign In
      </button>
    </main>
  );
};

export default SignIn;
