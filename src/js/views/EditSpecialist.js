import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import ClientForm from "../components/ClientForm";
import EditFormSpecialist from "../components/EditFormSpecialist";
import Nabvar from "../components/Nabvar";

const EditSpecialist = () => {
  return (
    <div className="container">
      <Nabvar />
      <div className="container mt-5">
        <h1 className=" text-center">
          Te ayudo... con la edicion de tus datos ?
        </h1>
        <hr />
        <div className="row">
          <div className="col-8">
            <ul className="nav nav-pills nav-fill mb-5">
              <li className="nav-item ">
                <Link className="btn   btn-success mt-5" to="/especialista">
                  Volver a mi perfil{" "}
                </Link>
                {/* <a className="nav-link text-success active-success" href="#">Cliente</a> */}
              </li>
              {/* <li className="nav-item">
              
              </li> */}
            </ul>
            <EditFormSpecialist />
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default EditSpecialist;
