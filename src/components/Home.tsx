import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoaderBackdrop from "./LoaderBackdrop"; 

const Home = () => {
  const [userListData, setUserListData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserList = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/get");
      setUserListData(response.data);
      console.log("Fetched data:", response.data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching user list:", error);
      toast.error("Failed to load user list");
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  const onDeleteUser = async (id: any) => {
    await axios.delete(`http://localhost:5000/api/remove/${id}`);
    toast.success("Deleted successfully");
    getUserList(); // reload after deletion
  };

  return (
    <>
      <LoaderBackdrop open={loading}/>

      <Link to={"/add"} type="button" className="btn btn-success mb-3">
        Add User
      </Link>

      {userListData.length === 0 && !loading ? (
        <p>No users found.</p>
      ) : (
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PASSWORD</th>
              <th>PHONE</th>
              <th>ADDRESS</th>
              <th>EDIT</th>
              <th>DELETE</th>
              <th>VIEW</th>
            </tr>
          </thead>
          <tbody>
            {userListData.map((data: any, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.password}</td>
                <td>{data.phone}</td>
                <td>{data.address}</td>
                <td>
                  <Link to={`/update/${data.id}`} className="btn btn-primary">
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDeleteUser(data.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Link to={`/view/${data.id}`} className="btn btn-success">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Home;
