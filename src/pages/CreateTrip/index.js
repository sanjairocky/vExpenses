import React from "react";
import { useFormik } from "formik";
import { createTrip } from "api/trips";
import { getUsers } from "api/users";
import createTripSchema from "schemas/createTripSchema";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const [addTrip, { isPending }] = createTrip({
    lazy: true,
    onCompleted: () => navigate("/"),
  });
  const { data: users } = getUsers();
  const formik = useFormik({
    validationSchema: createTripSchema,
    initialValues: {},
    onSubmit: (values) => addTrip({ data: values }),
    validateOnMount: true,
  });

  if (isPending) return "Creating Trip...,";
  return (
    <div className="d-flex flex-grow-1 justify-content-center align-items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="d-flex flex-column justify-content-around border px-5 py-2 h-50  rounded shadow"
      >
        <h5 className="align-self-center text-primary">Create Trip</h5>
        <div className="d-flex flex-column justify-content-between p-2">
          <input
            id="title"
            name="title"
            type="text"
            placeholder=" Title"
            className="p-2 mb-3"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            defaultValue={formik.values.title}
          />

          <input
            id="description"
            name="description"
            type="text"
            className="p-2 mb-3"
            placeholder="Description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            defaultValue={formik.values.description}
          />
          <select
            id="authorId"
            className="p-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            defaultValue={formik.values.authorId}
          >
            <option>Select author</option>
            {(users || []).map((u, key) => (
              <option key={key} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!formik.isValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
