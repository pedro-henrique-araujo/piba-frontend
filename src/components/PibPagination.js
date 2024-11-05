import chevronRightLinkSvg from "../assets/chevron-right-link.svg";
import chevronLeftLinkSvg from "../assets/chevron-left-link.svg";

function PibPagination({
  currentPage,
  switchToNextPage,
  switchToPreviousPage,
  totalNumberOfPages,
}) {
  return (
    <div className="flex justify-between">
      <button
        className="text-link disabled:opacity-50 flex items-start"
        disabled={currentPage === 1}
        onClick={switchToPreviousPage}
      >
        <img src={chevronLeftLinkSvg} alt="<" />
        <div>Anterior</div>
      </button>
      <div>
        Página {currentPage} de {totalNumberOfPages}
      </div>
      <button
        className="text-link disabled:opacity-50 flex items-center"
        disabled={currentPage === totalNumberOfPages}
        onClick={switchToNextPage}
      >
        <div>Próxima</div>
        <img src={chevronRightLinkSvg} alt=">" />
      </button>
    </div>
  );
}

export default PibPagination;
