import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();

  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(true);
  const called = useRef(false);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      setMessage("Session ID not found.");
      setLoading(false);
      return;
    }

    if (called.current) {
      return;
    }

    called.current = true;

    axiosSecure
      .patch(`/payment-success?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => {
        setMessage(
          res.data.success
            ? "Payment successful!"
            : "Payment could not be verified.",
        );
      })
      .catch((error) => {
        console.error(error);
        setMessage("Unable to verify payment.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams, axiosSecure]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 p-6">
      <div className="text-5xl">{loading ? "⏳" : "✅"}</div>

      <h2 className="text-2xl font-bold">{message}</h2>

      {!loading && (
        <button
          className="btn btn-primary"
          onClick={() => {
            window.location.href = "/dashboard";
          }}
        >
          Go to Dashboard
        </button>
      )}
    </div>
  );
};

export default PaymentSuccess;
