import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Schema for payment and banking details validation
const PaymentDetailsSchema = z.object({
  upiId: z.string().min(1, "UPI ID is required"),
  accountName: z.string().min(2, "Account name is required"),
  bankName: z.string().min(2, "Bank name is required"),
  accountNumber: z.string().min(9, "Valid account number is required"),
  ifscCode: z.string(),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  consentCommunication: z.boolean().refine(val => val === true, {
    message: "Communication consent is required",
  }),
});

const PaymentDetailsForm = ({ initialData, onSubmit, onPrevious, isLoading }) => {
  const form = useForm({
    resolver: zodResolver(PaymentDetailsSchema),
    defaultValues: initialData || {
      upiId: "",
      accountName: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      agreeTerms: false,
      consentCommunication: false
    }
  });

  const handleSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <h3 className="text-lg font-medium mb-2">Payment & Banking Details</h3>
        
        <FormField
          control={form.control}
          name="upiId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UPI ID (For commission payouts)</FormLabel>
              <FormControl>
                <Input className="bg-white shadow-none" placeholder="yourname@upi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3 p-3 bg-gray-50 rounded-md">
          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Holder Name</FormLabel>
                <FormControl>
                  <Input className="bg-white shadow-none" placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input className="bg-white shadow-none" placeholder="State Bank of India" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input type="text" className="bg-white shadow-none" placeholder="123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ifscCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IFSC Code</FormLabel>
                  <FormControl>
                    <Input className="bg-white shadow-none" placeholder="SBIN0123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-3 mt-2">
          <FormField
            control={form.control}
            name="agreeTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    id="terms"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <label htmlFor="terms" className="text-sm font-medium">
                    I agree to the <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a>
                  </label>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="consentCommunication"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    id="communication"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <label htmlFor="communication" className="text-sm font-medium">
                    I consent to receive communication via WhatsApp, Email, and SMS
                  </label>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* Google reCAPTCHA Placeholder */}
        <div className="w-full h-16 bg-gray-100 rounded-md flex items-center justify-center mt-2">
          <p className="text-gray-500 text-sm">reCAPTCHA will be displayed here</p>
        </div>

        <div className="flex justify-between gap-3 mt-4">
          <Button 
            type="button" 
            variant="outline" 
            className="w-1/2" 
            onClick={onPrevious}
          >
            Previous
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-1/2"
          >
            {isLoading ? "Submitting..." : "Complete Registration"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaymentDetailsForm;