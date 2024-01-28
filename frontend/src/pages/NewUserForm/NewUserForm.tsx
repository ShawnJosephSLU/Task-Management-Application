// NewUserForm
const NewUserForm = () => {
    return (
        <>
            <div> 
            <h1>TO DO LIST</h1>
            <h3>Create New User</h3>
                <form>
                    <input placeholder="First Name" type="text" />
                    <input placeholder="Last Name" type="text" />
                    <input placeholder="Username" type="text" />
                    <input placeholder="Email" type="Email" />
                    <input placeholder="Password" type="Password" />
                    <input placeholder="Retype Password" type="Password" />
                    <button type="submit">Sign In</button>
                    <p>Already have an account ?</p>
                    <a href="/signin"> Sign In</a>
                </form>
            </div>
        </>
    );
};

export default NewUserForm;
