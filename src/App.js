import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";

/**
 * Replace with your real API call:
 * fetch('/api/transaction-status') -> { received: boolean }
 */
async function checkTransactionStatus() {
  // TODO: replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => resolve({ received: true }), 5000);
  });
}

/**
 * Replace with your real API call:
 * fetch('/api/partner-number') -> { partnerNumber: number }
 */
async function fetchPartnerNumber() {
  // TODO: replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => resolve({ partnerNumber: 402 }), 1000);
  });
}

export default function App() {
  const [isWaiting, setIsWaiting] = useState(true);
  const [partnerNum, setPartnerNum] = useState(null);

  useEffect(() => {
    let intervalId;

    async function poll() {
      try {
        const { received } = await checkTransactionStatus();
        if (received) {
          clearInterval(intervalId);
          const { partnerNumber } = await fetchPartnerNumber();
          setPartnerNum(partnerNumber);
          setIsWaiting(false);
          confetti({ spread: 90, particleCount: 300, origin: { y: 0.6 } });
        }
      } catch (error) {
        console.error("Error polling transaction:", error);
      }
    }

    poll();
    intervalId = setInterval(poll, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="investin-container">
      <div className="investin-box">
        <img
          src="https://framerusercontent.com/images/I73t7JARx5ZqFFgbf5DNFzBC0.png?scale-down-to=512"
          alt="Java Times Caffé Logo"
          className="logo"
        />

        {isWaiting ? (
          <>
            <h1 className="title">Waiting for your investment...</h1>
            <p className="subtitle">Processing your Java 300 contribution.</p>
            <div className="loader" />
          </>
        ) : (
          <>
            <h1 className="title success">Congratulations!</h1>
            <p className="subtitle">
              You are partner <span className="number">#{partnerNum}</span>
            </p>
            <div className="coffee-sticker">
              <video
                src="https://media.giphy.com/media/WaJtbccJdU2LLJKjUh/giphy.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="sticker-video"
                onClick={() => confetti({ spread: 60, particleCount: 150 })}
              />
            </div>
            <button
              className="view-button"
              onClick={() => {
                // TODO: replace with your wallet URL or navigation logic
                window.location.href = "/wallet";
              }}
            >
              View My Contribution
            </button>
          </>
        )}
      </div>
    </div>
  );
}
