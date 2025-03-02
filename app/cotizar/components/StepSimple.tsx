import { FormDataType } from "@/types";

interface StepSimpleProps {
    formData: FormDataType;
    setFormData: (data: FormDataType) => void;
    error: string;
    setError: (error: string) => void;
    typeInput: 'text' | 'number' | 'email' | 'tel';
    label: string;
    placeholder: string;
    stepName: keyof FormDataType;
}

const StepSimple: React.FC<StepSimpleProps> = ({ formData, setFormData, error, setError, typeInput, label, placeholder, stepName }) => {
    return (
        <div className="space-y-4 flex flex-col justify-center items-center">
            <label className="block text-lg font-medium text-[#152549]">
                {label}
            </label>
            <input
                type={typeInput}
                value={String(formData[stepName])}
                onChange={(e) => {
                    setError("");
                    setFormData({ ...formData, [stepName]: e.target.value });
                }}
                className={`w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent ${error ? "border-red-500" : ""
                    }`}
                placeholder={`Ej: ${placeholder}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}

export default StepSimple;