// UserSignInForm


const UserSignInForm = () => {
    return (
        <>
           <div> 
            <h1>TO DO LIST</h1>
            <h3>Sign In</h3>
                <form>
                    <input placeholder="username or email" type="email" />
                    <input placeholder="password" type="password" />
                    <button type="submit">Sign In</button>
                    <p>Don't have an account ?</p>
                    <a href="/signup"> Create New User</a>
                    
                </form>
            </div>
        </>
    );
}

export default UserSignInForm;