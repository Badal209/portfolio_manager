import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getProject } from "../store/actions/createProjectAction";
// import { getProject } from "../store/actions/createProjectAction";

const ProjectDetailsPage = () => {
  const params = useParams();
  console.log(params);
  const dispatch = useDispatch();
  const { id } = params;

  const projectDetail = useSelector((state) => state.getProject.project);
  console.log("projectlist", projectDetail);
  useEffect(() => {
    dispatch(getProject(id));
  }, []);
  const renderKeyTechnology = (technology) => {
    console.log("Technology", technology);
    let tempt = [],
      i = 0;
    for (const key in technology) {
      if (technology[key] == true) {
        console.log("valueeee123", key);
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
    <div className="row">
      <div className="col-lg-12 view-page-spacing">
        <div className="ibox">
          <div className="ibox-title">
            <div className="ibox-tools">
              <a className="close-link">
                <i className="fa fa-times" />
              </a>
            </div>
          </div>
          <div className="ibox-content">
            <form method="get">
              <div className="form-group row zl-project-margin align-items-center zl-project-top-margin">
                <label className="col-lg-2 col-form-label">
                  <strong>Name</strong>
                </label>
                <div className="col-lg-10">
                  <p className="form-control-static">{projectDetail?.name}</p>
                </div>
              </div>
              <div className="hr-line-dashed"></div>
              <div className="form-group row zl-project-margin align-items-center">
                <label className="col-lg-2 col-form-label">
                  <strong>Type</strong>
                </label>
                <div className="col-lg-10">
                  <p className="form-control-static">{projectDetail?.type}</p>
                </div>
              </div>
              <div className="hr-line-dashed"></div>
              <div className="form-group row zl-project-margin align-items-center">
                <label className="col-lg-2 col-form-label">
                  <strong>Key Technologies</strong>
                </label>
                <div className="col-lg-10">
                  <p className="form-control-static">
                    {renderKeyTechnology(projectDetail?.KeyTechnologies)}
                  </p>
                </div>
              </div>
              <div className="hr-line-dashed"></div>
              <div className="form-group row zl-project-margin align-items-center">
                <label className="col-lg-2 col-form-label">
                  <strong>Tag</strong>
                </label>
                <div className="col-lg-10">
                  <p className="form-control-static">
                    {projectDetail?.tag &&
                      projectDetail?.tag.map((item) => item.label).join(",")}
                  </p>
                </div>
              </div>
              <div className="hr-line-dashed"></div>
              <div className="form-group row zl-project-margin">
                <label className="col-lg-2 col-form-label zl-form-label-padding">
                  <strong>Key Features</strong>
                </label>
                <div className="col-lg-10">
                  <p className="form-control-static">
                    {projectDetail?.keyFeature}
                  </p>
                </div>
              </div>
              <div className="hr-line-dashed"></div>
              <div className="form-group row zl-project-margin">
                <label className="col-lg-2 col-form-label zl-form-label-padding">
                  <strong>Links</strong>
                </label>
                <div className="col-lg-10">
                  <p className="form-control-static">
                    {(projectDetail?.link).join(", ")}
                  </p>
                </div>
              </div>
              <div className="hr-line-dashed"></div>
              <div className="form-group row zl-project-margin align-items-center zl-project-bottom-margin">
                <label className="col-lg-2 col-form-label">
                  <strong>Status</strong>
                </label>
                <div className="col-lg-10">
                  <p className="form-control-static">{projectDetail?.status}</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
