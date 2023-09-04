import { Tooltip } from "@mui/material";
import { formatterBRL } from "../utilities/format";
import { Badge } from "./Badge";
import { useController } from "../app/Context";

import { HiTrash } from "react-icons/hi";

export const Table = () => {
  const { estado, setEstado } = useController();

  const removeItem = (id: string) => {
    setEstado((antigoEstado) => ({
      ...antigoEstado,
      listaCrimes: antigoEstado.listaCrimes.filter((c) => c.id !== id),
    }));
  };

  return (
    <div className="-mx-4 text-white overflow-hidden shadow-lg sm:-mx-6 md:mx-0">
      <table className="min-w-full divide-y-8 divide-slate-900 bg-slate-800">
        <thead className="text-sm">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left w-[170px] font-semibold text-white sm:pl-6"
            >
              Crime
            </th>
            <th
              scope="col"
              className="hidden  py-3.5 text-left font-semibold text-white lg:table-cell"
            >
              Tipo
            </th>
            <th
              scope="col"
              className="hidden  py-3.5 text-left font-semibold text-white md:table-cell"
            >
              Pena
            </th>
            <th
              scope="col"
              className="hidden  py-3.5 text-left font-semibold text-white md:table-cell"
            >
              OBS
            </th>
            <th
              scope="col"
              className="hidden  py-3.5 text-left font-semibold text-white lg:table-cell"
            >
              Multa
            </th>
            <th
              scope="col"
              className="hidden  py-3.5 text-left font-semibold text-white lg:table-cell"
            >
              Fiança
            </th>
            <th
              scope="col"
              className=" py-3.5 text-left font-semibold text-white"
            >
              {/* Remover */}
            </th>
          </tr>
        </thead>

        <tbody className="divide-y-8 divide-slate-900 text-xs">
          {estado.listaCrimes.map((crime) => (
            <tr key={crime.id} className={""}>
              <td className="w-[170px] py-5 pl-4 pr-3 font-medium text-white sm:pl-6">
                <Tooltip title={crime.titulo.toUpperCase()}>
                  <p className="truncate w-full max-w-[170px]">
                    {crime.titulo.toUpperCase()}
                  </p>
                </Tooltip>
                <dl className="font-normal lg:hidden">
                  <dt className="sr-only">Tipo</dt>
                  <dd className="mt-1 truncate text-slate-200">
                    <Badge
                      text={crime.tipo.titulo}
                      bg={crime.tipo.background}
                    />
                  </dd>
                  <dt className="sr-only md:hidden">Tempo de Pena (Meses)</dt>
                  <dd className="mt-1 truncate md:hidden">
                    {crime.pena + " meses"}
                  </dd>
                  <dt className="sr-only md:hidden">OBS</dt>
                  <dd className="mt-1 truncate md:hidden">
                    {" "}
                    <Tooltip title={crime.obs.toUpperCase()}>
                      <p className="truncate w-full max-w-[130px]">
                        {crime.obs.toUpperCase()}
                      </p>
                    </Tooltip>
                  </dd>
                  <dt className="sr-only lg:hidden">Multa</dt>
                  <dd className="mt-1 truncate lg:hidden">
                    {formatterBRL(crime.multa)}
                  </dd>
                  <dt className="sr-only lg:hidden">Fiança</dt>
                  <dd className="mt-1 truncate lg:hidden">
                    {!estado.perdeTudo
                      ? formatterBRL(crime.fianca)
                      : "SEM DIREITO"}
                  </dd>
                </dl>
              </td>
              <td className="hidden  py-5 lg:table-cell">
                <Badge text={crime.tipo.titulo} bg={crime.tipo.background} />
              </td>
              <td className="hidden  py-5 md:table-cell">
                {crime.pena + " meses"}
              </td>
              <td className="hidden  py-5 md:table-cell">
                {" "}
                <Tooltip title={crime.obs.toUpperCase()}>
                  <p className="truncate w-full max-w-[130px]">
                    {crime.obs.toUpperCase()}
                  </p>
                </Tooltip>
              </td>
              <td className="hidden  py-5 lg:table-cell">
                {formatterBRL(crime.multa)}
              </td>
              <td className="hidden  py-5 lg:table-cell">
                {!estado.perdeTudo ? formatterBRL(crime.fianca) : "SEM DIREITO"}
              </td>
              <td className="py-5 pr-4">
                <div className="flex justify-center items-center">
                  <HiTrash
                    size={20}
                    className="cursor-pointer duration-200 text-red-600 hover:text-red-400"
                    onClick={() => removeItem(crime.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {estado.listaCrimes.length === 0 && (
        <div className="text-sm mt-2 bg-slate-800 py-5 text-center">
          Lista vazia
        </div>
      )}
    </div>
  );
};
