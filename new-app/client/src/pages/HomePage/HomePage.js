import { useEffect, useState } from "react";
import phoneService from "../../services/phone.service";
import "./HomePage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import phoneImg1 from '../../images/Galaxy_S7.png'
import phoneImg2 from '../../images/Honor_10.png'
import phoneImg3 from '../../images/IPhone_7.png'
import phoneImg4 from '../../images/Moto_G6.png'
import phoneImg5 from '../../images/Nokia_7.1.jpg'
import phoneImg6 from '../../images/P10_Lite.jpg'
import phoneImg7 from '../../images/Xiaomi_MI_A2.jpeg'
import phoneImg8 from '../../images/ZenPhone_5.jpg'

function HomePage() {
  const [phones, setPhones] = useState([]);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    phoneService.getPhones()
    .then(resp => {
      setPhones(resp.data)
    })
  },[])

  function moreInfo(id){
    setInfo([])
    phoneService.getPhoneInfo(id)
    .then(resp => {
      setInfo(resp.data)
    })
  }

  const arrayImg = [phoneImg3, phoneImg1, phoneImg2, phoneImg6, phoneImg5, phoneImg8, phoneImg7, phoneImg4]

  return (
    <div>
      <h1>Home page</h1>
      <div className="container">
        <div className="row">
          {phones.map((phone, k) => {
            return (
              <div
                className="card col-12"
                style={{ width: "18rem" }}
                key={phone.id}
              >
                <img
                  className="card-img-top"
                  src={arrayImg[k]}
                  alt={phone.id}
                />
                <div className="card-body">
                  <h5 className="card-title">{phone.name}</h5>
                  <button
                    onClick={() => moreInfo(phone.id)}
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    More info!
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* *modal* */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            {info.map((phoneInfo) => {
              return (
                <div className="container" key={phoneInfo.id}>
                  <div className="modal-header">
                    <h5 className="modal-title text-center" id="exampleModalLabel">
                      Know more about our <strong>{phoneInfo.name}</strong>
                    </h5>
                  </div>
                  <div className="modal-body text-left">
                    <p>{phoneInfo.description}</p>
                    <p>Color: {phoneInfo.color}</p>
                    <p>Screen: {phoneInfo.screen}</p>
                    <p>Processor: {phoneInfo.processor}</p>
                    <p>Ram: {phoneInfo.ram}</p>
                    <p>Manufacturer: {phoneInfo.manufacturer}</p>
                    <span>For Only <strong>{phoneInfo.price}$</strong></span>
                  </div>
                </div>
              );
            })}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
              >
                Add to card!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;