import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { createUser } from "api/users";

export default () => {
  const navigate = useNavigate();
  const [addUser, { isPending }] = createUser({
    lazy: true,
    onCompleted: () => navigate("/users"),
  });
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => addUser({ data: values }),
  });

  useEffect(() => {
    formik.setFieldValue(
      "name",
      [formik.values.firstName, formik.values.lastName].join(" ").trim()
    );
  }, [formik.values.firstName, formik.values.lastName]);

  if (isPending) return "Creating Trip...,";
  return (
    <div className="d-flex flex-grow-1 justify-content-center align-items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="d-flex flex-column justify-content-around border px-5 py-2 h-75  rounded shadow"
      >
        <h5 className="align-self-center text-primary">Create User</h5>
        <div className="d-flex flex-column justify-content-between p-2">
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            className="p-2 mb-3"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            defaultValue={formik.values.firstName}
          />

          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="p-2 mb-3"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            defaultValue={formik.values.lastName}
          />

          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="p-2 mb-3"
            defaultValue={formik.values.name}
            disabled
          />

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="p-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            defaultValue={formik.values.email}
          />
        </div>
        <button
          type="submit"
          className="m-2 btn btn-primary"
          disabled={!formik.isValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
