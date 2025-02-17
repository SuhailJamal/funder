const userProfile = ({params})=>{
    const {username} = params;
    return (
        <>
        Hello  {username}
        </>
    )
}

export default userProfile;