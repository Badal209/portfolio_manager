import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { tagTech } from "../store/actions/tagAction";

const TagPage = () => {
  const dispatch = useDispatch();
  const tag = useSelector((state) => state.tag);
  //   console.log("TAGGG", tag);
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");

  const labelChangeHandler = (e) => {
    setLabel(e.target.value);
    setValue(e.target.value);
  };
  const valueChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const addTagHandler = () => {
    dispatch(
      tagTech({
        label: label,
        value: value,
      })
    );
    setLabel("");
    setValue("");
    toast.success("Your tag successfully added", {
      autoClose: 3000,
    });
  };
  //   const getHandler = () => {
  //     dispatch(getTagTech());
  //   };
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
                      <strong>Label</strong>
                    </label>
                  </div>
                  <div className="col-lg-10 zl-create-project-name">
                    <input
                      type="text"
                      className="form-control"
                      onChange={labelChangeHandler}
                      value={label}
                      required
                    />
                  </div>
                </div>{" "}
                <div className="form-group row zl-project-margin align-items-center zl-project-top-margin form-name">
                  <div className="col-lg-2">
                    <label className=" col-form-label">
                      <strong>Value</strong>
                    </label>
                  </div>
                  <div className="col-lg-10 zl-create-project-name">
                    <input
                      type="text"
                      className="form-control"
                      onChange={valueChangeHandler}
                      value={value}
                      required
                    />
                  </div>
                </div>
                <div className="hr-line-dashed"></div>
                <div className="form-group row">
                  <div className="col-lg-12 col-sm-12 col-sm-offset-2">
                    <button
                      className="btn btn-save btn-sm"
                      type="submit"
                      style={{ width: "60px" }}
                      onClick={addTagHandler}
                    >
                      Add
                    </button>
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

export default TagPage;
