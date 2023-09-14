import axios from 'axios';

const SignOut = () => {
  const url = "http://localhost:5000/logout";
  const data = {
    cookie: document.cookie
  };
  axios.post(url, data, {withCredentials: true})
    .then((res) => {
      console.log("1")
      window.location.replace("/");
    })
    .catch((err) => {
    });

    return (
      <></>
    );
};

export default SignOut;
