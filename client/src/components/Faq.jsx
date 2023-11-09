import React, { useState, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import background from '../assets/faq.jpg'
import axios from 'axios'
import { toast } from 'react-toastify'

const Faq = () => {
  const [isActive, setIsActive] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
const [subject, setSubject] = useState("")
  const [message, setMessage] = useState('')
  const [validation, setValidation] = useState({})
  const captchaRef = useRef(null)

  const onSubmit = (e) => {
    e.preventDefault()
    const token = captchaRef.current.getValue()
    captchaRef.current.reset()
    axios.post('http://localhost:8000/api/contact', {
      firstName,
      lastName,
      email,
      subject,
      message,
      token,
    }).then((res) => {
      resetForm();

      toast.success('Message sent successfully!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: 'colored',
      })
    }).catch((err) => setValidation(err.response.data.errors))
  }

  const resetForm = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setSubject('')
    setMessage('')
    setValidation({})
  }

  const faq = [
    {
      'question': 'is there a time limit for parking?',
      'answer': 'Yes, there is a time limit for parking, which is clearly indicated in the parking area. Overstaying the limit may result in additional fees.',
    },
    {
      'question': 'is there handicap accessible parking available?',
      'answer': 'Yes, there is a time limit for parking, which is clearly indicated in the parking area. Overstaying the limit may result in additional fees.',
    },
    {
      'question': 'what happens if I lose my parking ticket?',
      'answer': 'If you have lost your parking ticket, your charge will be the daily maximum of the facility in which you parked',
    },

  ]
  return (
    <>
      <p className="text-3xl text-center font-bold mt-6">24/7 SERVICE</p>
      <div className="mt-6 p-6 text-white bg-fixed"
           style={{ backgroundImage: `url(${background})` }}>
        <p className="text-4xl text-center mb-6">FAQ</p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {faq && faq.map((item, index) => {
            return (
              <div key={index}>
                <p className="flex text-l mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                       fill="currentColor"
                       className="w-6 h-6 fill-main mr-3">
                    <path fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                          clipRule="evenodd"/>
                  </svg>
                  {item.question.toUpperCase()}
                </p>
                <p>{item.answer}</p>
              </div>
            )
          })}
        </div>
        <div className="text-center mt-6">
          <button type="button"
                  onClick={() => setIsActive(true)}
                  className="text-white border border-white hover:border-main hover:text-white hover:bg-main focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2">Contact
            for more
          </button>

          <div
            className={!isActive
              ? 'hidden'
              : 'flex items-center justify-center' +
              ' bg-gray-700/50 fixed top-0 left-0 right-0 z-[99999] w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full'}>
            <div className="relative w-full max-w-md max-h-full">

              <div
                className="relative bg-white rounded-lg shadow">
                <button type="button"
                        onClick={() => {
                          setIsActive(false)
                          resetForm();
                        }}
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
                  <svg className="w-3 h-3"
                       xmlns="http://www.w3.org/2000/svg"
                       fill="none"
                       viewBox="0 0 14 14">
                    <path stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="px-6 py-6 lg:px-8">
                  <h3
                    className="mb-4 text-xl font-medium text-gray-900">Contact
                    for more</h3>
                  <form className="space-y-6" onSubmit={onSubmit}>
                    <div>
                      <label htmlFor="firstName"
                             className="block mb-2 text-sm font-medium text-gray-900">First
                        Name</label>
                      <input type="text"
                             name="firstName"
                             id="firstName"
                             value={firstName}
                             onChange={(e) => setFirstName(e.target.value)}
                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main w-full p-2.5"
                      />
                      {validation.firstName ? (
                        <p className="text-sm text-red-600 font-bold">
                          {validation.firstName.message}
                        </p>
                      ) : (
                        ''
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName"
                             className="block mb-2 text-sm font-medium text-gray-900">Last
                        Name</label>
                      <input type="text"
                             name="lastName"
                             id="lastName"
                             value={lastName}
                             onChange={(e) => setLastName(e.target.value)}
                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
                      />
                      {validation.lastName ? (
                        <p className="text-sm text-red-600 font-bold">
                          {validation.lastName.message}
                        </p>
                      ) : (
                        ''
                      )}
                    </div>
                    <div>
                      <label htmlFor="email"
                             className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                      <input type="email"
                             name="email"
                             id="email"
                             value={email}
                             onChange={(e) => setEmail(e.target.value)}
                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
                      />
                      {validation.email ? (
                        <p className="text-sm text-red-600 font-bold">
                          {validation.email.message}
                        </p>
                      ) : (
                        ''
                      )}
                    </div>
                    <div>
                    <label htmlFor="subject"
                           className="block mb-2 text-sm font-medium text-gray-900">Subject</label>
                    <input type="text"
                           name="subject"
                           id="subject"
                           value={subject}
                           onChange={(e) => setSubject(e.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
                    />
                    {validation.subject ? (
                      <p className="text-sm text-red-600 font-bold">
                        {validation.subject.message}
                      </p>
                    ) : (
                      ''
                    )}
                </div>
                    <div>
                      <label htmlFor="message"
                             className="block mb-2 text-sm font-medium text-gray-900">Message</label>

                      <textarea id="message"
                                rows="4"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5">

                                    </textarea>
                      {validation.message ? (
                        <p className="text-sm text-red-600 font-bold">
                          {validation.message.message}
                        </p>
                      ) : (
                        ''
                      )}
                    </div>
                    <div>
                      <ReCAPTCHA
                        size="normal"
                        sitekey={import.meta.env.VITE_RECAPTCHA_KEY}
                        ref={captchaRef}
                      />
                      {validation.token ? (
                        <p className="text-sm text-red-600 font-bold">
                          {validation.token.message}
                        </p>
                      ) : (
                        ''
                      )}
                    </div>

                    <button type="submit"
                            className="w-full text-white bg-main hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Faq