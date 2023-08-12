import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import DataTable from "datatables.net-dt";
import PageHeader from "../../components/PageHeader/PageHeader";
import { generateRandomPassword, timeAgo } from "../../helpers/helpers";
import useFormField from "../../hooks/useFormField";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  updateUser,
  updateUserStatusData,
  userCreate,
} from "../../features/user/userApiSlice";
import { createToast } from "../../utils/toast";
import { setMessageEmpty } from "../../features/user/userSlice";
import swal from "sweetalert";

const User = () => {
  const dispatch = useDispatch();
  const { user, role, error, message } = useSelector((state) => state.user);
  const [edit, setEdit] = useState({});

  const { input, handleInputChange, resetForm, setInput } = useFormField({
    name: "",
    email: "",
    password: "",
  });

  // handle random password
  const handleRandomPassword = (e) => {
    e.preventDefault();

    const rp_pass = generateRandomPassword(20);
    setInput((prevState) => ({
      ...prevState,
      password: rp_pass,
    }));
  };

  // handle user create
  const handleUserCreate = (e) => {
    e.preventDefault();
    dispatch(userCreate(input));
    resetForm();
  };

  // handle edit value change
  const handleEditValueChange = (e) => {
    setEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle permission edit
  const handleEdit = (id) => {
    const editData = user.find((data) => data._id === id);
    console.log(editData);
    setEdit(editData);
  };

  // handle permission update
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(input));
  };
  // handle data delete
  const handleDelete = (id) => {
    swal({
      title: "Are you sure to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteUser(id));
      }
    });
  };

  // handle status update
  const handleStatusUpdate = (status, id) => {
    console.log({ status, id });
    dispatch(updateUserStatusData({ status, id }));
  };

  useEffect(() => {
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }

    if (error && user) {
      createToast(error);
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message, user]);

  useEffect(() => {
    new DataTable(".table");
  });

  return (
    <>
      <div className="page-header">
        <div className=" header-part">
          <PageHeader title="Users" />
          {/* Add user modal */}
          <button
            className="btn btn-primary my-3"
            data-toggle="modal"
            data-target="#userModalPopup"
          >
            Add new user
          </button>
        </div>

        {/* create user */}
        <ModalPopup target={"userModalPopup"} title={"Add User"}>
          <form onSubmit={handleUserCreate}>
            <div className="my-3">
              <label htmlFor="">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={input.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="my-3">
              <label htmlFor="">Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={input.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="my-3 ">
              <label>Role</label>
              <select
                name="role"
                value={input.role}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="">--select--</option>

                {role?.map((item, index) => {
                  return (
                    <option value={item._id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="my-3 ">
              <label htmlFor="">Password</label>
              <div className="random-field d-flex">
                <input
                  type="text"
                  className="form-control "
                  style={{ borderRadius: "3px 0px 0px 3px" }}
                  name="password"
                  value={input.password}
                  onChange={handleInputChange}
                />
                <a
                  href=""
                  className="badge badge-info "
                  onClick={handleRandomPassword}
                  style={{ padding: "14px", borderRadius: "0px 3px 3px 0px" }}
                >
                  Random Password
                </a>
              </div>
            </div>
            <div className="my-3">
              <button type="submit" className="btn btn-primary ">
                Create new user
              </button>
            </div>
          </form>
        </ModalPopup>

        {/* edit user */}
        <ModalPopup target={"EditModalPopup"} title={"Edit User"}>
          <form onSubmit={handleUpdate}>
            <div className="my-3">
              <label htmlFor="">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={edit.name}
                onChange={handleEditValueChange}
              />
            </div>
            <div className="my-3">
              <label htmlFor="">Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={edit.email}
                onChange={handleEditValueChange}
              />
            </div>
            <div className="my-3 ">
              <label htmlFor="">Password</label>
              <div className="random-field d-flex">
                <input
                  type="text"
                  className="form-control "
                  style={{ borderRadius: "3px 0px 0px 3px" }}
                  name="password"
                  value={edit.password}
                  onChange={handleEditValueChange}
                />
                <a
                  href=""
                  className="badge badge-info "
                  onClick={handleRandomPassword}
                  style={{ padding: "14px", borderRadius: "0px 3px 3px 0px" }}
                >
                  Random Password
                </a>
              </div>
            </div>
            <div className="my-3">
              <button type="submit" className="btn btn-primary ">
                Update
              </button>
            </div>
          </form>
        </ModalPopup>

        <div className="row">
          <div className="col-md-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="table-responsive">
                  {user && (
                    <table className="table table-hover table-center mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email </th>
                          <th>Role</th>
                          <th>Created At</th>
                          <th>Status</th>
                          <th className="text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.email}</td>
                              <td>{item?.role?.name}</td>
                              <td>{timeAgo(item.createdAt)}</td>
                              <td>
                                <div className="status-toggle">
                                  <input
                                    type="checkbox"
                                    id="status_1"
                                    className="check"
                                    checked={item.status ? true : false}
                                  />
                                  <label
                                    onClick={() =>
                                      handleStatusUpdate(item.status, item._id)
                                    }
                                    htmlFor="status_1"
                                    className="checktoggle"
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </td>
                              <td className="text-right">
                                <button
                                  className="btn btn-sm bg-success-light"
                                  data-toggle="modal"
                                  data-target="#EditModalPopup"
                                  onClick={() => handleEdit(item._id)}
                                >
                                  <i className="fe fe-pencil"></i> Edit
                                </button>{" "}
                                <button
                                  className="btn btn-sm bg-danger-light"
                                  onClick={() => handleDelete(item._id)}
                                >
                                  <i className="fe fe-trash"></i> Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
