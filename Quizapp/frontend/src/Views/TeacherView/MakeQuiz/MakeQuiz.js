import { useState,useEffect } from 'react';
import './Makequiz.scss';
import toast, { Toaster } from 'react-hot-toast';
import {useNavigate, useParams } from 'react-router-dom';

const MakeQuiz = () => {

  const navigate = useNavigate();

  //originated when I added update Quiz option in managequiz section
  const [showUpdateQuiz, setShowUpdateQuiz] = useState(false);
  const quizName = useParams().quizID;
  
  //purely making new quiz wala code:
  const [question, setQuestion] = useState({
    desc:'',
    optionOne:'',
    optionTwo:'',
    optionThree:'',
    optionFour:'',
    answer:''
  })

  const [questArr, setQuestArr] = useState([]);
  const [title, setTitle] = useState("");

  const [showSaveBtn, setShowSaveBtn] = useState(true);
  const [updateIDX, setUpdateIDX] = useState(-1);

  function handleChange(event){
    setQuestion(prev => ({
      ...prev,
      [event.target.name]:event.target.value
    }))
  }


  function handleAddQuestion(event){
    event.preventDefault();
    if(question.desc !== '' && question.optionOne !== '' && question.optionTwo !== '' && question.optionThree !== '' && question.optionFour !== '' && question.answer !== ''){
    setQuestArr(prev => ([...prev,question]));
    setQuestion({
                desc:'',
                optionOne:'',
                optionTwo:'',
                optionThree:'',
                optionFour:'',
                answer:''
              })
    toast.success('Question Saved!');
    }else{
      toast.error('Please fill all the fields!');
    }
        
  }

  async function handleSubmit(event){

    if(quizName !== 'new'){
      updateQuiz(event);
      return;
    }

    event.preventDefault();

    let response;
    let quiz = {
      title:title,
      status:false,
      quizBody:questArr
    }
    if(title !== '' && questArr.length !== 0){
      response = await fetch('http://localhost:5000/makequiz',{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(quiz)
      })
      response = await response.json();
      toast.success(response.message);
      setQuestArr([]);
      setTitle('');
      delay(3000);
      navigate('/teacher');
      
    }else{
      toast.error('Did you forget the title? Or the questions?');
    }
  }
  
  
  function deleteQuestion(event){
    const arr = questArr;
    arr.splice(event.target.id,1);
    setQuestArr(arr);
    setQuestion({
      desc:'',
      optionOne:'',
      optionTwo:'',
      optionThree:'',
      optionFour:'',
      answer:''
    })
    setShowSaveBtn(true);
  }
  
  function getUpdateQuestion(event){

    const ix = event.target.id;
    setQuestion({
      desc:questArr[ix].desc,
      optionOne:questArr[ix].optionOne,
      optionTwo:questArr[ix].optionTwo,
      optionThree:questArr[ix].optionThree,
      optionFour:questArr[ix].optionFour,
      answer:questArr[ix].answer
    });
    setShowSaveBtn(false);
    setUpdateIDX(ix);
    window.scrollTo({top:0,behavior:'smooth'});
  }
  
  function updateQuestion(){
    const tempArr = questArr;
    tempArr[updateIDX] = question;
    setQuestArr(tempArr);
    setShowSaveBtn(true);
    toast.success('Question Updated Successfully!')
    setQuestion({
      desc:'',
      optionOne:'',
      optionTwo:'',
      optionThree:'',
      optionFour:'',
      answer:''
    })
   
  }

  function delay(milliseconds){
    return new Promise(
        (resolve) => setTimeout(resolve,milliseconds)
    );
}
  

  async function getQuiz(){
    let quiz = await fetch(`http://localhost:5000/quiz/${quizName}`);
    quiz = await quiz.json();
    setQuestArr(quiz.RequestedQuiz.quizBody);
    setTitle(quiz.RequestedQuiz.title);
    setShowUpdateQuiz(true);
  }
  
  async function updateQuiz(event){
    event.preventDefault();
    let quiz = {
      title:title,
      status:false,
      quizBody:questArr
    }
    let response = await fetch(`http://localhost:5000/quiz/${quizName}`,{
      method:'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(quiz)
    })
    response = await response.json();

    if(response.status === 200){
      toast.success(response.message);
    }else{
      toast.error(response.message);
    }
    await delay(3500);
    setQuestArr([]);
    setTitle('');
    navigate('/teacher');
    

  }

  useEffect(() => {
    if(quizName !== 'new'){
      getQuiz();
    }
  }, [])
  
  

  return (
    <div className='makeQuiz'>
    <div className='quizTitle'>
      <label style={{fontSize:'25px',fontWeight:'bolder',color:'white'}}>Test Title:</label>
      <input disabled={showUpdateQuiz} value={title} onChange={(e) => setTitle(e.target.value)} type='text'></input>
    </div>
      <h1>Add a question to the Test below:</h1>
          <form onSubmit={handleSubmit}>
            <div className='quizQuestion'>
              <label htmlFor='question'>Question</label>
              <textarea name='desc' onChange={handleChange} value={question.desc} style={{marginBottom:'20px'}} rows="7" cols="60"></textarea>
            </div>
            <div className='quizOptions'>
            <div className='quizOption'>
              <label>Option 1</label>
              <input autoComplete='off' name='optionOne' onChange={handleChange} value={question.optionOne} type = 'text'></input>
            </div>
            <div className='quizOption'>
              <label>Option 2</label>
              <input autoComplete='off' name='optionTwo' onChange={handleChange} value={question.optionTwo} type = 'text'></input>
            </div>
            <div className='quizOption'>
              <label>Option 3</label>
              <input autoComplete='off' name='optionThree' onChange={handleChange} value={question.optionThree} type = 'text'></input>
            </div>
            <div className='quizOption'>
              <label>Option 4</label>
              <input autoComplete='off' name='optionFour' onChange={handleChange} value={question.optionFour} type = 'text'></input>
            </div>
            <div className='quizOption'>
              <label>Correct Answer</label>
              <input autoComplete='off' name='answer' onChange={handleChange} value={question.answer} type = 'text'></input>
            </div>
            {showSaveBtn?<button className='addQuestion' onClick={handleAddQuestion} >Save Question</button>:<div className='updateQuestion' onClick={updateQuestion}>Update Question</div>}
            <button className='submit' type='submit'>{showUpdateQuiz?'Update Test':'Create new Test'}</button>
            <Toaster toastOptions={{
                    style:{
                        marginTop:'130px',
                        backgroundColor:'orange',
                        color:'white'
                    }
                }}/>
            </div>
          </form>

          <div className='quizPreview'>
            <h1 style={{textAlign:'center',color:'Brown'}}>Test Preview:</h1>
            <h1 style = {{textAlign:'center',textDecoration:'underline'}}>{title} </h1>
            {questArr.map((quest,idx) => (
              <div key = {idx} className='quizPreviewQuestion'>
              <h2 style={{marginBottom:'0'}}>{idx+1}. {quest.desc} <button id={idx} onClick={deleteQuestion} className='delbtn'>Delete</button><button onClick={getUpdateQuestion} id = {idx} className = 'updatebtn'>Update</button></h2><br/>
              <p style={{marginTop:'0',backgroundColor:quest.optionOne === quest.answer?'#90EE90':''}}>a) {quest.optionOne}</p>
              <p style = {{backgroundColor:quest.optionTwo === quest.answer?'#90EE90':''}}>b) {quest.optionTwo}</p>
              <p style = {{backgroundColor:quest.optionThree === quest.answer?'#90EE90':''}}>c) {quest.optionThree}</p>
              <p style = {{backgroundColor:quest.optionFour === quest.answer?'#90EE90':''}}>d) {quest.optionFour}</p>
              </div>
            ))}
          </div>
    </div>
  )
}

export default MakeQuiz