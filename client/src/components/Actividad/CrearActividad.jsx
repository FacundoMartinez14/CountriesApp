import { React, useState } from "react";
import "./Crear_Actividad.css";
import { useSelector, useDispatch } from "react-redux";
import { search, postActivity, clean } from "../../redux/actions";
import AddCountry from "./AddCountry";
import RemoveCountry from "./RemoveCountry";
import { validateField, validateDuracion } from "../Controllers/Controllers";

export default function CrearActividad() {
  const dispatch = useDispatch();
  //este estado es para saber en cual de las opciones de duracion estoy
  const [value, setValue] = useState({
    duracion: "",
    min: "",
    hs: "",
    days: "",
    search: "",
  });
  const [position, setPosition] = useState("");
  const [error, setError] = useState({});
  const [form, setForm] = useState({
    name: [],
    nombre: "",
    dificultad: "",
    duracion: "",
    temporada: "",
  });
  const filtered = useSelector((state) => state.filtered);
  const addCountry = useSelector((state) => state.addCountry);
  const arr = addCountry.map((e) => e.name);
  const post = useSelector((state) => state.post);
  if (position !== value.duracion) {
    setValue((prev) => ({
      ...prev,
      min: "",
      hs: "",
      days: "",
    }));
    setPosition(value.duracion);
  }
  let duration = "";
  if (value.duracion === "min") {
    duration = `${value.min} minutos.`;
  } else if (value.duracion === "hs") {
    if (value.min === "") {
      duration = `${value.hs}:00 hs.`;
    } else if (value.min > 0 && value.min < 10) {
      duration = `${value.hs}:0${value.min} hs.`;
    } else {
      duration = `${value.hs}:${value.min} hs.`;
    }
  } else if (value.duracion === "days") {
    duration = `${value.days} dias.`;
  }

  const handleClick = (e) => {
    dispatch(clean());
  };
  let handleChange = (e) => {
    e.preventDefault();
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    let objError = validateDuracion({
      ...value,
      [e.target.name]: e.target.value,
    });
    setError(objError);
  };
  const handleSearch = (e) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    dispatch(search(e.target.value));
  };
  const handleInput = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    form.duracion = duration;
    form.name = arr;
    let objError = validateField(form);
    if (objError.field) {
      setError(objError);
    } else {
      dispatch(postActivity(form));
    }
    e.target.reset();
    dispatch(clean());
    setValue((prev) => ({
      ...prev,
      duracion: "",
    }));
    setForm((prev) => ({
      ...prev,
      nombre: "",
    }));
  };
  return (
    <div className="parent-crear">
      <div className="crearActi">
        <form onSubmit={handleSubmit} >
          <div className="nombre-actividad">
            <label htmlFor="name">Nombre de la actividad</label>
            <br />
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleInput}
            />
          </div>
          <br />
          <div className="dificultad">
            <label htmlFor="dificultad">Dificultad</label>
            <br />
            <select
              name="dificultad"
              id="dificultad"
              onChange={handleInput}
              defaultValue={"DEFAULT"}
            >
              <option disabled value="DEFAULT">-</option>
              <option value="1">Principiante</option>
              <option value="2">Amateur</option>
              <option value="3">Intermedio</option>
              <option value="4">Avanzado</option>
              <option value="5">Profesional</option>
            </select>
          </div>
          <br />
          <div className="duracion">
            <label htmlFor="duracion">Duracion </label>
            <br />
              <select
              name="duracion"
              id="duracion"
              onChange={handleChange}
              defaultValue={"DEFAULT"}
            >
              <option disabled value="DEFAULT">
                -
              </option>
              <option value="min">Minutos</option>
              <option value="hs">Horas</option>
              <option value="days">Dias</option>
              </select>
              <br />
            {value.duracion === "min" ? (
              <div className="min">
                <input
                  type="number"
                  name="min"
                  value={value.min}
                  onChange={handleChange}
                />
                <label htmlFor="min">minutos.</label>
                {error.min && (
                  <small className={error.min && "danger"}>{error.min}</small>
                )}
              </div>
            ) : value.duracion === "hs" ? (
              <div className="hs">
                <div>
                  <input
                    type="number"
                    name="hs"
                    value={value.hs}
                    onChange={handleChange}
                  />
                  <label htmlFor="hs">horas</label>
                  {error.hs && (
                    <small className={error.hs && "danger"}>{error.hs}</small>
                  )}
                </div>
                <div>
                  <input
                    type="number"
                    name="min"
                    value={value.min}
                    onChange={handleChange}
                  />
                  <label htmlFor="min">minutos.</label>
                  {error.min && (
                    <small className={error.min && "danger"}>{error.min}</small>
                  )}
                </div>
              </div>
            ) : value.duracion === "days" ? (
              <div className="days">
                <input
                  type="number"
                  name="days"
                  value={value.days}
                  onChange={handleChange}
                />
                <label htmlFor="days">dias.</label>
                {error.days && (
                  <small className={error.days && "danger"}>{error.days}</small>
                )}
              </div>
            ) : null}
          </div>
          <div className="temporada">
            <label htmlFor="temporada">Temporada</label>
            <br />
            <select
              name="temporada"
              id="temporada"
              onChange={handleInput}
              defaultValue={"DEFAULT"}
            >
              <option disabled value="DEFAULT">
                -
              </option>
              <option value="verano">Verano</option>
              <option value="otoño">Otoño</option>
              <option value="invierno">Invierno</option>
              <option value="primavera">Primavera</option>
            </select>
            <br />
            <input type="submit" value="Enviar" />
          </div>
        </form>
        <div >
          {post ? (
            <div >
              <h2 className="post">{post}</h2>
              <h3 className="post">Puedes buscar tu actividad en el filtro de actividades.</h3>
              <br />
              <button onClick={handleClick}>Aceptar</button>
            </div>
          ) : null}
          {error.field && (
            <small className={error.field && "danger"}>{error.field}</small>
          )}
        </div>
      </div>
      <div className="search">
        <div className="search-input">
          <label htmlFor="search">Selecciones los paises </label>
          <input
            type="text"
            name="search"
            id="search"
            onInput={handleSearch}
            placeholder="Buscar..."
            autoComplete="off"
            value={value.buscador}
          />
        </div>
          <div className="addcountry" >
            {value.search
              ? filtered.map((e) => (
                  <AddCountry 
                    key={e.id}
                    id={e.id}
                    name={e.traduccion}
                    flag={e.flag}
                  />
                ))
              : null}
            <br />
          </div>                
      </div>
      <div className="paises_remover">
        <h3>Paises seleccionados</h3>
        <div className="render-removecountries">
        {addCountry
          ? addCountry.map((e) => (
              <RemoveCountry key={e.id} name={e.name} flag={e.flag} />
            ))
          : null}
        </div>
      </div>
    </div>
  );
}
