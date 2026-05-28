import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const View = () => {
  const [formData, setFormData] = useState<any>({});
  const { id }: any = useParams();
  const viewData = async (id: any) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/get/${id}`); // Replace with your actual API URL
      setFormData(response.data[0]); // Store the data
      console.log("Fetched data:", response.data); // Optional: log the result
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };
  useEffect(() => {
    viewData(id);
  }, []);
  return (
    <div>
      <h2>User Details</h2>
      <p>
        <strong>Name:</strong> {formData.name}
      </p>
      <p>
        <strong>Email:</strong> {formData.email}
      </p>
      <p>
        <strong>Phone:</strong> {formData.phone}
      </p>
      <p>
        <strong>Address:</strong> {formData.address}
      </p>
    </div>
  );
};

export default View;
