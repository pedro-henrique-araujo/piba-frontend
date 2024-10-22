import { useEffect, useState } from "react";
import { useApi } from "../../shared/useApi";
import PibPrimaryButton from "../../components/PibPrimaryButton";
import { useNavigate } from "react-router-dom";
import { TextInput } from "@primer/react";

export default function NewSessionAttendance() {

    async function loadOptions() {
        const { data } = await api.options('/member');
        setItems(data.sort((a, b) => a.name.localeCompare(b.name)));
    }

    function toggleItem(id) {
        setItems(prevItems =>
            prevItems.map(
                item =>
                    item.id == id ?
                        { ...item, isPresent: !item.isPresent } :
                        item));
    }

    async function save() {
        const payload = {
            items: items.map(({id, isPresent}) => ({
                memberId: id,
                isPresent: isPresent
            }))
        }

        await api.post('/session-attendance', payload);
        navigate('/frequencia/sessao');
    }

    useEffect(() => {
        loadOptions();
    }, []);

    const api = useApi();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');

    const searchedItems = items.filter(item => search ? item.name.toLowerCase().includes(search.toLowerCase()) : true);

    return (
        <div className="mx-auto p-5 max-w-xl">
            <PibPrimaryButton width="20" onClick={save}>Salvar</PibPrimaryButton>
            <TextInput 
                className="mb-3" 
                placeholder="Pesquisar..." 
                value={search} 
                onChange={(event) => setSearch(event.target.value)}/>
            <ul>
                {searchedItems.map(item => (
                    <li
                        key={item.id}
                        className={
                            "mb-3 p-2 border cursor-pointer rounded " +
                            (item.isPresent ? "border-emerald-300 bg-emerald-100" : "")
                        }
                        onClick={() => toggleItem(item.id)}>
                        {item.name}
                    </li>
                ))}

            </ul>
        </div>
    );
}