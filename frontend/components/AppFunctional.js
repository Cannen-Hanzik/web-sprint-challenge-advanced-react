import React, { useState, useEffect} from 'react';
import axios from 'axios';

export default function AppFunctional(props) {
  const [count, setCount] = useState(0);
  const [vert, setVert] = useState(2);
  const [hoz, setHoz] = useState(2);
  const [moveError, setMoveError] = useState('');
  const [email, setEmail] = useState('');

  const upwards = () => {
    vert > 1 ?
    (  setVert(prev => prev - 1),
       setCount(prev => prev + 1),
       setMoveError(''))
       : setMoveError("You can't go up");
  }

  const downwards = () => {
    vert < 3 ?
    ( setVert(prev => prev + 1),
      setCount(prev => prev + 1),
      setMoveError(''))
      : setMoveError("You can't go down");
  }

  const goLeft = () => {
    hoz > 1 ?
    ( setHoz(prev => prev - 1),
      setCount(prev => prev + 1),
      setMoveError(''))
      : setMoveError("You can't go left");
  }

  const goRight = () => {
    hoz < 3 ?
    ( setHoz(prev => prev + 1),
      setCount(prev => prev + 1),
      setMoveError(''))
      : setMoveError("You can't go right");
  }
  
  const resetter = () => {
    setCount(0);
    setVert(2);
    setHoz(2);
    setMoveError('');
    setEmail('');
  }

  const postSubmission = newSub => {
    axios.post('http://localhost:9000/api/result', newSub)
      .then(res => {
        setMoveError(res.data.message)
      })
      .catch(err => setMoveError(err.response.data.message))
  }

  const formSubmission = evt => {
    const newSub = {
      x: hoz,
      y: vert,
      steps: count,
      email: email.trim(),
    }
    postSubmission(newSub);
    evt.preventDefault();
    setEmail('');
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({hoz}, {vert})</h3>
        <h3 id="steps">You moved {count} {count === 1? 'time' : 'times'}</h3>
      </div>
      <div id="grid">
        <div className={hoz === 1 && vert === 1 ? 'square active': 'square'}>
          { hoz === 1 & vert === 1 ? 'B': '' }
        </div>
        <div className={ hoz === 2 && vert === 1 ? 'square active': 'square' }>
          { hoz === 2 & vert === 1 ? 'B': '' }
        </div>
        <div className={ hoz === 3 && vert === 1 ? 'square active': 'square' }>
          { hoz === 3 & vert === 1 ? 'B': '' }
        </div>
        <div className={ hoz === 1 && vert === 2 ? 'square active': 'square' }>
          { hoz === 1 & vert === 2 ? 'B': '' }
        </div>
        <div className={ hoz === 2 && vert === 2 ? 'square active': 'square' }>
          { hoz === 2 & vert === 2 ? 'B': '' }
        </div>
        <div className={ hoz === 3 && vert === 2 ? 'square active': 'square' }>
          { hoz === 3 & vert === 2 ? 'B': '' }
        </div>
        <div className={ hoz === 1 && vert === 3 ? 'square active': 'square' }>
          { hoz === 1 & vert === 3 ? 'B': '' }
        </div>
        <div className={ hoz === 2 && vert === 3 ? 'square active': 'square' }>
          { hoz === 2 & vert === 3 ? 'B': '' }
        </div>
        <div className={ hoz === 3 && vert === 3 ? 'square active': 'square' }>
          { hoz === 3 & vert === 3 ? 'B': '' }
        </div>
      </div>
      <div className="info">
        <h3 id="message">{moveError}</h3>
      </div>
      <div id="keypad">
        <button onClick={goLeft} id='left'>LEFT</button>
        <button onClick={upwards} id="up">UP</button>
        <button onClick={goRight} id="right">RIGHT</button>
        <button onClick={downwards} id="down">DOWN</button>
        <button onClick={resetter} id="reset">reset</button>
      </div>
      <form>
        <input 
          id="email"
          value={email}
          onChange={evt => setEmail(evt.target.value)} 
          type="email" 
          placeholder="type email">
        </input>
        <input id="submit" onClick={formSubmission} type="submit"></input>
      </form>
    </div>
  )
}
