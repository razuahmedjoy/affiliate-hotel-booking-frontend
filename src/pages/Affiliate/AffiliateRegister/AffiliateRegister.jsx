import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AffiliateRegisterImage from "@/assets/imgs/affiliate.png";
import { Link, useNavigate } from "react-router";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";
import useLoaderStore from "@/store/loaderStore";
import { navigateBasedOnRole } from "@/lib/utils";
import PersonalInfoForm from "./PersonalInfoForm";
import AddressBusinessForm from "./AddressBusinessForm";
import PaymentDetailsForm from "./PaymentDetailsForm";
import { useRegisterAffiliate } from "@/services/authService";

const AffiliateRegister = () => {
    const { login, user, isAuthenticated, token, role } = useAuthStore();


    const { isLoading } = useLoaderStore();
    const navigate = useNavigate();



    const { mutateAsync: registerAffiliate } = useRegisterAffiliate()


    // State to track current step
    const [currentStep, setCurrentStep] = useState(1);

    // State to store form data across steps
    const [formData, setFormData] = useState({
        // Personal Info
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        phone: "",
        whatsappNumber: "",
        email: "",
        password: "",

        // Address & Business
        street: "",
        city: "",
        state: "",
        country: "India",
        zipCode: "",
        affiliateType: "Individual",
        businessName: "",
        socialMediaLinks: "",
        gstNumber: "",
        promotionMethod: [],

        // Payment Details
        upiId: "",
        accountName: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        agreeTerms: false,
        consentCommunication: false
    });

    // Handle form data changes
    const updateFormData = (stepData) => {
        setFormData(prev => ({ ...prev, ...stepData }));
    };

    // Handle next step
    const handleNext = (stepData) => {
        updateFormData(stepData);
        setCurrentStep(prev => prev + 1);
    };

    // Handle previous step
    const handlePrevious = () => {
        setCurrentStep(prev => prev - 1);
    };

    // Handle final submit
    const handleSubmit = async (paymentData) => {
        const finalData = { ...formData, ...paymentData };
        try {



            const response = await registerAffiliate(finalData);
            if (response) {

                toast.success("Registration successful. Redirecting to login...");
                navigate('/auth/affiliate/login');
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        // If user is already authenticated, redirect based on role
        if (isAuthenticated && role) {
            navigate(navigateBasedOnRole(role));
        }
    }, [isAuthenticated, role]);

    // Render the appropriate step form
    const renderStepForm = () => {
        switch (currentStep) {
            case 1:
                return <PersonalInfoForm
                    initialData={formData}
                    onNext={handleNext}
                    isLoading={isLoading}
                />;
            case 2:
                return <AddressBusinessForm
                    initialData={formData}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    isLoading={isLoading}
                />;
            case 3:
                return <PaymentDetailsForm
                    initialData={formData}
                    onSubmit={handleSubmit}
                    onPrevious={handlePrevious}
                    isLoading={isLoading}
                />;
            default:
                return <PersonalInfoForm
                    initialData={formData}
                    onNext={handleNext}
                    isLoading={isLoading}
                />;
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-full h-full grid md:grid-cols-2 gap-x-8">
                {/* Left Column - Image (kept as is) */}
                <div className="hidden md:block">
                    <img
                        src={AffiliateRegisterImage}
                        alt="Affiliate Registration"
                        className="w-full h-full object-contain rounded-md"
                    />
                </div>

                {/* Right Column - Registration Form with Stepper */}
                <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50 p-4 text-sm md:text-base md:p-0">
                    <div className="w-full h-full mx-4  p-5 bg-white">
                        <h2 className="text-center text-3xl font-semibold mb-4">Affiliate Registration</h2>

                        {/* Stepper Component */}
                        <div className="mb-6 md:mx-8">
                            <div className="flex justify-between items-center">
                                {[1, 2, 3].map((step) => (
                                    <div key={step} className="flex flex-col items-center">
                                        <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${currentStep === step
                                            ? "border-blue-600 bg-blue-600 text-white"
                                            : currentStep > step
                                                ? "border-green-500 bg-green-500 text-white"
                                                : "border-gray-300 text-gray-500"
                                            }`}>
                                            {currentStep > step ? "✓" : step}
                                        </div>
                                        <span className="text-xs mt-1 font-bold">
                                            {step === 1 ? "Personal" : step === 2 ? "Address" : "Payout Bank Account"}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="relative flex items-center justify-between mt-2">
                                <div className="absolute left-5 right-5 h-0.5 bg-gray-200"></div>
                                <div className={`absolute left-5 h-0.5 bg-blue-600 transition-all duration-300`} style={{ width: `${(currentStep - 1) * 50}%` }}></div>
                            </div>
                        </div>

                        {/* Form step content */}
                        <div className="md:px-5 text-base">

                            {renderStepForm()}
                        </div>

                        {/* Footer Links - Only show on first step */}
                        {currentStep === 1 && (
                            <div className="text-center mt-4">
                                <Link to="/auth/affiliate/login" className="text-blue-600 hover:text-blue-800 text-xs">
                                    Already have an account? Login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AffiliateRegister;