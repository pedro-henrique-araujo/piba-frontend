import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../shared/useApi";
import PibPrimaryButton from "../../components/PibPrimaryButton";
import { useNavigate } from "react-router-dom";

function EditUser() {
  async function loadUser() {
    const { data } = await api.get("/user/" + id);
    setUser(data);
  }

  async function loadRoleOptions() {
    const { data } = await api.options("/role");
    setRoleOptions(data);
  }

  async function save() {
    const payload = {
      name: user.name,
      photoUrl: user.photoUrl,
      roles: user.roles,
    };

    await api.put("/user/" + id, payload);
    navigate("/usuario");
  }

  function handleRoleChange(role, isChecked) {
    if (isChecked && !user.roles.includes(role)) {
      setUser({ ...user, roles: [...user.roles, role] });
    } else {
      setUser({ ...user, roles: user.roles.filter((r) => r !== role) });
    }
  }

  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [roleOptions, setRoleOptions] = useState([]);
  const api = useApi();
  const navigate = useNavigate();
  useEffect(() => {
    loadUser();
    loadRoleOptions();
  }, []);

  if (!user) return null;
  return (
    <div className="mx-auto p-5 max-w-xl">
      <div className="w-20">
        <PibPrimaryButton onClick={save}>Salvar</PibPrimaryButton>
      </div>
      <div>
        <label className="font-bold">Nome</label>
      </div>
      <div className="mt-1 mb-3">
        <input
          className="h-9 w-3/4 px-3 border border-gray-300 rounded rounded-lg shadow-sm bg-white"
          type="text"
          onChange={(event) => setUser({ ...user, name: event.target.value })}
          value={user.name}
        />
      </div>
      <div className="mt-1 mb-3">
        <label className="font-bold">Photo Url</label>
      </div>
      <div className="mt-1 mb-3">
        <input
          className="h-9 w-3/4 px-3 border border-gray-300 rounded rounded-lg shadow-sm bg-white"
          type="text"
          onChange={(event) =>
            setUser({ ...user, photoUrl: event.target.value })
          }
          value={user.photoUrl}
        />
      </div>
      {roleOptions.length > 0 && (
        <div className="mt-1 mb-3">
          <label className="font-bold">Roles</label>
        </div>
      )}

      {roleOptions?.map((role) => (
        <div key={role}>
          <input
            type="checkbox"
            checked={user.roles.includes(role)}
            onChange={(event) => handleRoleChange(role, event.target.checked)}
          />
          <label className="ml-2">{role}</label>
        </div>
      ))}
    </div>
  );
}

export default EditUser;
