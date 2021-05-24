import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import {useParams} from "react-router-dom";
import comunasList2 from "../utils/communesFile"
import comunasList from "../utils/comunasObj"
import specialties from "../utils/specialties"



const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
const phonereg = /^(56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/;




const EditFormSpecialist = () => {

  const listaComunas = comunasList2.map((comuna, index) =>
  <option value={comuna}>{comuna}</option>
)

  const userProfile = 
    localStorage.getItem('loginUser')?
    JSON.parse(localStorage.getItem('loginUser')):{};

  let id = userProfile.user? userProfile.user.id :'';

    const formik = useFormik({
      
        initialValues: { 
          phoneNumber: userProfile.user? userProfile.user.phone :'',
          adress: userProfile.user? userProfile.user.address :'',
          comuna: userProfile.user? userProfile.user.name_commune :'',
          password: "",
          confirmPassword: "",
          secretQuestion: userProfile.user? userProfile.profile.question :'',
          secretAswer: userProfile.user? userProfile.profile.answer :'',
          specialty: userProfile.user? userProfile.profile.name_specialty :[],
          attentionComunes: userProfile.user? userProfile.profile.communes :[],
          skills: userProfile.user? userProfile.profile.experience :'',
        },
    
        validationSchema: Yup.object().shape({
    
            phoneNumber: Yup.string().required("se requiere el telefono")
            .matches(phonereg,"ingrese un formato de numero valido"),
    
          adress: Yup.string()
            .required("se requiere la direccion")
            .min(5, " direccion debe ser mayor 5 caracteres")
            .max(30, "direccion  debe ser 30 caracteres maximo"),
    
          comuna: Yup.string().required("se requiere la comuna"),
    
          password: Yup.string()
            .required("se requiere la contraseña")
            .matches(lowercaseRegex, "se requiere almenos una minuscula")
            .matches(uppercaseRegex, "se requiere almenos una mayuscula")
            .matches(numericRegex, "se requiere almenos un numero")
            .min(4, "contraseña muy corta , minimo 4 caracteres")
            .max(10, "la contraseña  debe ser 30 caracteres maximo"),
    
          confirmPassword: Yup.string()
    
            .oneOf([Yup.ref("password")], "la contraseña debe coincidir")
            .required("se requiere confirmar contraseña"),
    
          secretQuestion: Yup.string()
            .required("se requiere el la pregunta secreta")
            .max(60, "pregunta  debe ser 60 caracteres maximo"),
          secretAswer: Yup.string()
            .required("se requiere la respuesta secreta")
            .max(30, "respuesta  debe ser 30 caracteres maximo"),

            // specialty: Yup.string()
            // .required("se requiere la especialidad"),
    
            // attentionComunes: Yup.string("se requiere almenos una comuna de atencion")
            // .required(),
    
            skills: Yup.string()
            .required("se requiere  la experiencia"),

        }),
    
        onSubmit: (values) => {
          // alert(JSON.stringify(values, null, 2));
          const profile_user = {
            headers: {'Content-Type' :'Application/json'},  
            body: JSON.stringify({
              
              "phone" : values.phoneNumber,
              "address" : values.adress,
              "name_commune" : values.comuna,
              "password" : values.password,
              "role" : "specialist",
              "question": values.secretQuestion,
              "answer": values.secretAswer,
              "experience": values.skills,
              "name_specialty": values.specialty.map(item => item.value),
              "communes": values.attentionComunes.map(item => item.value)
            }),
            method: "PUT"
            }      
          fetch("http://127.0.0.1:5000/user/profile/" + id, profile_user)
            .then(respuesta => respuesta.json())
            .then(data => console.log(data))  
            .catch(error => console.error(error))      
            alert(JSON.stringify(values, null, 2));
    
        },
      });
    
      return (
        <div>
          <form onSubmit={formik.handleSubmit}>  
    
            <label htmlFor="phoneNumber">Telefono</label>
            <input
              className="form-control mb-3"
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              placeholder="56912345678"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
            />
    
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="text-danger">{formik.errors.phoneNumber}</div>
            ) : null}
    
            <label htmlFor="adress">Direccion</label>
            <input
              className="form-control mb-3"
              id="adress"
              name="adress"
              type="text"
              placeholder="Av las acacias nro 74"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.adress}
            />
    
            {formik.touched.adress && formik.errors.adress ? (
              <div className="text-danger">{formik.errors.adress}</div>
            ) : null}
    
            <label htmlFor="comuna">Comuna</label>
            <select
              className="form-control mb-3"
              id="comuna"
              name="comuna"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.comuna}
            >
              <option selected>Elija una comuna</option>
              {listaComunas}
            </select>
    
            {formik.touched.comuna && formik.errors.comuna ? (
              <div className="text-danger">{formik.errors.comuna}</div>
            ) : null}
    
            <label htmlFor="password">Contraseña</label>
            <input
              className="form-control mb-3"
              id="password"
              name="password"
              type="password"
              placeholder="********"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
    
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}
    
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              className="form-control mb-3"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="********"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
    
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-danger">{formik.errors.confirmPassword}</div>
            ) : null}
    
            <label htmlFor="secretQuestion">Pregunta secreta</label>
            <input
              className="form-control mb-3"
              id="secretQuestion"
              name="secretQuestion"
              type="text"
              placeholder="Comida favorita "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.secretQuestion}
            />
    
            {formik.touched.secretQuestion && formik.errors.secretQuestion ? (
              <div className="text-danger">{formik.errors.secretQuestion}</div>
            ) : null}
    
            <label htmlFor="secretAswer">Respuesta secreta</label>
            <input
              className="form-control mb-3"
              id="secretAswer"
              name="secretAswer"
              type="text"
              placeholder="pizza sin piña"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.secretAswer}
            />
    
            {formik.touched.secretAswer && formik.errors.secretAswer ? (
              <div className="text-danger"> {formik.errors.secretAswer}</div>
            ) : null}


        <label htmlFor="specialty">Especialidad</label>
        <Select
          isMulti
          className="basic-multi-select mb-3"
          id="specialty"
          name="specialty"
          options = {specialties}
          onChange = {e => (formik.setFieldValue("specialty", e))}
          value = {formik.values.specialty}
          
          
        />

        {formik.touched.specialty && formik.errors.specialty ? (
          <div className="text-danger"> {formik.errors.specialty}</div>
        ) : null}

        <label htmlFor="attentionComune">Comunas que atiende</label>

        <Select
          isMulti
          options={comunasList}
          className="basic-multi-select mb-3"
          classNamePrefix="select"
          name="attentionComunes" 
          onChange = {e =>  ( formik.setFieldValue("attentionComunes", e))}
          value= {formik.values.attentionComunes}
     

        />

        {formik.touched.attentionComune && formik.errors.sattentionComune ? (
          <div className="text-danger"> {formik.errors.attentionComune}</div>
        ) : null}

        <label htmlFor="skills">Experiencia</label>
        <select
          className="form-control mb-3"
          id="skills"
          name="skills"
          aria-label="With textarea"
          placeholder="Para agregar un resumen de experiencia del especialista."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.skills}
        >
           <option selected>seleccione su experiencia</option>

          <option value="menos de 1 año">menos de 1 año</option>
          <option value="mas de 1 año">mas de 1 año</option>
          <option value="mas de 2 años">mas de 2 años</option>
          <option value="mas de 3 años">mas de 3 años</option>
          <option value="mas de 4 años">mas de 4 años</option>
          <option value="mas de 5 años">mas de 5 años</option>
          <option value="mas de 6 años">mas de 6 años</option>
          <option value="mas de 7 años">mas de 7 años</option>
          <option value="mas de 8 años">mas de 8 años</option>

        </select>

        {formik.touched.skills && formik.errors.skills ? (
          <div className="text-danger"> {formik.errors.skills}</div>
        ) : null}
    
            <button type="submit" className="btn btn-danger    text-white">
              Editar
            </button>
          </form>
        </div>
      );
};

export default EditFormSpecialist
