import { FormDataType } from "@/types";
import { fieldClass, labelClass } from "./styles";

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
        <div className="flex flex-col gap-4">
            <label className={labelClass}>
                {label}
            </label>
            <input
                type={typeInput}
                value={String(formData[stepName] ?? "")}
                onChange={(e) => {
                    setError("");
                    setFormData({ ...formData, [stepName]: e.target.value });
                }}
                className={`${fieldClass} ${error ? "border-red-400" : ""}`}
                placeholder={`Ej: ${placeholder}`}
                autoFocus
            />
            {error && <p className="text-sm font-medium text-red-500">{error}</p>}
        </div>
    )
}

export default StepSimple;
