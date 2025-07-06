import { useState, useCallback, useEffect, useRef, use } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [specialCharactersAllowed, setSpecialCharactersAllowed] = useState(false)
  const [uppercaseAllowed, setUppercaseAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)


  const generatePassword = useCallback(() => {
    let pass = ''
    let srt = 'abcdefghijklmnopqrstuvwxyz'
    if (uppercaseAllowed) {
      srt += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }
    if (numberAllowed) {
      srt += '0123456789'
    }
    if (specialCharactersAllowed) {
      srt += '!@#$%^&*()_+[]{}|;:,.<>?'
    }

    for(let i = 0; i <= length; i++) {
      let randomIndex = Math.floor(Math.random() * srt.length + 1)
      pass += srt[randomIndex]
    }
    setPassword(pass)

  } , [length, numberAllowed, specialCharactersAllowed, uppercaseAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999999); // For mobile devices
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {generatePassword()}, [length, numberAllowed, specialCharactersAllowed, uppercaseAllowed, generatePassword])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 ">
        <h1 className="text-white text-center my-1 py-3">Password Generator</h1>
        <div className="flex shadow-md rounded-lg overflow-hidden mb-4">
          <input 
          type="text"
          value={password}
          className='outline-none w-full px-3 my-4 py-1 bg-white'
          placeholder='Generated Password'
          readOnly
          ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClipboard}
          className="outline-nome bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
            type="range" 
            min={6}
            max={20}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input 
              type="checkbox" 
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input 
              type="checkbox" 
              defaultChecked={specialCharactersAllowed}
              id='specialChar'
              onChange={() => {
                setSpecialCharactersAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="specialChar">Special Char</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input 
              type="checkbox" 
              defaultChecked={uppercaseAllowed}
              id='upperCase'
              onChange={() => {
                setUppercaseAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="upperCase">UpperCase</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
