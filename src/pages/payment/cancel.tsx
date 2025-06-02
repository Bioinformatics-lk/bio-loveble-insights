import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/integrations/supabase/client';

export default function PaymentCancel() {
  const router = useRouter();
  const { order_id } = router.query;

  useEffect(() => {
    const updateEnrollment = async () => {
      if (order_id) {
        const [userId, courseId] = (order_id as string).split('_');
        
        // Update enrollment status to cancelled
        await supabase
          .from('enrollments')
          .update({
            status: 'cancelled',
            payment_status: 'cancelled'
          })
          .match({ user_id: userId, course_id: courseId });
      }
    };

    updateEnrollment();
    
    // Redirect to dashboard after 5 seconds
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [order_id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-4">
          Your payment was cancelled. You can try enrolling in the course again from the dashboard.
        </p>
        <p className="text-sm text-gray-500">
          Redirecting to dashboard in 5 seconds...
        </p>
      </div>
    </div>
  );
} 