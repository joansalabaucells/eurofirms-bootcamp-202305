import context from '../../context'
import registerUser from '../../logic/registerUser'

function Register(props) {
    console.log('Register -> render')

    const handleLoginClick = event => {
        event.preventDefault()

        props.onLoginClick()
    }
    const handleRegisterSubmit = event => {
        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value

        try { //Se envian los  mismos campos pero e speramos una promesa
            registerUser(name, email, password)
                .then(() => props.onRegistered())
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <main className="register-view">
            <h1>Register</h1>

            <form className="register-form" onSubmit={handleRegisterSubmit}>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" alt="name"></input>

                <label htmlFor="email">E-mail</label>
                <input id="email" type="email" alt="email"></input>

                <label htmlFor="password">Password</label>
                <input id="password" type="password" alt="password"></input>

                <label htmlFor="image">Image or avatar</label>
                <input id="image" type="image" alt="image"></input>

                <button type="submit">Register</button>
            </form>

            <p>Go to <a className="register-login-link" href="" onClick={handleLoginClick}>Login</a></p>
            <footer className="initial-page-footer" >
                <p><img src="public/logo03.png" alt="MeetupBikers" width="60%" /></p>

            </footer>
        </main>
    )
}
export default Register