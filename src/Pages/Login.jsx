async function HandleSubmit(e) {
  e.preventDefault();
  try {
    dispatch(signInStart());
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    // Check if the sign-in was successful
    if (!data.success) { // Check if success is false
      dispatch(signInFailure(data.message)); // Dispatch error message
      return;
    }

    dispatch(signInSuccess(data)); // Dispatch success with user data
    navigate('/'); // Redirect on successful login
  } catch (error) {
    dispatch(signInFailure(error.message)); // Dispatch failure on network error
  }
}
