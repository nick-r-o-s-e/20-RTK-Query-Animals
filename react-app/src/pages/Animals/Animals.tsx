import AnimalCard from "../../components/AnimalCard/AnimalCard";
import "./Animals.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { useEffect } from "react";
import Loader from "../../components/Loader/Loader";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toasterProps from "../../assets/toasterProps";

import { useGetAnimalsQuery } from "../../redux/apiSlice";

const displayToaster = (success: boolean) => {
  if (success) {
    toast.success("Animal has been successfully deleted", toasterProps);
  } else {
    toast.error("Failed to delete animal", toasterProps);
  }
};

interface Props {
  setNavArrow: Function;
}

function Animals({ setNavArrow }: Props) {
  const { group } = useParams();

  const { data: animals, error, isLoading } = useGetAnimalsQuery(group || "");

  useEffect(() => {
    if (animals && !animals.length) {
      setNavArrow(true);
    } else {
      setNavArrow(false);
    }
  }, [animals]);
  if (isLoading) {
    return <Loader />;
  }

  if (!(animals || []).length) {
    return (
      <h1 className={"page-title no-animals-title"}>
        There are no {group || "animals"} yet...
      </h1>
    );
  }

  return (
    <div className="page">
      <ToastContainer />
      {group && <h1 className="page-title">{group}</h1>}

      <div className="animals-page">
        <div className="animals">
          {animals!.map(({ _id, name, image, group }) => {
            return (
              <AnimalCard
                key={_id}
                id={_id!}
                name={name}
                image={image}
                group={group}
                displayToaster={displayToaster}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Animals;
