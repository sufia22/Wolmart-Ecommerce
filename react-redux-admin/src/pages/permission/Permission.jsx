import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import DataTable from "datatables.net-dt";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  createPermission,
  deletePermission,
  updatePermission,
  updatePermissionStatusData,
} from "../../features/user/userApiSlice";
import {
  getAllPermissionData,
  setMessageEmpty,
} from "../../features/user/userSlice";
import { createToast } from "../../utils/toast";
import swal from "sweetalert";
import { timeAgo } from "../../helpers/helpers";

const Permission = () => {
  const dispatch = useDispatch();
  const { permission, error, message } = useSelector(getAllPermissionData);

  const [input, setInput] = useState({
    name: "",
  });

  const [edit, setEdit] = useState({});

  // handle input change
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(createPermission(input));
    setInput({ name: "" });
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
        dispatch(deletePermission(id));
      }
    });
  };

  // handle edit change
  const handleEditPermissionChange = (e) => {
    setEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle permission edit
  const handleEdit = (id) => {
    const editData = permission.find((data) => data._id === id);
    setEdit(editData);
  };

  // handle permission update
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updatePermission({
        id: edit._id,
        name: edit.name,
      })
    );
  };

  // handle status update
  const handleStatusUpdate = (status, id) => {
    dispatch(updatePermissionStatusData({ status, id }));
  };

  useEffect(() => {
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }

    if (error && permission) {
      createToast(error);
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message, permission]);

  useEffect(() => {
    new DataTable(".table");
  });
  return (
    <>
      <div className="page-header">
        <div className=" header-part">
          <PageHeader title="Permissions" />
          {/* Add Permission modal */}
          <button
            className="add-button btn btn-primary my-3 py-2"
            data-toggle="modal"
            data-target="#PermissionModalPopup"
          >
            Add new Permission
          </button>
        </div>

        <ModalPopup target={"PermissionModalPopup"} title={"Add Permission"}>
          <form onSubmit={handleFormSubmit}>
            <div className="my-3">
              <label htmlFor="">Permission Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={input.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="my-3">
              <button type="submit" className="btn btn-primary btn-block">
                Add new Permission
              </button>
            </div>
          </form>
        </ModalPopup>

        <ModalPopup target={"permissionEdit"} title={"Edit Permission"}>
          <form onSubmit={handleUpdate}>
            <div className="my-3">
              <label htmlFor="">Permission Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={edit.name}
                onChange={handleEditPermissionChange}
              />
            </div>
            <div className="my-3">
              <button type="submit" className="btn btn-primary btn-block">
                Update Permission
              </button>
            </div>
          </form>
        </ModalPopup>

        <div className="row">
          <div className="col-md-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="table-responsive">
                  {permission && (
                    <table className="table table-hover table-center mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Created at Time</th>
                          <th>Status</th>
                          <th className="text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...permission].reverse().map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
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
                                  data-target="#permissionEdit"
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

export default Permission;
