import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import styled from "styled-components";

const MultiStepProgressBar = ({ page, onPageNumberClick }) => {
  var stepPercentage = 0;
  if (page === "pageone") {
    stepPercentage = 33;
  } else if (page === "pagetwo") {
    stepPercentage = 66;
  } else if (page === "pagethree") {
    stepPercentage = 100;
  }else {
    stepPercentage = 0;
  }

  return (
    <BarWrapper>
        `<ProgressBar percent={stepPercentage}>
        <Step>
            {({ accomplished, index }) => (
            <div
                className={`indexedStep ${accomplished ? "accomplished" : null}`}
                onClick={() => onPageNumberClick("1")}
            >
                {index + 1}
            </div>
            )}
        </Step>
        <Step>
            {({ accomplished, index }) => (
            <div
                className={`indexedStep ${accomplished ? "accomplished" : null}`}
                onClick={() => onPageNumberClick("2")}
            >
                {index + 1}
            </div>
            
            )}
        </Step>
        <Step>
            {({ accomplished, index }) => (
            <div
                className={`indexedStep ${accomplished ? "accomplished" : null}`}
                onClick={() => onPageNumberClick("3")}
            >
                {index + 1}
            </div>
            )}
        </Step>
        </ProgressBar>
    </BarWrapper>
  );
};

const BarWrapper = styled.div`
.indexedStep {
    color: black;
    width: 40px;
    height: 40px;
    font-size: 20px;
    background-color: rgb(255, 255, 255);
    border-radius: 30%;
    border-style: solid;
    border-width: 2px;
    border-color: rgb(176, 172, 172);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.indexedStep.accomplished {
    background-color: #7a13ab;
    color: white;
    font-weight: bold;
    border-style: none;
}

.RSPBprogressBar {
    height: 2px;
    width: 30%;
    line-height: 1;
    border-radius: 10px;
    position: relative;
    background-color: rgb(207, 207, 207);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 0;
    margin: 20px auto;
}

.RSPBprogressBar .RSPBstep {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    z-index: 0;
    position: absolute;
    transform: translateX(-50%);
    transition-property: all;
    transition-timing-function: ease;
}

.RSPBprogressBar .RSPBprogressBarText {
    color: white;
    font-size: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.RSPBprogressBar .RSPBprogression {
    position: absolute;
    transition: width 0.3s ease;
    left: 0;
    top: 0;
    bottom: 0;
    border-radius: 10px;
    background: #be33ff;
    z-index: -1;
}

@media screen and (max-width: 480px) {
    .indexedStep{
        width: 15px;
        height: 15px;
        font-size: 6px;
    }
}`

export default MultiStepProgressBar;
