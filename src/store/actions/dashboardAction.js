import { getProjectsList } from "../slice/dashboardSlice";

export const getProjectList = () => {
  return (dispatch) => {
    fetch("https://fir-646b6-default-rtdb.firebaseio.com/project.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const projects = [];
        for (const key in data) {
          const project = {
            id: key,
            ...data[key],
          };

          projects.push(project);
          console.log("projects", projects);
        }
        dispatch(getProjectsList(projects.reverse()));
      });
  };
};
