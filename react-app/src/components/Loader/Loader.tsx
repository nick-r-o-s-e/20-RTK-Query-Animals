import { TailSpin } from "react-loader-spinner";
import "./Loader.scss";

function Loader() {
  return (
    <div className="loading">
      <TailSpin
        height="200"
        width="200"
        color="#672fa6"
        ariaLabel="tail-spin-loading"
        radius="2"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Loader;
