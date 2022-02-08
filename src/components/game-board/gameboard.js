import "./gameboard.css"

import { useEffect, useState } from 'react';
import blueCandy from '../../images/blue-candy.png'
import greenCandy from '../../images/green-candy.png'
import orangeCandy from '../../images/orange-candy.png'
import purpleCandy from '../../images/purple-candy.png'
import redCandy from '../../images/red-candy.png'
import yellowCandy from '../../images/yellow-candy.png'
import blank from '../../images/blank.png'


const width = 8
const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
]

const GameBoard = () => {

    const [currentColorArrangement, setCurrentColorArrengment] = useState([])
    const [squareBeingDragged, setsquareBeingDragged] = useState(null)
    const [squareBeingReplaced, setsquareBeingReplaced] = useState(null)
    const [scoreDisplay, setScoreDisplay] = useState(0)
  
    //İlk Dörtlü sutunlardaki eşleşmelere bakıyoruz.------------------------------------------------//
    const checkForColumOfFour = () => {
      for (let i = 0; i <= 39; i++) {
        const columnOfFour = [i, i * width, i + width * 2, i + width * 3]
        const decidedColor = currentColorArrangement[i]
        const isBlank = currentColorArrangement[i] === blank
  
        if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
          setScoreDisplay((score)=> score + 4 )
  
          columnOfFour.forEach(square => currentColorArrangement[square] = blank)
          return true
        }
      }
    }
  
    //İlk dörtlü satırlardaki eşleşmelere bakıyoruz.-------------------------------------------------// 
    const checkForRowOfFour = () => {
      for (let i = 0; i < 64; i++) {
        const rowOfFour = [i, i + 1, i + 2, i + 3]
        const decidedColor = currentColorArrangement[i]
        const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
        const isBlank = currentColorArrangement[i] === blank
  
        if (notValid.includes(i)) continue
  
        if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor  && !isBlank)) {
          setScoreDisplay((score)=> score + 4 )
  
          rowOfFour.forEach(square => currentColorArrangement[square] = blank)
          return true
        }
      }
    }
  
    //İlk üçlü sutunlardaki eşleşmelere bakıyoruz.----------------------------------------------------//
    const checkForColumOfThree = () => {
      for (let i = 0; i <= 47; i++) {
        const columnOfThree = [i, i + width, i + width * 2]
        const decidedColor = currentColorArrangement[i]
        const isBlank = currentColorArrangement[i] === blank
  
        
        if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
          setScoreDisplay((score)=> score + 3 )
  
          columnOfThree.forEach(square => currentColorArrangement[square] = blank)
          return true
        }
      }
  
    }
  
    // İlk üçlü satırlardaki eşleşmelere bakıyoruz.-----------------------------------------------//
    const checkForRowOfThree = () => {
      for (let i = 0; i < 64; i++) {
        const rowOfThree = [i, i + 1, i + 2]
        const decidedColor = currentColorArrangement[i]
        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
        const isBlank = currentColorArrangement[i] === blank
  
        if (notValid.includes(i)) continue
  
        if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor  && !isBlank)) {
          setScoreDisplay((score)=> score + 3 )
  
          rowOfThree.forEach(square => currentColorArrangement[square] = blank)
          return true
        }
      }
    }
  
    // Aşağı hareket ettirmek için..
    const moveIntoSquareBelow = () => {
      for (let i = 0; i <= 55; i++) {
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
        const isFirstRow = firstRow.includes(i)
  
        if (isFirstRow && currentColorArrangement[i] === blank) {
          let randomNumber = Math.floor(Math.random() * candyColors.length)
          currentColorArrangement[i] = candyColors[randomNumber]
        }
  
        if (currentColorArrangement[i + width] === blank) {
          currentColorArrangement[i + width] = currentColorArrangement[i]
          currentColorArrangement[i] = blank
        }
      }
    }
  
    console.log('Skorun:', scoreDisplay)
  
    const dragStart = (e) => {
      setsquareBeingDragged(e.target)
    }
  
    const dragDrop = (e) => {
      setsquareBeingReplaced(e.target)
    }
  
    const dragEnd = () => {
  
      const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('Data-id'))
      const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('Data-id'))
  
      currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
      currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')
  
      const validMoves = [
        squareBeingDraggedId - 1,
        squareBeingDraggedId - width,
        squareBeingDraggedId + 1,
        squareBeingDraggedId + width
      ]
  
      const validMove = validMoves.includes(squareBeingReplacedId)
  
      const isAColumnOfFour = checkForColumOfFour()
      const isARowOfFour = checkForRowOfFour()
      const isAColumnOfTree = checkForColumOfThree()
      const isARowOfThree = checkForRowOfThree()
  
      if (squareBeingReplacedId &&
        validMove &&
        (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfTree)) {
        setsquareBeingDragged(null)
        setsquareBeingReplaced(null)
      } else {
  
        currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
        currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
        setCurrentColorArrengment([...currentColorArrangement])
      }
  
  
    }
  
  
    const createBoard = () => {
      const randomColorArrangment = []
      for (let i = 0; i < width * width; i++) {
        const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
        randomColorArrangment.push(randomColor)
      }
      setCurrentColorArrengment(randomColorArrangment)
    }
  
    // use effect arrayde ekstra süre verilmediği taktirde, boardın  sadece 1 kere render edilmesini sağlıyor.
    useEffect(() => {
      createBoard()
    }, [])
  
  
  
  
    // 100 ms de bir boardın içini kontrol etmek için use effectin içine timer koyuyoruz.
    useEffect(() => {
      const timer = setInterval(() => {
        checkForColumOfFour()
        checkForRowOfFour()
        checkForColumOfThree()
        checkForRowOfThree()
        moveIntoSquareBelow()
  
        setCurrentColorArrengment([...currentColorArrangement])
      }, 100)
      return () => clearInterval(timer)
    }, [checkForColumOfFour,
      checkForRowOfFour, checkForColumOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement])
  
  
    return (
      <div className='app'>
        <div className='score-board'>
        <h2>
           Skor: {scoreDisplay}
          </h2>
         
        </div> 
        <div className='game'>
          {currentColorArrangement.map((candyColors, index) => (
            <img
              key={index}
              src={candyColors}
              alt={candyColors}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          ))}
  
        </div>
      
      </div>
    );
  }
  
  export default GameBoard;
  