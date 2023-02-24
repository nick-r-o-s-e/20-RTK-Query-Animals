import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";
import Animal from "../../Types/Animal";
import SelectOption from "../../Types/selectOption";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toasterProps from "../../assets/toasterProps";

import { useAddAnimalMutation } from "../../redux/apiSlice";

const customSelectStyles = {
  control: () => ({
    display: "flex",
    backgroundColor: "#E9EFEF",
    fontSize: "1.3em",
    padding: "0.082rem",
    borderRadius: "0.375rem",
  }),
};

const options: SelectOption[] = [
  { label: "Select Group", value: "", isDisabled: true },
  { label: "Mammals", value: "Mammals" },
  { label: "Reptiles", value: "Reptiles" },
  { label: "Birds", value: "Birds" },
  { label: "Amphibians", value: "Amphibians" },
  { label: "Fishes", value: "Fishes" },
  { label: "Insects", value: "Insects" },
];
interface Props {
  setNavArrow: Function;
}
function NewAnimalForm({ setNavArrow }: Props) {
  const navigate = useNavigate();

  const [addAnimal] = useAddAnimalMutation();

  useEffect(() => {
    setNavArrow(false);
  }, []);
  const [animalData, setAnimalData] = useState<Animal>({
    name: "",
    group: "",
    image: "",
  });

  const [selectErr, setSelectErr] = useState(false);

  const [imageFile, setImageFile] = useState<FormData>();

  const [formDisabled, setFormDisabled] = useState(false);

  const [image, setImage] = useState<string | ArrayBuffer | null>(
    animalData.image
      ? animalData.image
      : "http://127.0.0.1:3004/images/placeholders/image-placeholder.jpg"
  );

  const saveFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append("image", e.target.files![0]);
    formData.append("fileName", e.target.files![0].name);

    setImageFile(formData);

    const reader = new FileReader();
    reader.onload = function (event) {
      setImage(event.target!.result);
    };

    reader.readAsDataURL(e.target.files![0]);
  };

  const changeData = (
    target: HTMLInputElement,
    e?: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (target.name == "image" && e) {
      saveFile(e);
    } else {
      setAnimalData(() => ({ ...animalData, [target.name]: target.value }));
    }
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    setFormDisabled(true);
    e.preventDefault();

    const failedToSubmit = () => {
      toast.error("Failed to add new animal", {
        ...toasterProps,
        autoClose: 2500,
      });
      setTimeout(() => {
        setFormDisabled(false);
      }, 3200);
    };

    if (!animalData.group) {
      setSelectErr(true);
      setFormDisabled(false);
    } else {
      if (imageFile) {
        axios
          .post("http://localhost:3004/upload", imageFile)
          .then(({ data }) => {
            addAnimal({
              ...animalData,
              image: `http://127.0.0.1:3004/images/${data}`,
            })
              .then(() => {
                navigate(`/animals/${animalData.group}`);
              })
              .catch(() => {
                failedToSubmit();
              });
          });
      } else {
        addAnimal({
          ...animalData,
          image: `http://127.0.0.1:3004/images/placeholders/image-placeholder.jpg`,
        })
          .then(() => {
            navigate(`/animals/${animalData.group}`);
          })
          .catch(() => {
            failedToSubmit();
          });
      }
    }
  };

  return (
    <div className="page">
      <Form
        submitForm={submitForm}
        data={animalData}
        setData={setAnimalData}
        changeData={changeData}
        image={image}
        formDisabled={formDisabled}
        options={options}
        selectStyles={customSelectStyles}
        selectErr={selectErr}
        setSelectErr={setSelectErr}
      />
    </div>
  );
}

export default NewAnimalForm;
