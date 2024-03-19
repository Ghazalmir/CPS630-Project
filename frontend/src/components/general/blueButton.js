function BlueButton(props) {
  return (
    <a type="button" 
       className="btn btn-primary text-white rounded border-0 p-2 px-4" 
       href={props.href}>
      { props.text }
    </a>
  )
  }

export default BlueButton;