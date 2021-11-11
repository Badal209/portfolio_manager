import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, addDoc } from "firebase/firestore";
import { useHistory, useParams } from "react-router";
import {
  addProjectData,
  getProjects,
} from "../store/actions/createProjectAction";
import { addProject } from "../store/slice/createProjectSlice";
import { db } from "../Firebase";
import { routes } from "../route/route";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { getTagTech } from "../store/actions/tagAction";

toast.configure();
const CreateProjectPage = () => {
  const history = useHistory();
  const { id } = useParams();
  console.log("ID", id);
  const dispatch = useDispatch();
  const projectDetails = useSelector((state) => state.getProject.project);
  const tags = useSelector((state) => state.tag.tags);
  console.log("TAGGGG", tags);
  console.log("PROJECT_DETAILS", projectDetails);

  const initialValuesCheck = {
    react: false,
    laravel: false,
    reactnative: false,
    wordpress: false,
  };

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [typeRadio, setTypeRadio] = useState("Web App");
  const [typeRadioError, setTypeRadioError] = useState("");
  const [checkbox, setCheckbox] = useState(initialValuesCheck);
  const [checkboxError, setCheckboxError] = useState("");
  const [tag, setTag] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
  // const [tag, setTag] = useState([]);
  console.log("TAG", tag, selectedTag);

  const [tagError, setTagError] = useState("");
  const [keyFeature, setKeyFeature] = useState("");
  const [keyFeatureError, setKeyFetureError] = useState("");
  const [link, setLink] = useState([]);
  const [linkError, setLinkError] = useState("");
  console.log("ArrAy", Array(5), link);
  const [statusRadio, setStatusRadio] = useState("Active");
  const [statusRadioError, setStatusRadioError] = useState("");

  // const [formIsValid, setFormIsValid] = useState();

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const typeRadioHandler = (e) => {
    setTypeRadio(e.target.value);
  };
  console.log("state", checkbox);
  const checkboxHandler = (e) => {
    console.log(e.target.value, "jhk");
    const target = e.target;
    setCheckbox((prev) => ({
      ...prev,
      [target.name]: target.checked ? true : false,
    }));
    // setCheckbox([...checkbox, e.target.value]);
  };

  const tagHandler = (e) => {
    // setTag(Array.isArray(e) ? e.map((x) => x.value) : []);
    setSelectedTag(Array.isArray(e) ? e : []);
    console.log(e, "taghandler");
    // setTag(tagList);
    // setTag(e.value);
    // console.log(e);
  };
  const keyFeatureHandler = (e) => {
    setKeyFeature(e.target.value);
  };
  const linkHandler = (e, index) => {
    // setLink(e.target.value);
    var sparseArray = [Array(5)],
      cleanArray = sparseArray.filter(function () {
        return true;
      });
    console.log(cleanArray, link, index, "Link ARRAY");
    let temp = [...link];
    temp[index] = e.target.value;
    console.log(temp);
    setLink(temp);
  };

  const statusRadioHandler = (e) => {
    setStatusRadio(e.target.value);
  };

  const formCancleHandler = () => {
    window.alert("are you sure");
    history.push(routes.dashboardPage);
  };
  const createProjectHandler = (e) => {
    e.preventDefault();

    console.log("toast", tag);
    let createValidate = formvalidHandler();
    if (createValidate) {
      const data = {
        name: name,
        type: typeRadio,
        KeyTechnologies: checkbox,
        tag: selectedTag,
        keyFeature: keyFeature,
        link: link,
        status: statusRadio,
      };
      console.log("DATA", data);
      fetch("https://fir-646b6-default-rtdb.firebaseio.com/project.json", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("project_data", res);
          addDoc(collection(db, "projects"), data);
        })
        .catch((err) => {
          console.log(err);
        });

      dispatch(addProjectData(data));
      dispatch(getProjects(id));

      //toast notification
      toast.success("Create Project Successfully !", {
        autoClose: 3000,
      });
      history.push(routes.dashboardPage);
    }
  };
  const selectUserData = (item) => {
    // let item = projectDetails[id - 1];
    setName(item.name);
    setCheckbox(item.KeyTechnologies);
    setKeyFeature(item.keyFeature);
    setLink(item.link);
    setStatusRadio(item.status);
    setSelectedTag(item.tag);
    setTypeRadio(item.type);
  };

  const updateProjectHandler = async () => {
    console.log("BUTTON_CLICKED");
    let projectUpdate = formvalidHandler();
    if (projectUpdate) {
      const data = {
        name: name,
        type: typeRadio,
        KeyTechnologies: checkbox,
        tag: selectedTag,
        keyFeature: keyFeature,
        link: link,
        status: statusRadio,
      };
      // dispatch(updateProject(data));
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      const response = await fetch(
        `https://fir-646b6-default-rtdb.firebaseio.com/project/${id}.json`,
        requestOptions
      );
      console.log("req", requestOptions);
      console.log("response_data", response);
      const updateData = await response.json();
      console.log("UPDATED", updateData);
      history.push(routes.dashboardPage);

      //toast notification
      toast.success("Your Project Successfully Updated !", {
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    if (projectDetails !== null && projectDetails !== undefined) {
      if (Object.values(projectDetails).length > 0 && id) {
        selectUserData(projectDetails);
        console.log("checkbox", projectDetails);
      }
    }
  }, [projectDetails]);

  const formvalidHandler = () => {
    let isValid = false;
    if (!name) {
      setNameError("Name is require !");
    } else if (!typeRadio) {
      setTypeRadioError("Check radio is require!");
    } else if (!keyFeature) {
      setKeyFetureError("KeyFeature is require!");
    } else if (!tag) {
      setTagError("Tag is require!");
    } else if (!statusRadio) {
      setStatusRadioError("Status is require!");
    } else if (!link) {
      setLinkError("Link is require!");
    } else if (!checkbox) {
      setCheckboxError("Checkbox is require!");
    } else {
      isValid = true;
    }
    return isValid;
  };
  useEffect(() => {
    dispatch(getTagTech());
  }, []);
  useEffect(() => {
    if (tags) {
      let tagArray = [];
      for (let key in tags) {
        tagArray.push(tags[key]);
      }
      setTag(tagArray);
      // const tagList = Object.values(tags).map((key) => tags[key]);
      // setTag(tagList);
    }
  }, [tags]);
  // const linkIndex = () => {
  //   let linkArray = link.map((item, i) => {
  //     return (
  //       <>
  //         <input
  //           type="text"
  //           key={i}
  //           placeholder="www.example1.com"
  //           className="form-control m-b"
  //           onChange={(e) => linkHandler(e, i)}
  //           value={link[0]}
  //         />
  //       </>
  //     );
  //   });
  //   console.log("output", linkArray);
  // };

  return (
    <div className="row">
      <div className="col-lg-12 create-page-spacing">
        <div className="ibox">
          <div className="ibox-content">
            <div className="row wrapper border-bottom white-bg page-heading zl-header-bottom">
              <div method="get" style={{ width: "100%" }}>
                <div className="form-group row zl-project-margin align-items-center zl-project-top-margin form-name">
                  <div className="col-lg-2">
                    <label className=" col-form-label">
                      <strong>Name</strong>
                    </label>
                  </div>
                  <div className="col-lg-10 zl-create-project-name">
                    <input
                      type="text"
                      className="form-control"
                      onChange={nameChangeHandler}
                      value={name}
                      required
                    />
                    {!name && nameError ? (
                      <span className="form-text m-b-none">{nameError}</span>
                    ) : null}
                  </div>
                </div>
                <div className="hr-line-dashed"></div>
                <div className="form-group row zl-project-margin align-items-center zl-project-top-margin form-radius">
                  <div className="col-lg-2">
                    <label className=" col-form-label">
                      <strong>Type</strong>
                    </label>
                  </div>
                  <div className="col-lg-10 d-flex zl-create-gap col-sm-12">
                    <div className="zl-custom-radio button-responsive">
                      <input
                        type="radio"
                        id="inlineRadio1"
                        value="Web App"
                        name="Type"
                        onChange={typeRadioHandler}
                        checked={typeRadio === "Web App"}
                      />
                      <label
                        className="custom-input label-margin"
                        htmlFor="inlineRadio1"
                      >
                        Web App
                      </label>
                    </div>
                    <div className="zl-custom-radio button-responsive">
                      <input
                        type="radio"
                        id="inlineRadio2"
                        value="Wordpress"
                        name="Type"
                        onChange={typeRadioHandler}
                        checked={typeRadio === "Wordpress"}
                      />
                      <label
                        className="custom-input label-margin"
                        htmlFor="inlineRadio2"
                      >
                        Wordpress
                      </label>
                    </div>
                    <div className="zl-custom-radio button-responsive">
                      <input
                        type="radio"
                        id="inlineRadio3"
                        value="Mobile App"
                        name="Type"
                        onChange={typeRadioHandler}
                        checked={typeRadio === "Mobile App"}
                      />
                      <label
                        className="custom-input label-margin"
                        htmlFor="inlineRadio3"
                      >
                        Mobile App
                      </label>
                    </div>
                  </div>
                </div>
                {!typeRadio && typeRadioError ? (
                  <span className="form-text m-b-none">{typeRadioError}</span>
                ) : null}
                <div className="hr-line-dashed"></div>
                <div className="form-group row zl-project-margin zl-project-top-margin form-radius">
                  <div className="col-lg-2">
                    <label className="col-form-label">
                      <strong>Key Technologies</strong>
                    </label>
                  </div>
                  <div
                    className="col-lg-10 zl-create-project-responsive key-technologies"
                    value={checkbox}
                    onChange={checkboxHandler}
                  >
                    <div className="d-flex form-gap-1">
                      <div className="zl-custom-radio">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox1"
                          // value="React"
                          name="react"
                          checked={checkbox?.react}
                        />
                        <label
                          className="custom-input label-margin"
                          htmlFor="inlineCheckbox1"
                        >
                          {" React"}
                        </label>
                      </div>
                      <div className="zl-custom-radio">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox2"
                          // value="Wordpress"
                          name="wordpress"
                          checked={checkbox?.wordpress}
                        />
                        <label
                          className="custom-input label-margin"
                          htmlFor="inlineCheckbox2"
                        >
                          {"Wordpress "}
                        </label>
                      </div>
                    </div>
                    {!checkbox && checkboxError ? (
                      <span className="form-text m-b-none">
                        {checkboxError}
                      </span>
                    ) : null}
                    <div className="d-flex zl-form-width">
                      <div className="zl-custom-radio">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox3"
                          value="React Native"
                          name="reactnative"
                          checked={checkbox?.reactnative}
                        />
                        <label
                          className="custom-input label-margin"
                          htmlFor="inlineCheckbox3"
                        >
                          {" React Native"}
                        </label>
                      </div>
                      <div className="zl-custom-radio">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox4"
                          // value="Laravel"
                          name="laravel"
                          checked={checkbox?.laravel}
                        />
                        <label
                          className="custom-input label-margin"
                          htmlFor="inlineCheckbox4"
                        >
                          Laravel
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hr-line-dashed"></div>
                <div className="form-group row zl-project-margin align-items-center zl-project-top-margin">
                  <label className="col-lg-2 col-form-label" htmlFor="tag">
                    <div className="col-lg-2">
                      <strong>Tag</strong>
                    </div>
                  </label>
                  <div className="col-lg-10">
                    <Select
                      isMulti
                      className="basic-multi-select"
                      classNamePrefix="select"
                      name="tag"
                      options={tag}
                      required
                      id="tag"
                      onChange={tagHandler}
                      value={selectedTag}

                      // value={tag}
                    />
                    {/* <Select
                      isMulti
                      name="tag"
                      value={tag}
                      onChange={tagHandler}
                    >
                      <option value="">Select the tag</option>
                      {tagList.map((tag, key) => (
                        <option key={key} value={tag.label}>
                          {tag.label}
                        </option>
                      ))}
                    </Select> */}
                  </div>
                </div>
                {!tag && tagError ? (
                  <span className="form-text m-b-none">{tagError}</span>
                ) : null}
                <div className="hr-line-dashed"></div>
                <div className="form-group row zl-project-margin zl-project-top-margin">
                  <div className="col-lg-2">
                    <label className="col-form-label">
                      <strong>Key Features</strong>
                    </label>
                  </div>
                  <div className="col-lg-10 zl-create-project-key">
                    <textarea
                      type="text"
                      className="form-control zl-project-list-form"
                      onChange={keyFeatureHandler}
                      value={keyFeature}
                      required
                    />
                  </div>
                </div>
                {!keyFeature && keyFeatureError ? (
                  <span className="form-text m-b-none">{keyFeatureError}</span>
                ) : null}
                <div className="hr-line-dashed"></div>
                <div className="form-group row zl-project-margin zl-project-top-margin">
                  <div className="col-lg-2 col-sm-2">
                    <label className="col-form-label">
                      <strong>Links</strong>
                    </label>
                  </div>
                  <div className="col-lg-10 col-sm-10 zl-create-project-links">
                    {/* <input
                      type="text"
                      placeholder="www.example1.com"
                      className="form-control m-b"
                      onChange={linkHandler}
                      value={link}
                    /> */}
                    {[0, 1, 2, 3, 4].map((item, i) => {
                      return (
                        <input
                          type="text"
                          key={i}
                          placeholder="www.example1.com"
                          className="form-control m-b"
                          onChange={(e) => linkHandler(e, i)}
                          value={link ? link[i] : ""}
                        />
                      );
                    })}
                  </div>
                </div>
                {!link && linkError ? (
                  <span className="form-text m-b-none">{linkError}</span>
                ) : null}
                <div className="hr-line-dashed"></div>
                <div className="form-group row zl-project-margin zl-project-top-margin align-items-center zl-form-margin">
                  <div className="col-lg-2 col-sm-4">
                    <label className="col-form-label">
                      <strong>Status</strong>
                    </label>
                  </div>
                  <div
                    className="col-lg-10 col-sm-8 d-flex status"
                    onChange={statusRadioHandler}
                    value={statusRadio}
                  >
                    <div className="zl-custom-radio">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="inlineRadio5"
                        value="Active"
                        name="Status"
                        checked={statusRadio === "Active"}
                      />
                      <label
                        className="custom-input label-margin"
                        htmlFor="inlineRadio5"
                      >
                        {" "}
                        Active
                      </label>
                    </div>
                    <div className="zl-custom-radio">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="inlineRadio4"
                        value="InActive"
                        name="Status"
                        checked={statusRadio === "InActive"}
                      />
                      <label
                        className="custom-input label-margin"
                        htmlFor="inlineRadio4"
                      >
                        Inactive
                      </label>
                    </div>
                  </div>
                </div>
                {!statusRadio && statusRadioError ? (
                  <span className="form-text m-b-none">{statusRadioError}</span>
                ) : null}
                <div className="hr-line-dashed"></div>
                <div className="form-group row">
                  <div className="col-lg-12 col-sm-12 col-sm-offset-2">
                    <button
                      className="btn btn-white btn-sm"
                      type="submit"
                      onClick={formCancleHandler}
                    >
                      Cancel
                    </button>
                    {!id ? (
                      <button
                        className="btn btn-save btn-sm"
                        type="submit"
                        onClick={createProjectHandler}
                      >
                        Create Project
                      </button>
                    ) : (
                      <button
                        className="btn btn-save btn-sm"
                        type="submit"
                        onClick={() => updateProjectHandler()}
                      >
                        Update Project
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectPage;
