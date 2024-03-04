import Carousel from "../../components/carousel/carousel";
import BlueButton from "../../components/general/blueButton";
import AvailabilityStatus from "../../components/general/availabilityStatus";

function AdDetails() {
  return (
    <div className="mx-5">
      <div className="row align-items-around my-5">
        <span className="col"> 
          <span className="text-muted">Category / </span>
          <span className="fw-bolder">Subcategory</span>
        </span>
        <span className="col text-end">Back</span>
      </div>
      <div className="container text-center mt-5">
        <div className="row align-items-around">
          <div className="col col-12 col-sm-6">
          <Carousel 
            items={[
              {img: '../../logo512.png', alt: 'logo1', id: 1},
              {img: '../../logo512.png', alt: 'logo2', id: 2},
              {img: '../../logo512.png', alt: 'logo3', id: 3},
            ]
            }
          
          />
          </div>
          <div className="col col-12 col-sm-6 text-start">
            <h2 className="col col-12 col-sm-6 inline-block">Title
              <AvailabilityStatus available={false}/>

            </h2>
            <h6 className="text-blue">Location</h6>
            <h4 className="fw-normal">price</h4>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus modi necessitatibus iusto beatae ipsam voluptates aliquid, perspiciatis consequuntur facilis obcaecati nemo delectus voluptate eius sunt labore voluptas optio, unde consequatur.</p>
            <BlueButton href="/message/id" text="Message Sender" />


          </div>
        </div>
      </div>
    </div>
  );
}

export default AdDetails;