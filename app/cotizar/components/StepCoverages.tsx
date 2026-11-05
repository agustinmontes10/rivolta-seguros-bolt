import { useState } from "react";
import { Check } from "lucide-react";
import { labelClass, optionClass } from "./styles";

const coverturasJSON = {
    "aseguradoras": [
        {
            "nombre": "Mercantil Andina",
            "coberturas": [
                { "tipo": "Todo Riesgo", "max_antiguedad": 8 },
                { "tipo": "Tercero Completo", "max_antiguedad": 20 },
                { "tipo": "Tercero con Robo e Incendio y DT", "max_antiguedad": 30 }
            ]
        },
        {
            "nombre": "Rivadavia",
            "coberturas": [
                { "tipo": "Todo Riesgo", "max_antiguedad": 10 },
                { "tipo": "Tercero Completo", "max_antiguedad": 20 },
                { "tipo": "Tercero con Robo e Incendio y DT", "max_antiguedad": 30 }
            ]
        },
        {
            "nombre": "Mapfre",
            "coberturas": [
                { "tipo": "Todo Riesgo", "max_antiguedad": 8 },
                { "tipo": "Tercero Completo", "max_antiguedad": 15 },
                { "tipo": "Tercero con Robo e Incendio y DT", "max_antiguedad": 20 }
            ]
        }
    ]
}

interface StepCoveragesProps {
    yearVehicle: number;
    formData: any;
    setFormData: Function;
    error: string;
}

const StepCoverages: React.FC<StepCoveragesProps> = ({ yearVehicle, formData, setFormData, error }) => {
    const [isSelected, setIsSelected] = useState('');
    const yearNow = new Date().getFullYear();
    const antique = yearNow - yearVehicle;

    const getCoverages = () => {
        return coverturasJSON.aseguradoras.map(aseguradora => ({
            nombre: aseguradora.nombre,
            coberturas: aseguradora.coberturas
                .filter(cobertura => antique <= cobertura.max_antiguedad)
                .map(cobertura => cobertura.tipo)
        })).filter(aseguradora => aseguradora.coberturas.length > 0);
    }

    return (
        <div className="flex flex-col gap-6">
            <label className={labelClass}>
                Coberturas disponibles
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {getCoverages().map((aseguradora, index) => (
                    aseguradora.coberturas.map((cobertura, idx) => {
                        const selected = isSelected === `${index}-${idx}`;
                        return (
                            <button
                                type="button"
                                key={`${index}-${idx}`}
                                className={`${optionClass(selected)} flex min-h-[120px] flex-col justify-between`}
                                onClick={() => {
                                    setFormData({ ...formData, tipoSeguro: `${aseguradora.nombre} - ${cobertura}` })
                                    setIsSelected(`${index}-${idx}`)
                                }}
                            >
                                <span className="flex w-full items-start justify-between gap-3">
                                    <span className={`text-sm font-semibold ${selected ? 'text-turquoise' : 'text-navy/50'}`}>
                                        {aseguradora.nombre}
                                    </span>
                                    <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border ${selected ? 'border-turquoise bg-turquoise text-navy' : 'border-navy/20'}`}>
                                        {selected && <Check size={14} strokeWidth={3} />}
                                    </span>
                                </span>
                                <span className="mt-4 text-lg font-extrabold leading-tight">{cobertura}</span>
                            </button>
                        );
                    })
                ))}
            </div>
            {error && <p className="text-sm font-medium text-red-500">{error}</p>}

            {/* Checkbox para suscribirse al newsletter */}
            <label htmlFor="subscribeNewsletter" className="flex cursor-pointer items-start gap-3 rounded-2xl bg-cream p-4">
                <input
                    type="checkbox"
                    id="subscribeNewsletter"
                    checked={formData.subscribeNewsletter || false}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            subscribeNewsletter: e.target.checked,
                        })
                    }
                    className="mt-0.5 h-5 w-5 shrink-0 rounded accent-[#3ec1d3]"
                />
                <span className="text-sm text-navy/70">
                    Suscríbete a nuestro newsletter para recibir
                    las últimas novedades y ofertas especiales.
                </span>
            </label>
        </div>
    )
}

export default StepCoverages;
