import React from "react";
import background from '../assets/faq.jpg';

const Faq = () => {
    const faq = [
        {
            'question': 'is there a time limit for parking?',
            'answer': 'Yes, there is a time limit for parking, which is clearly indicated in the parking area. Overstaying the limit may result in additional fees.'
        },
        {
            'question': 'is there handicap accessible parking available?',
            'answer': 'Yes, there is a time limit for parking, which is clearly indicated in the parking area. Overstaying the limit may result in additional fees.'
        },
        {
            'question': 'what happens if I lose my parking ticket?',
            'answer': 'If you have lost your parking ticket, your charge will be the daily maximum of the facility in which you parked'
        }

    ]
    return (
        <>
            <p className="text-3xl text-center font-bold mt-6">24/7 SERVICE</p>
            <div className="mt-6 p-6 text-white bg-fixed" style={{backgroundImage: `url(${background})`}}>
                <p className="text-4xl text-center mb-6">FAQ</p>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {faq && faq.map((item, index) => {
                        return (
                            <div key={index}>
                                <p className="flex text-l mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         className="w-6 h-6 fill-main mr-3">
                                        <path fillRule="evenodd"
                                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                              clip-rule="evenodd"/>
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
                            className="text-white border border-white hover:border-main hover:text-white hover:bg-main focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2">Contact
                        for more
                    </button>
                </div>
            </div>
        </>
    )
}

export default Faq;