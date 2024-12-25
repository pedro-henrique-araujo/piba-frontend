import PibProfilePhoto from "./PibProfilePhoto";

function PibAvailabilityDropdown({ date, availabilities }) {
  if (!availabilities?.length) return <div></div>;
  const dateIsAfterWednesday = date.getDay() > 3;
  const horizontalPositionClass = dateIsAfterWednesday ? " right-6" : " left-6";
  const className =
    "z-10 hidden group-hover:flex absolute bg-white p-3 border flex-col gap-3 shadow bg-white sm:w-48 w-44 top-4";

  return (
    <div className={className + horizontalPositionClass}>
      {availabilities.map((availability) => (
        <div key={availability.id} className="flex items-center gap-2">
          <div>
            <PibProfilePhoto src={availability.user.photoUrl} />
          </div>
          <div className="text-[10px] sm:text-sm">{availability.user.name}</div>
        </div>
      ))}
    </div>
  );
}

export default PibAvailabilityDropdown;
