import React from 'react'

const Loading = () => {
  return (
    <div>
      <div>
        <div className="inner">
          <div className="viewer shadow">
            <div className="inner" style={{ width: "200px", height: " 200px", margin: "0 auto" }}><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: 'auto', display: 'block' }} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
              <g transform="translate(20 50)">
                <circle cx={0} cy={0} r={6} fill="#4f46e5">
                  <animateTransform attributeName="transform" type="scale" begin="-0.375s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite" />
                </circle>
              </g>
              <g transform="translate(40 50)">
                <circle cx={0} cy={0} r={6} fill="#6a62e6">
                  <animateTransform attributeName="transform" type="scale" begin="-0.25s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite" />
                </circle>
              </g>
              <g transform="translate(60 50)">
                <circle cx={0} cy={0} r={6} fill="#a7a4d7">
                  <animateTransform attributeName="transform" type="scale" begin="-0.125s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite" />
                </circle>
              </g>
              <g transform="translate(80 50)">
                <circle cx={0} cy={0} r={6} fill="#bfc2cc">
                  <animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite" />
                </circle>
              </g>
            </svg></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading