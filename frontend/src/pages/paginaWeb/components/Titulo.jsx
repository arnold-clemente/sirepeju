import '../assets/css/titulo.css';


const Titulo = ({ titulo }) => {
  return (
    <div className='titulo_main'>
        <div className='titulo_content'>
        <h1>{titulo}</h1>
        </div>
    </div>
  )
}

export default Titulo
