import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

const StepOne = () => {
    const { control } = useFormContext()

    return (
        <div className="grid grid-cols-1 gap-4">
            <FormField
                control={control}
                name="firstName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl><Input {...field} placeholder="John" /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="lastName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl><Input {...field} placeholder="Doe" /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {/* Add other fields similarly: dob, gender, phone, whatsapp, email, password */}
        </div>
    )
}

export default StepOne
