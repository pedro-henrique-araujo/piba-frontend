import caretLeftSvg from '../assets/caret-left.svg';
import caretRightSvg from '../assets/caret-right.svg';

function PibCalendarMonthControl({nameOfMonth, year, onPrevious, onNext}) {
  return (
    <div
  className="flex justify-between align-center my-2 text-sm text-primary-pressed font-semibold"
>
  <button onClick={onPrevious}>
    <img src={caretLeftSvg} alt="Anterior" />
  </button>
  <div>{ nameOfMonth } { year }</div>
  <button onClick={onNext}>
    <img src={caretRightSvg} alt="Próximo" />
  </button>
</div>


  );
}

export default PibCalendarMonthControl;