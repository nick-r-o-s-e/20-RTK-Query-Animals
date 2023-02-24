import "./Form.scss";
import Animal from "../../Types/Animal";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import SelectOption from "../../Types/selectOption";

interface Props {
  submitForm: Function;
  data: Animal;
  setData: Function;
  changeData: Function;
  image: string | ArrayBuffer | null;
  formDisabled: boolean;
  options: SelectOption[];
  selectStyles: {
    control: () => {
      display: string;
      backgroundColor: string;
      fontSize: string;
      padding: string;
      borderRadius: string;
    };
  };
  selectErr: Boolean;
  setSelectErr: Function;
}

export default function Form({
  submitForm,
  data,
  setData,
  changeData,
  image,
  formDisabled,
  options,
  selectStyles,
  selectErr,
  setSelectErr,
}: Props) {
  return (
    <div className="new-animal">
      <ToastContainer />
      <form
        encType="multipart/form-data"
        className="new-animal__form"
        action="submit"
        method="post"
        onSubmit={(e) => {
          submitForm(e);
        }}
      >
        <h1>New Animal</h1>
        <hr />
        <div className="details">
          <div className="name-group">
            <div className="mb-3 detail name-div">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Name
              </label>
              <input
                value={data.name}
                name="name"
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                required
                onChange={(e) => {
                  changeData(e.target);
                }}
              />
            </div>

            <div className="mb-3 detail group-div">
              <label htmlFor="FormControlInput2" className={`form-label`}>
                Group
              </label>
              <Select
                onChange={(e) => {
                  if (options.map((obj) => obj.value).includes(e!.value)) {
                    setSelectErr(false);
                  }
                  setData((prevVal: Animal) => ({
                    ...prevVal,
                    group: e!.value,
                  }));
                }}
                styles={selectStyles}
                classNamePrefix={"filter"}
                options={options}
                className={`dropdown ${selectErr && "select-err"}`}
              />
              {selectErr && (
                <div className={"validation-label"}>Please Select Group</div>
              )}
            </div>
          </div>

          <div className="mb-3  image-div">
            <div className="image-input-label">
              <label className="form-label">Image</label>
              <label className="file-upload">
                <input
                  name="image"
                  type="file"
                  placeholder=""
                  onChange={(e) => {
                    changeData(e.target, e);
                  }}
                />
                Choose File
              </label>
            </div>
            <div
              className="image-placeholder"
              style={{ backgroundImage: `url(${String(image)})` }}
            ></div>
          </div>
        </div>

        <button disabled={formDisabled} className="btn btn-dark" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
