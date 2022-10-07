import React from 'react'

const StartUp = () => {
  return (
    <div className="content__speaking">
      <div className="qustion__content__speaking">
        <h3>
          Are you thirsty?
          <span>
            <i className="fa-solid fa-volume-high"></i>
          </span>
        </h3>
      </div>
      <div className="main__content__spaeking">
        <div className="img__question">
          <img src="https://i.pinimg.com/564x/23/6e/ad/236eadcccca3d08761bdf336d328ec43.jpg" alt="" />
        </div>
        <div className="choose__question">
          <fieldset className="border-t border-b border-gray-200">
            <legend className="sr-only">Notifications</legend>
            <div className="divide-y divide-gray-200">
              <div className="relative flex items-start py-4">
                <div className="min-w-0 flex-1 text-sm">
                  <label htmlFor="comments" className="font-medium text-gray-700">
                    The weather is very nice tonight.
                  </label>
                </div>
                <div className="ml-3 flex h-5 items-center">
                  <i className="fa-solid fa-volume-high mr-3"></i>
                  <input
                    id="comments"
                    aria-describedby="comments-description"
                    name="comments"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="relative flex items-start py-4">
                <div className="min-w-0 flex-1 text-sm">
                  <label htmlFor="candidates" className="font-medium text-gray-700">
                    I'm planning to have a vacation next week.
                  </label>

                </div>
                <div className="ml-3 flex h-5 items-center">
                  <i className="fa-solid fa-volume-high mr-3"></i>
                  <input
                    id="candidates"
                    aria-describedby="candidates-description"
                    name="candidates"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="relative flex items-start py-4">
                <div className="min-w-0 flex-1 text-sm">
                  <label htmlFor="offers" className="font-medium text-gray-700">
                    Not really. Why?
                  </label>

                </div>
                <div className="ml-3 flex h-5 items-center">
                  <i className="fa-solid fa-volume-high mr-3"></i>
                  <input
                    id="offers"
                    aria-describedby="offers-description"
                    name="offers"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="relative flex items-start py-4">
                <div className="min-w-0 flex-1 text-sm">
                  <label htmlFor="offers" className="font-medium text-gray-700">
                    Not really. Why?
                  </label>

                </div>
                <div className="ml-3 flex h-5 items-center">
                  <i className="fa-solid fa-volume-high mr-3"></i>
                  <input
                    id="offers"
                    aria-describedby="offers-description"
                    name="offers"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </fieldset>
        </div>

      </div>
      <div className="answer__question">
        <button >
          Xem kết quả
        </button>
      </div>
    </div>
  )
}

export default StartUp