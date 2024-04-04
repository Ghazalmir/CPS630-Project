import BlueButton from "../components/general/blueButton";

function ForbiddenPage() {
  return (
    <div className="text-center m-5 p-5">
      <h1>Error <span className="text-warning">403</span>: Forbidden</h1>
      <p className="mb-4">You do not have access to this page. </p>
      <BlueButton text="Go to Home Page" href="/"/>
    </div>
  )
  }

export default ForbiddenPage;