// components/subscription/StripePaymentModal.tsx
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

// Initialize Stripe
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ""
);

interface PaymentFormProps {
  clientSecret: string;
  onSuccess: () => void;
  onCancel: () => void;
  isSetup?: boolean; // Add this prop
}

const PaymentForm = ({
  clientSecret,
  onSuccess,
  onCancel,
  isSetup,
}: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const card = elements.getElement(CardElement);
    
    if (!card) return;

    try {
      // Check if this is a setup intent or payment intent based on the secret format
      const isSetupIntent = clientSecret.startsWith('seti_') || isSetup;

      if (isSetupIntent) {
        // For setup intents
        const result = await stripe.confirmSetup({
          clientSecret,
          elements,
          redirect: 'if_required'
        });

        if (result.error) {
          setError(result.error.message || 'An error occurred');
          setProcessing(false);
        } else {
          toast({
            title: "Success",
            description: "Payment method added successfully!",
          });
          onSuccess();
        }
      } else {
        // For payment intents (starts with 'pi_')
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
          },
        });

        if (result.error) {
          setError(result.error.message || 'An error occurred');
          setProcessing(false);
        } else {
          toast({
            title: "Success",
            description: "Payment successful!",
          });
          onSuccess();
        }
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('An unexpected error occurred');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card className="p-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </Card>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <div className="flex gap-3 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={processing}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={!stripe || processing}>
          {processing
            ? "Processing..."
            : isSetup
            ? "Add Payment Method"
            : "Pay Now"}
        </Button>
      </div>
    </form>
  );
};

interface StripePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientSecret: string;
  amount: number;
  description: string;
  onSuccess: () => void;
  isSetup?: boolean; // Add this prop
}

export const StripePaymentModal = ({
  isOpen,
  onClose,
  clientSecret,
  amount,
  description,
  onSuccess,
  isSetup = false,
}: StripePaymentModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isSetup ? "Add Payment Method" : "Complete Payment"}
          </DialogTitle>
          <DialogDescription>
            {description} {!isSetup && `- $${amount.toFixed(2)}`}
          </DialogDescription>
        </DialogHeader>

        <Elements stripe={stripePromise}>
          <PaymentForm
            clientSecret={clientSecret}
            onSuccess={onSuccess}
            onCancel={onClose}
            isSetup={isSetup}
          />
        </Elements>
      </DialogContent>
    </Dialog>
  );
};
