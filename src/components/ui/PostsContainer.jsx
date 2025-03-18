import Post from "../Post/Post";
const PostsContainer = ( {posts})=>{
    return(
        <>
         <div className="flex flex-col items-center space-y-4 py-2 dark:bg-gray-800">
        {posts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>
        </>
    )
}
export default PostsContainer;