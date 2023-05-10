import { useGetUserQuery } from "../../redux/features/userApiSlice";
import { Link } from "react-router-dom";

const User = () => {
    const {
        data: user,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUserQuery()

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        content = (
            <section className="user">
                <h1>User</h1>
                <div>{user.email}</div>
                <Link to="/homePage">Back to Home Page</Link>
            </section>
        )
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>;
    }

    return content
}
export default User