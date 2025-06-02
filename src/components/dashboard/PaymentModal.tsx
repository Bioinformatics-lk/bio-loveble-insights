
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { X, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: string;
  title: string;
  price: number;
}

interface PaymentModalProps {
  course: Course;
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ course, onClose, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Simulate successful payment
      toast({
        title: "Payment Successful",
        description: `You have successfully enrolled in ${course.title}. We will notify you of the course start date via email.`
      });
      
      // Send enrollment email (simulated)
      console.log(`Sending enrollment email for course: ${course.title}`);
      
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Gateway
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">{course.title}</h3>
            <p className="text-2xl font-bold text-green-600">
              LKR {course.price.toLocaleString()}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Cardholder Name</label>
              <Input
                value={paymentData.cardholderName}
                onChange={(e) => setPaymentData({...paymentData, cardholderName: e.target.value})}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Card Number</label>
              <Input
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Expiry Date</label>
                <Input
                  value={paymentData.expiryDate}
                  onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CVV</label>
                <Input
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                  placeholder="123"
                  maxLength={3}
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={handlePayment}
              className="w-full"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay LKR ${course.price.toLocaleString()}`}
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            <p>Powered by PayHere.lk</p>
            <p className="mt-2">
              After payment, you will receive an email: "You Are Enrolled for the {course.title} course. 
              We will notify you of the date and time to start the course via email soon. Please keep in touch."
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentModal;
