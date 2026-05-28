import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Yup validation schema
// const validationSchema = Yup.object({
//   name: Yup.string().required("Name is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string().required("Password is required"),
//   phone: Yup.string().required("Phone is required"),
//   address: Yup.string().required("Address is required"),
// });
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("Address is required"),
});

const AddEdit = () => {
  const { id }: any = useParams();
  const history = useHistory();

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/get/${id}`);
        setInitialValues(res.data[0]);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    if (id) fetchUser();
  }, [id]);

  const onSubmit = async (values: any) => {
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/update/${id}`, values);
        toast.success("User updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/post", values);
        toast.success("User added successfully");
      }
      setTimeout(() => history.push("/"), 500);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div style={{ margin: "0px 120px 120px 120px" }}>
      <h3 className="mb-3">{id ? "Update User" : "Add User"}</h3>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <Form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <Field type="text" name="name" className="form-control" />
            <ErrorMessage
              name="name"
              component="span"
              className="text-danger"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <Field type="text" name="email" className="form-control" />
            <ErrorMessage
              name="email"
              component="span"
              className="text-danger"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <Field type="password" name="password" className="form-control" />
            <ErrorMessage
              name="password"
              component="span"
              className="text-danger"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <Field type="text" name="phone" className="form-control" />
            <ErrorMessage
              name="phone"
              component="span"
              className="text-danger"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <Field type="text" name="address" className="form-control" />
            <ErrorMessage
              name="address"
              component="span"
              className="text-danger"
            />
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              {id ? "Update" : "Save"}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddEdit;
