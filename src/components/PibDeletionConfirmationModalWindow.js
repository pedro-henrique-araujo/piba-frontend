import alertTriangeImage from "../assets/alert-triangle.svg";
import xSvg from "../assets/x.svg";

function PibDeletionConfirmationModalWindow({ onClose, visible, onConfirm }) {
  if (!visible) return null;
  return (
    <div
      className="absolute top-0 bg-neutral-950/25 backdrop-blur w-full h-full"
      onClick={onClose}
    >
      <div className="flex w-full justify-center">
        <div
          className="bg-white rounded mx-auto p-5 max-w-xl mt-40 mx-5 relative"
          onClick={(event) => event.stopPropagation()}
        >
          <img
            src={xSvg}
            className="absolute top-5 right-5 cursor-pointer"
            onClick={onClose}
          />
          <img src={alertTriangeImage} />
          <p className="font-bold text-2xl mt-2">Atenção</p>
          <p className="mt-2">
            Tem certeza que você quer&nbsp;
            <span className="font-semibold">remover</span>
            &nbsp;esse registro?
          </p>
          <div className="flex justify-between mt-10 w-1/2 mx-auto font-semibold">
            <button className="text-danger" onClick={onConfirm}>
              Sim
            </button>
            <button
              className="bg-primary text-white rounded px-5 py-1"
              onClick={onClose}
            >
              Não
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PibDeletionConfirmationModalWindow;
