import {useState} from 'react' 
import { FaStar } from "react-icons/fa";
import styled from 'styled-components';

const AddReview = ({onAdd}) => {
  const [username,setUsername]=useState('')
  const [rating, setRating] = useState(0);
  
  const [text,setText]=useState('')
  const [reminder,setReminder]=useState(false)
  

  const Rating = () => {
    //return (
      <Container>
        {[...Array(5)].map((item, index) => {
          const givenRating = index + 1;
          return (
            <label>
              <Radio
                type="radio"
                value={givenRating}
                onClick={() => {
                  setRating(givenRating);
                  alert(`Are you sure you want to give ${givenRating} stars ?`);
                }}
              />
              <Rating>
                <FaStar
                  color={
                    givenRating < rating || givenRating === rating
                      ? "000"
                      : "rgb(192,192,192)"
                  }
                />
              </Rating>
            </label>
          );
        })}
      </Container>
    //);
  };

  const onSubmit=(e)=>{
    e.preventDefault()

    if(!text){
      alert('Please add a review')
      return
    }
    onAdd({username,rating,text,reminder})

    setUsername('')
    setRating(0)
    setText('')
    setReminder(false)
  }

  return (
    <form className = 'add-form' onSubmit={onSubmit}>
        
        <div className = 'form-control'>
            <Rating />
            <label>Review</label>
            <input type = 'text' placeholder='Add Review'
              value = {text} 
              onChange = {(e)=>setText(e.target.value)}
            />
        </div>

        <input type ='submit' value='Save Review'
        className='btn btn-block'/>
      
    </form>
  )
}
export const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
min-height: 60vh;
font-size: 60px;
`
export const Radio = styled.input`
display: none;
`
export const Rating = styled.div`
cursor: pointer;
`
export default AddReview