import React, { useEffect, useState } from "react";
import axios from "axios";

const ListPc = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const [pcs, setPcs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPc, setSelectedPc] = useState(null);
  const [userSelect, setUserSelect] = useState("");

  const fetchPcs = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/pcs`, {
        withCredentials: true,
      });
      setPcs(res.data);
    } catch (e) {
      console.error("Error cargando PCs", e);
    } finally {
      setLoading(false);
    }
  };
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/auth/getuser`, {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (e) {
      console.error("Error cargando users", e);
    }
  };

  useEffect(() => {
    fetchPcs();
    fetchUsers();
  }, []);

  const asignarUsuario = async () => {
    if (!selectedPc || !userSelect) return;

    try {
      const user = users.find(u => u._id === userSelect);

      await axios.put(
        `${apiUrl}/api/pc/${selectedPc}/assign`,
        { username: user.username },
        { withCredentials: true }
      );

      setSelectedPc(null);
      setUserSelect("");
      fetchPcs();
    } catch (e) {
      console.error("Error asignando", e);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="space-y-4">

      <h2 className="text-lg font-semibold">Listado de PCs</h2>

      <div className="overflow-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Área</th>
              <th className="p-3">IP</th>
              <th className="p-3">Motivo</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Usuario</th>
              <th className="p-3">Acción</th>
            </tr>
          </thead>

          <tbody>
            {pcs.map((pc) => (
              <tr key={pc._id} className="border-t">
                <td className="p-3">{pc.areaName}</td>
                <td className="p-3">{pc.ip}</td>
                <td className="p-3">{pc.porqueSeTrajo}</td>

                <td className="p-3">
                  <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700">
                    {pc.estado}
                  </span>
                </td>

                <td className="p-3">
                  {pc.usuarioAsignado || "—"}
                </td>

                <td className="p-3">
                  {!pc.usuarioAsignado && (
                    <button
                      onClick={() => setSelectedPc(pc._id)}
                      className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700"
                    >
                      Asignar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPc && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[95%] max-w-md space-y-4">

            <h3 className="font-semibold">Asignar usuario</h3>

            <select
              value={userSelect}
              onChange={(e) => setUserSelect(e.target.value)}
              className="w-full border rounded-lg p-2"
            >
              <option value="">Seleccione usuario</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.username}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedPc(null)}
                className="px-3 py-2 bg-gray-200 rounded"
              >
                Cancelar
              </button>

              <button
                onClick={asignarUsuario}
                className="px-3 py-2 bg-teal-600 text-white rounded"
              >
                Guardar
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ListPc;
