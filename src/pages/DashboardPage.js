import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import { routes } from "../route/route";
import { getProject } from "../store/actions/createProjectAction";

import { getProjectList } from "../store/actions/dashboardAction";

const DashBoardPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const projectList = useSelector((state) => state.dashboard.projects);
  const editProjectDetails = useSelector((state) => state.project.projects);
  // console.log("EDIT_PROJECT", editProjectDetails);
  const [filteredProject, setFilteredProject] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("status");
  const [type, setType] = useState("type");

  const user = useSelector((state) => state.user.user);
  // console.log("USER", user);

  const createProjectHandler = () => {
    history.push(routes.createProjectPage);
  };

  const statusChangeHandler = (e) => {
    setStatus(e.target.value);
    // console.log(e.target.value, "status");
    // // console.log("status", status);
    // if (e.target.value === "status") {
    //   setFilteredProject(projectList);
    // } else if (e.target.value === "active") {
    //   const filteredActive = projectList.filter(
    //     (option) => option.status === "Active"
    //   );
    //   // console.log(filteredData, "filter");
    //   setFilteredProject(filteredActive);
    // } else if (e.target.value === "inactive") {
    //   const filterInactive = projectList.filter(
    //     (option) => option.status === "InActive"
    //   );
    //   setFilteredProject(filterInactive);
    // }
  };
  const typeChangeHandler = (e) => {
    setType(e.target.value);
    // console.log(e.target.value, "type");
    // if (e.target.value === "type") {
    //   setFilteredProject(projectList);
    // } else if (e.target.value === "webapp") {
    //   const webapp = projectList.filter((option) => {
    //     if(status.length !== status) {

    //     }
    //     return option.type === "Web App";
    //   });
    //   setFilteredProject(webapp);
    // } else if (e.target.value === "wordpress") {
    //   const wordpress = projectList.filter(
    //     (option) => option.type === "Wordpress"
    //   );
    //   setFilteredProject(wordpress);
    // } else if (e.target.value === "mobileapp") {
    //   const mobileapp = projectList.filter(
    //     (option) => option.type === "Mobile App"
    //   );
    //   setFilteredProject(mobileapp);
    // }
  };
  // handle change event of search input
  const handleChange = (value) => {
    setSearch(value);
    // setFilteredProject(
    //   filteredProject.filter((project) =>
    //     project.name.toLowerCase().includes(search.toLowerCase())
    //   )
    // );
    // filterData(value);
  };

  const editProjectHandler = (id) => {
    dispatch(getProject(id));
    history.push(`/project/edit/${id}`);
    // console.log("EDIT_CLICKED");
  };

  useEffect(() => {
    dispatch(getProjectList());
  }, []);
  // console.log("PROJECT", projectList);

  // useEffect(() => {
  //   setFilteredProject(
  //     filteredProject.filter((project) =>
  //       project.name.toLowerCase().includes(search.toLowerCase())
  //     )
  //   );
  // }, [search, projectList]);

  // serachbar filter
  useEffect(() => {
    setFilteredProject(projectList);
  }, [projectList]);
  // serachbar filter
  // const excludeColumns = ["id", "type"];

  // const filterData = (value) => {
  //   const lowercasedValue = value.toLowerCase().trim();
  //   if (lowercasedValue === "") setFilteredProject(projectList);
  //   else {
  //     const filteredData = filteredProject.filter((item) => {
  //       return Object.keys(item).some((key) =>
  //         excludeColumns.includes(key)
  //           ? false
  //           : item[key].toString().toLowerCase().includes(lowercasedValue)
  //       );
  //     });
  //     setFilteredProject(filteredData);
  //   }
  // };

  //project filtered by status
  // useEffect(() => {
  //   console.log("status", status);
  //   if (status === "status") {
  //     setFilteredProject(projectList);
  //   } else if (status === "active") {
  //     const filteredActive = projectList.filter(
  //       (option) => option.status === "Active"
  //     );
  //     // console.log(filteredData, "filter");
  //     setFilteredProject(filteredActive);
  //   } else if (status === "inactive") {
  //     const filterInactive = projectList.filter(
  //       (option) => option.status === "InActive"
  //     );
  //     setFilteredProject(filterInactive);
  //   }
  // }, [status]);

  console.log(filteredProject, "filter_Project");

  // project filter by type
  // useEffect(() => {
  //   if (type === "type") {
  //     setFilteredProject(projectList);
  //   } else if (type === "webapp") {
  //     const webapp = projectList.filter((option) => option.type === "Web App");
  //     setFilteredProject(webapp);
  //   } else if (type === "wordpress") {
  //     const wordpress = projectList.filter(
  //       (option) => option.type === "Wordpress"
  //     );
  //     setFilteredProject(wordpress);
  //   } else if (type === "mobileapp") {
  //     const mobileapp = projectList.filter(
  //       (option) => option.type === "Mobile App"
  //     );
  //     setFilteredProject(mobileapp);
  //   }
  // }, [type]);
  useEffect(() => {
    console.log("serchlength", search.length);
    if (status !== "status" || type !== "type" || search.length > 0) {
      console.log("Confirm filter", projectList, search);
      let list = projectList;
      const filterDataList = list.filter((item) => {
        if (status !== "status" && type === "type" && search.length === 0) {
          console.log("Status", status);
          console.log(item.status, "item.status");
          return item.status === status;
        } else if (
          status === "status" &&
          type !== "type" &&
          search.length === 0
        ) {
          return item.type === type;
        } else if (
          status === "status" &&
          type === "type" &&
          search.length > 0
        ) {
          console.log("name", item.name);
          return item.name.toLowerCase().includes(search.toLowerCase());
        } else if (
          status !== "status" &&
          type !== "type" &&
          search.length === 0
        ) {
          return item.type === type && item.status === status;
        } else if (
          status !== "status" &&
          type === "type" &&
          search.length > 0
        ) {
          return (
            item.status === status &&
            item.name.toLowerCase().includes(search.toLowerCase())
          );
        } else if (
          status === "status" &&
          type !== "type" &&
          search.length > 0
        ) {
          return (
            item.type === type &&
            item.name.toLowerCase().includes(search.toLowerCase())
          );
        } else if (
          status !== "status" &&
          type !== "type" &&
          search.length > 0
        ) {
          return (
            item.type === type &&
            item.status === status &&
            item.name.toLowerCase().includes(search.toLowerCase())
          );
        }
      });
      console.log("filterDataList", filterDataList);
      setFilteredProject(filterDataList);
    } else if (search.length === 0 && status === "status" && type === "type") {
      setFilteredProject(projectList);
    }
  }, [status, type, search]);
  // when select multi checkbox then given space
  const renderKeyTechnology = (technology) => {
    // console.log("Technology", technology);
    let tempt = [],
      i = 0;
    for (const key in technology) {
      if (technology[key] == true) {
        // console.log("valueeee123", key);
        tempt.push(
          <span key={`demo_snap_${key}`}>{(i !== 0 ? ", " : "") + key}</span>
        );
        i++;
        // tempt.push(<span>{key}</span>);
      }
    }
    return tempt;
    // return Object.keys(technology).map((tech, index) => {});
  };

  return (
    <div className="wrapper wrapper-content animated fadeInUp zl-home-page-table">
      <div className="row">
        <div className="col-lg-12">
          <div className="ibox">
            <div className="ibox-title">
              <div className="ibox-tools">
                <Link
                  to={routes.createProjectPage}
                  className="btn btn-xs btn-create"
                  onClick={createProjectHandler}
                >
                  Create New Project
                </Link>
              </div>
            </div>
            <div className="ibox-content">
              <div className="m-b zl-table-list zl-table-height">
                <div className="position-relative ibox-spacing-status">
                  <select
                    className="form-control appearance input-search"
                    name="account"
                    value={status}
                    onChange={statusChangeHandler}
                  >
                    <option value="status">Status</option>
                    <option value="Active">Active</option>
                    <option value="InActive">Inactive</option>
                  </select>

                  <i className="fas fa-sort-down" />
                </div>
                <div className="position-relative ibox-spacing-type">
                  <select
                    className="form-control appearance input-search"
                    name="account"
                    value={type}
                    onChange={typeChangeHandler}
                  >
                    <option value="type">Type</option>
                    <option value="Web App">Web App</option>
                    <option value="Wordpress">Wordpress</option>
                    <option value="Mobile App">Mobile App</option>
                  </select>
                  <i className="fas fa-sort-down" />
                </div>

                <div className="ibox-spacing-search">
                  <input
                    type="text"
                    name=""
                    placeholder="Search"
                    className="form-control input-search"
                    onChange={(e) => {
                      handleChange(e.target.value);
                      console.log(e.target.value, "serch");
                    }}
                    value={search}
                  />
                </div>
              </div>
              <div className="project-list table-project-list table-responsive">
                <table className="table table-hover zl-project-table">
                  <tbody>
                    {filteredProject.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td className="project-title">
                            <Link
                              to="/projectdetails"
                              className="zl-project-font"
                            >
                              {item.name}
                            </Link>
                            <br />
                            <ol className="breadcrumb">
                              <li className="breadcrumb-item">
                                <Link to="/dashboard">{item.type}</Link>
                              </li>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {renderKeyTechnology(item.KeyTechnologies)}
                              </li>
                            </ol>
                          </td>
                          <td className="project-completion">
                            <p>{item.keyFeature}</p>
                          </td>
                          <td className="project-people">
                            <span
                              className={
                                item.status === "Active"
                                  ? " badge badge-primary"
                                  : "badge"
                              }
                            >
                              {item.status}
                            </span>
                          </td>

                          <td className="project-actions">
                            <div className="d-flex project-actions-buttons">
                              <Link
                                to={`/projectdetails/${item.id}`}
                                className="btn btn-white btn-sm"
                              >
                                <i className="fa fa-folder" />
                                View
                              </Link>
                              <button
                                className="btn btn-white btn-sm"
                                onClick={() => editProjectHandler(item.id)}
                              >
                                <i className="fas fa-pencil-alt" />
                                Edit
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
