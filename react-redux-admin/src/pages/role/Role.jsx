import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import DataTable from "datatables.net-dt";
import PageHeader from "../../components/PageHeader/PageHeader";
import useFormField from "../../hooks/useFormField";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPermissionData,
  setMessageEmpty,
} from "../../features/user/userSlice";
import { createToast } from "../../utils/toast";
import {
  createRole,
  deleteRole,
  updateRole,
  updateRoleStatusData,
} from "../../features/user/userApiSlice";
import { timeAgo } from "../../helpers/helpers";
import swal from "sweetalert";

const Role = () => {
  const dispatch = useDispatch();
  const { permission, role, error, message } =
    useSelector(getAllPermissionData);

  const [selected, setSelected] = useState([]);
  console.log(selected);
  const { input, resetForm, handleInputChange } = useFormField({
    name: "",
  });

  const [edit, setEdit] = useState({});

  // handle checkbox change
  const handleCheckboxChange = (e) => {
    const val = e.target.value;
    const updatedList = [...selected];
    if (selected.includes(val)) {
      updatedList.splice(selected.indexOf(val), 1);
    } else {
      updatedList.push(val);
    }
    setSelected(updatedList);
  };

  // handle role create
  const handleRoleCreate = (e) => {
    e.preventDefault();
    dispatch(
      createRole({
        name: input.name,
        permissions: [...selected],
      })
    );
    resetForm({
      name: "",
    });
    setSelected([]);
  };

  // handle role edit
  const handleEdit = (id) => {
    const editData = role.find((data) => data._id === id);
    setEdit(editData);
    setSelected(editData.permissions);
  };

  // handle edit role change
  const handleEditRoleChange = (e) => {
    setEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle role update
  const handleRoleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateRole({
        id: edit._id,
        name: edit.name,
        permissions: selected,
      })
    );
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
        dispatch(deleteRole(id));
      }
    });
  };

  // handle status update
  const handleStatusUpdate = (status, id) => {
    console.log({ status, id });
    dispatch(updateRoleStatusData({ status, id }));
  };

  useEffect(() => {
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }

    if (error && role) {
      createToast(error);
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message, role]);

  useEffect(() => {
    new DataTable(".table");
  });
  return (
    <>
      <div className="page-header">
        <div className=" header-part">
          <PageHeader title="Roles" />
          {/* Add role modal */}
          <button
            className=" btn btn-primary my-3 py-2"
            data-toggle="modal"
            data-target="#RoleModalPopup"
          >
            Add new Role
          </button>
        </div>

        {/* Add roles */}
        <ModalPopup target={"RoleModalPopup"} title={"Add Roles"}>
          <form onSubmit={handleRoleCreate}>
            <div className="my-3">
              <label htmlFor="">Role Name </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={input.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="my-3">
              <label htmlFor="">Permissions</label>

              {permission?.map((item, index) => {
                return (
                  <label className="d-block" key={index}>
                    <input
                      type="checkbox"
                      value={item.name}
                      checked={selected.includes(item.name)}
                      onChange={handleCheckboxChange}
                    />{" "}
                    {item.name}
                  </label>
                );
              })}
            </div>
            <div className="my-3">
              <button type="submit" className="btn btn-primary btn-block">
                Add new Role
              </button>
            </div>
          </form>
        </ModalPopup>

        {/* Edit roles */}
        <ModalPopup target={"roleEdit"} title={"Edit Role"}>
          <form onSubmit={handleRoleUpdate}>
            <div className="my-3">
              <label htmlFor="">Role Name </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={edit.name}
                onChange={handleEditRoleChange}
              />
            </div>
            <div className="my-3">
              <label htmlFor="">Permissions</label>

              {permission?.map((item, index) => {
                return (
                  <label className="d-block" key={index}>
                    <input
                      type="checkbox"
                      value={item.name}
                      checked={selected?.includes(item.name)}
                      onChange={handleCheckboxChange}
                    />{" "}
                    {item.name}
                  </label>
                );
              })}
            </div>
            <div className="my-3">
              <button type="submit" className="btn btn-primary btn-block">
                Update Role
              </button>
            </div>
          </form>
        </ModalPopup>

        <div className="row">
          <div className="col-md-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="table-responsive">
                  {role && (
                    <table className="table table-hover table-center mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Role Name</th>
                          <th>Permissions</th>
                          <th>Created At</th>
                          <th>Status</th>
                          <th className="text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...role].reverse().map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>
                                <ul>
                                  {item.permissions.map((per, index) => {
                                    return <li key={index}>{per}</li>;
                                  })}
                                </ul>
                              </td>
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
                                  data-target="#roleEdit"
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

export default Role;
