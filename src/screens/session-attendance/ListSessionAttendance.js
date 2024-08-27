import { useEffect } from "react";
import { useState } from "react";
import api from '../../services/api';

function ListSessionAttendance() {
    async function loadSessionAttendances() {
        const { data: { records } } = await api.get('/session-attendance');
        setSessionAttedances(records);
    }

    useEffect(() => {
        loadSessionAttendances();
    }, []);
    const [sessionAttendances, setSessionAttedances] = useState([]);
    return sessionAttendances.map(a => <div>{a.id}</div>);
}

export default ListSessionAttendance;