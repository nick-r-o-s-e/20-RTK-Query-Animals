import "./AnimalCard.scss";
import "react-toastify/dist/ReactToastify.css";

import { useDeleteAnimalMutation } from "../../redux/apiSlice";

interface Props {
  name: string;
  image: string;
  group: string;
  id: string;
  displayToaster: Function;
}
function AnimalCard({ name, image, group, id, displayToaster }: Props) {
  

  const [deleteAnimalT] = useDeleteAnimalMutation();

  const removeAnimal = async (id: string) => {
    await deleteAnimalT(id)
      .unwrap()
      .then(() => {
        displayToaster(true);
      })
      .catch((err) => {
        displayToaster(false);
      });
  };

  return (
    <div className="card">
      <div
        className="image-div card-img-top"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          {group.slice(0, group == "Fishes" ? -2 : -1)}
        </p>
        <button
          onClick={() => {
            removeAnimal(id);
          }}
          className="btn btn-danger delete-btn"
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
}

export default AnimalCard;
