import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router";

import Btn from "../../UI/Buttons/Btn";
import { visitor } from "../../../Types/visitor";

import "./VisitForm.css";
import { uploadVisitor } from "../../../Firebase/firebaseApi";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../UI/Toast/Toast";
import { es } from "date-fns/locale";
import { AppState } from "../../../Redux/Reducers";
import Chip from "../../UI/Chip/Chip";

interface VisitFormProps {}

const VisitForm: React.FC<VisitFormProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector<AppState, AppState["currentUser"]>(
    (state) => state.currentUser
  );

  //toast manage
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("default msg");

  const [date, setDate] = React.useState<Date | null>(null);
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [idType, setIdType] = React.useState("");
  const [id, setId] = React.useState("");

  const goBack = () => () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    if (validateData()) {
      setIsUploading(true);

      let dateParse = parseInt((date!.getTime() / 1000).toFixed(0));

      const visitor: visitor = {
        id: "",
        userId: currentUser.id,
        name: name,
        lastname: surname,
        date: dateParse,
        ccType: idType,
        cc: ~~id,
      };

      console.log(visitor);

      uploadVisitor(visitor, currentUser.condominiumId, dispatch).then(() => {
        navigate("/Visitas", { state: { reload: true } });
      });
    }
  };

  const validateData = () => {
    if (name === "") {
      setErrorMsg("Falta el nombre del visitante");
      setError(true);
      return false;
    } else if (surname === "") {
      setErrorMsg("Falta el apellido del visitante");
      setError(true);
      return false;
    } else if (idType === "") {
      setErrorMsg("Falta el tipo de identificación del visitante");
      setError(true);
      return false;
    } else if (id === "") {
      setErrorMsg("Falta el numero de identificación del visitante");
      setError(true);
      return false;
    } else if (date === null) {
      setErrorMsg("Falta la fecha de visita");
      setError(true);
      return false;
    } else {
      return true;
    }
  };

  return (
    <article className="visitForm">
      {isUploading ? (
        <Toast
          text="Subiendo la información del visitante, por favor espera"
          type="success"
        />
      ) : (
        ""
      )}

      {error ? (
        <Toast
          text={errorMsg}
          type="error"
          btn
          closeAction={() => {
            setError(false);
          }}
        />
      ) : (
        ""
      )}

      <Chip text="Visitas" />
      <h1>Información del visitante</h1>
      <p>Por favor, llena los siguientes campos</p>
      <div className="scroll scroll--h">
        <div className="scroll__column visitForm__column">
          <TextField
            label="Nombre"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />

          <TextField
            label="Apellido"
            onChange={(event) => {
              setSurname(event.target.value);
            }}
          />

          <FormControl>
            <InputLabel id="selectId-label">Tipo de Documento</InputLabel>
            <Select
              value={idType}
              labelId="selectId-label"
              id="selectId"
              //displayEmpty
              //renderValue={(v) => (v !== "" ? v : "Tipo de Documento")}
              defaultValue="none"
              onChange={(event) => {
                setIdType(event.target.value);
              }}
            >
              <MenuItem value={"Tarjeta de Identidad"}>
                Tarjeta de Identidad
              </MenuItem>
              <MenuItem value={"Cédula de Ciudadanía"}>
                Cédula de Ciudadanía
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="N° de Documento"
            type="number"
            onChange={(event) => {
              setId(event.target.value);
            }}
          />

          <h2>Fecha de visita</h2>
          <LocalizationProvider
            locale={es}
            dateAdapter={AdapterDateFns}
            style={{
              width: "100%",
            }}
          >
            <MobileDatePicker
              label="Fecha de la visita"
              minDate={new Date()}
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  placeholder="mm/dd/aaaa"
                  style={{
                    width: "100%",
                    borderRadius: "16px",
                  }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>

          <Btn
            text={"Confirmar"}
            variant=""
            margin="16px"
            action={handleSubmit}
          />
        </div>
      </div>
    </article>
  );
};

export default VisitForm;
