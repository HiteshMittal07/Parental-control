import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Axios from "axios";

const Owners = (props) => {
  const [owners, setOwners] = useState([]);
  const { contractRead } = props;

  useEffect(() => {
    const fetchOwnersDetails = async () => {
      const tx = await contractRead.getowners(props.user);
      const ownersWithDetails = await Promise.all(
        tx.map(async (ownerAddress) => {
          const { data } = await Axios.get("https://randomuser.me/api/");
          const details = data.results[0];
          return { ownerAddress, details };
        })
      );
      setOwners(ownersWithDetails);
    };

    contractRead && fetchOwnersDetails();
  }, [contractRead]);

  return (
    <div className="container mt-4">
      <h2 className="text-uppercase mb-3 text-light">Owners</h2>
      <div className="row">
        {owners.map(({ ownerAddress, details }) => (
          <div className="col-md-6 mb-4" key={ownerAddress}>
            <div className="card">
              <img
                src={details.picture?.large} // Use larger images
                className="card-img-top img-fluid rounded"
                alt="Owner"
                style={{ objectFit: "cover", height: "400px" }} // Adjust height
              />
              <div className="card-body">
                <h5 className="card-title">
                  {details.name?.first} {details.name?.last}
                </h5>
                <p className="card-text">
                  <span className="fw-bold text-primary">Address:</span>{" "}
                  {ownerAddress}
                </p>
                <a href="#" className="btn btn-primary">
                  Know More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Owners;
