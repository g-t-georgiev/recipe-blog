// import { useCallback } from 'react';
import RegisterForm from './RegisterForm';

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

function Register() {
    const action = useFetch('post', '/auth/register');

    // const cancelLoginHandler = useCallback(function (e) {
    //     abort();
    // }, [abort]);

    return (
        <section>
            <RegisterForm action={action} />
            {/* <button style={buttonStyles} onClick={cancelLoginHandler}>Cancel Request</button> */}
        </section>
    );
}

export default Register;