// import { useCallback } from 'react';
import LoginForm from "./LoginForm";

import useFetch from '../../../hooks/useFetch';

// const buttonStyles = {
//     display: 'block',
//     width: '23%',
//     padding: '15px 10px',
//     margin: '25px auto',
//     borderColor: 'black',
//     borderStyle: 'solid',
//     borderWidth: '2px',
//     backgroundColor: 'transparent',
//     color: 'black',
//     borderRadius: '5px',
//     cursor: 'pointer'
// }

function Login() {
    const action = useFetch('post', '/auth/login', true)

    // const cancelLoginHandler = useCallback(function (e) {
    //     abort();
    // }, [abort]);

    return (
        <section>
            <LoginForm action={action} />
            {/* <button style={buttonStyles} onClick={cancelLoginHandler}>Cancel Request</button> */}
        </section>
    );
}

export default Login;